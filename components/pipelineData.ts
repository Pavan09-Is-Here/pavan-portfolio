/**
 * ---------------------------------------------------------------------------
 * A NOTE ON THE NUMBERS
 * ---------------------------------------------------------------------------
 * Every figure in this file is a sample value, present so the instrument on
 * /pipeline has something coherent to compute. Replace each one with the
 * output of the eval harness before presenting the page as measured work.
 * While SAMPLE_DATA is true the page renders an explicit "sample run" flag.
 */
export const SAMPLE_DATA = true;

export type Deltas = {
  recall?: number;
  faithfulness?: number;
  latencyMs?: number;
  costPer1k?: number;
};

export type Stage = {
  id: string;
  /** Mono code used in place of an icon, matching the site's capability cards. */
  k: string;
  name: string;
  phase: "Data plane" | "Serving path" | "Quality loop";
  kind: "offline" | "runtime";
  /** One line under the stage name in the chain. */
  role: string;
  summary: string;
  kept: string;
  cut: string;
  impact: { metric: string; before: string; after: string };
  /** Milliseconds this stage adds to a single request. Offline stages add 0. */
  traceMs: number;
  /** Absent when the stage is structural and cannot be switched off. */
  toggle?: { label: string; deltas: Deltas };
  code: { file: string; source: string };
};

/** The floor: single-vector retrieval, no tuning, no guardrails. */
export const BASELINE = {
  recall: 0.61,
  faithfulness: 0.68,
  latencyMs: 740,
  costPer1k: 1.8,
};

export const phases = [
  {
    name: "Data plane" as const,
    note: "Offline. Runs on upload, never on the request path.",
  },
  {
    name: "Serving path" as const,
    note: "Online. Every millisecond here is in the user's budget.",
  },
  {
    name: "Quality loop" as const,
    note: "Continuous. Turns production behaviour back into test data.",
  },
];

export const stages: Stage[] = [
  {
    id: "ingest",
    k: "IN",
    name: "Ingest & parse",
    phase: "Data plane",
    kind: "offline",
    role: "PDF, notes, pasted text → structured markdown",
    summary:
      "Accept a document, normalise it to markdown with its heading tree intact, and deduplicate by content hash so the same source is never indexed twice.",
    kept:
      "Parse to structured markdown and keep the headings. Headings are the cheapest context signal available, and every stage downstream assumes they exist.",
    cut:
      "A flat text dump. Faster to build, but it destroyed tables and heading structure, so chunks arrived with no idea which section they came from.",
    impact: { metric: "Documents parsed without structure loss", before: "71%", after: "96%" },
    traceMs: 0,
    code: {
      file: "api/ingest.py",
      source: `@router.post("/ingest")
async def ingest(file: UploadFile, user=Depends(current_user)):
    raw = await file.read()
    digest = hashlib.sha256(raw).hexdigest()

    if await docs.exists(user.id, digest):
        return {"status": "already_indexed", "hash": digest}

    md = pdf_to_markdown(raw)        # keeps H1/H2/H3 and tables
    doc = await docs.create(user.id, digest, md)
    await queue.enqueue(chunk_document, doc.id)
    return {"status": "queued", "doc_id": doc.id}`,
    },
  },
  {
    id: "chunk",
    k: "CH",
    name: "Chunk",
    phase: "Data plane",
    kind: "offline",
    role: "512 tokens, 64 overlap, breadcrumb attached",
    summary:
      "Split recursively — heading, then paragraph, then sentence — into 512-token windows with 64 tokens of overlap, and prepend a breadcrumb to every chunk.",
    kept:
      "Prepend 'document > H1 > H2' to each chunk before embedding. A chunk reading 'it decays exponentially' is unretrievable on its own; with the breadcrumb it is specific.",
    cut:
      "Fixed 1,000-character splits. Cheap, but they cut through tables and code blocks, and those orphaned halves were exactly the chunks that produced wrong answers.",
    impact: { metric: "recall@5", before: "0.61", after: "0.68" },
    traceMs: 0,
    toggle: {
      label: "Breadcrumbs",
      deltas: { recall: 0.07, faithfulness: 0.03, costPer1k: 0.1 },
    },
    code: {
      file: "pipeline/chunk.py",
      source: `def chunk(md: str, title: str) -> list[Chunk]:
    out = []
    for section in split_on_headings(md):
        crumb = " > ".join([title, *section.heading_path])
        for window in token_windows(section.body, size=512, overlap=64):
            out.append(Chunk(
                text=f"{crumb}\\n\\n{window}",   # breadcrumb travels with the chunk
                heading_path=section.heading_path,
                tokens=count_tokens(window),
            ))
    return out`,
    },
  },
  {
    id: "embed",
    k: "EM",
    name: "Embed",
    phase: "Data plane",
    kind: "offline",
    role: "1536-dim vectors, batched, hash-cached",
    summary:
      "Batch chunks 128 at a time into a 1536-dimension embedding model and cache vectors by chunk hash, so re-ingesting an edited document costs almost nothing.",
    kept:
      "The smaller embedding model. On this corpus the larger one bought roughly two points of recall for about three times the spend — ground the reranker recovers more cheaply.",
    cut:
      "Embedding on the request path. Moving it to a background worker took the ingest endpoint from seconds to a sub-200ms enqueue.",
    impact: { metric: "Re-index cost after an edit", before: "$0.41", after: "$0.02" },
    traceMs: 0,
    code: {
      file: "pipeline/embed.py",
      source: `async def embed_all(chunks: list[Chunk]) -> list[list[float]]:
    missing = [c for c in chunks if not cache.has(c.hash)]

    for batch in batched(missing, 128):
        res = await client.embeddings.create(
            model="text-embedding-3-small",
            input=[c.text for c in batch],
        )
        for c, item in zip(batch, res.data):
            cache.put(c.hash, item.embedding)

    return [cache.get(c.hash) for c in chunks]`,
    },
  },
  {
    id: "index",
    k: "IX",
    name: "Index",
    phase: "Data plane",
    kind: "offline",
    role: "pgvector HNSW + tsvector, one Postgres",
    summary:
      "Store vectors in Postgres behind an HNSW index, alongside a generated tsvector column for keyword search, with row-level security scoping every read to its owner.",
    kept:
      "One database for vectors, keyword search and application rows. Keeping retrieval next to the metadata makes per-user filtering a WHERE clause instead of a second service.",
    cut:
      "A standalone vector store. It indexed marginally faster, but every per-user filter became an application-side join that row-level security already does for free.",
    impact: { metric: "Filtered query p95", before: "210ms", after: "48ms" },
    traceMs: 0,
    code: {
      file: "migrations/002_index.sql",
      source: `alter table chunks
  add column embedding vector(1536),
  add column fts tsvector generated always as
    (to_tsvector('english', text)) stored;

create index chunks_hnsw on chunks
  using hnsw (embedding vector_cosine_ops)
  with (m = 16, ef_construction = 64);

create index chunks_fts on chunks using gin (fts);

alter table chunks enable row level security;
create policy own_chunks on chunks
  for select using (auth.uid() = user_id);`,
    },
  },
  {
    id: "retrieve",
    k: "RT",
    name: "Retrieve",
    phase: "Serving path",
    kind: "runtime",
    role: "vector ∪ keyword, fused with RRF",
    summary:
      "Embed the question, take the top 20 by cosine distance and the top 20 by keyword rank, then fuse both lists with reciprocal rank fusion.",
    kept:
      "Hybrid retrieval. Vector search alone kept missing exact tokens — acronyms, error codes, function names — which is precisely what people paste into a learning tool.",
    cut:
      "Pure vector top-k. It looked fine on paraphrased questions and failed on every literal lookup, the most common query shape in the logs.",
    impact: { metric: "recall@5", before: "0.68", after: "0.79" },
    traceMs: 95,
    toggle: {
      label: "Hybrid + RRF",
      deltas: { recall: 0.11, faithfulness: 0.02, latencyMs: 45, costPer1k: 0.05 },
    },
    code: {
      file: "pipeline/retrieve.sql",
      source: `with vec as (
  select id, row_number() over (order by embedding <=> $1) as rank
  from chunks where user_id = $2
  order by embedding <=> $1 limit 20
), kw as (
  select id, row_number() over (order by ts_rank(fts, $3) desc) as rank
  from chunks where user_id = $2 and fts @@ $3 limit 20
)
select id, sum(1.0 / (60 + rank)) as rrf       -- reciprocal rank fusion
from (select * from vec union all select * from kw) fused
group by id order by rrf desc limit 12;`,
    },
  },
  {
    id: "rerank",
    k: "RR",
    name: "Rerank & gate",
    phase: "Serving path",
    kind: "runtime",
    role: "cross-encoder to top 5, floor at 0.32",
    summary:
      "Score the twelve fused candidates with a cross-encoder, keep the best five, and drop anything below the relevance floor.",
    kept:
      "The refusal path. If nothing clears the floor the pipeline skips generation and says so — a refusal is a correct answer, while a confident guess is a defect.",
    cut:
      "Always passing the top five through. It guaranteed the model had something to work with, which is exactly how a hallucination gets written in a confident tone.",
    impact: { metric: "Answers citing an irrelevant chunk", before: "18%", after: "4%" },
    traceMs: 120,
    toggle: {
      label: "Cross-encoder",
      deltas: { recall: 0.06, faithfulness: 0.07, latencyMs: 120, costPer1k: 0.6 },
    },
    code: {
      file: "pipeline/rerank.py",
      source: `RELEVANCE_FLOOR = 0.32

async def rerank(question: str, candidates: list[Chunk]) -> list[Chunk]:
    scores = await cross_encoder.score(question, [c.text for c in candidates])
    ranked = sorted(zip(candidates, scores), key=lambda p: -p[1])
    kept = [c for c, s in ranked[:5] if s >= RELEVANCE_FLOOR]

    if not kept:
        raise NoGroundingError(question)   # grounded refusal, no generation
    return kept`,
    },
  },
  {
    id: "generate",
    k: "GN",
    name: "Generate",
    phase: "Serving path",
    kind: "runtime",
    role: "structured, streamed, citations validated",
    summary:
      "Stream a structured answer — mechanism, worked example, trade-offs — with inline citations back to chunk ids, then validate every citation before the answer is accepted.",
    kept:
      "Post-generation citation validation. An answer citing a chunk id the retriever never returned is rejected and retried once, then refused.",
    cut:
      "Free-form prose with a sources list bolted on the end. Readers could not tell which sentence came from their document and which came from the model's memory.",
    impact: { metric: "Claims traceable to a chunk", before: "54%", after: "93%" },
    traceMs: 640,
    toggle: {
      label: "Citation check",
      deltas: { faithfulness: 0.09, latencyMs: 15, costPer1k: 0.05 },
    },
    code: {
      file: "pipeline/generate.py",
      source: `answer = await client.messages.create(
    model="claude-sonnet-5",
    temperature=0.2,
    system=[{"type": "text", "text": SYSTEM,
             "cache_control": {"type": "ephemeral"}}],   # cached across turns
    messages=[{"role": "user", "content": render(question, chunks)}],
    stream=True,
)

cited = extract_citations(answer)
if not cited <= {c.id for c in chunks}:
    raise UngroundedCitation(cited)   # retry once, then refuse`,
    },
  },
  {
    id: "evaluate",
    k: "EV",
    name: "Evaluate",
    phase: "Quality loop",
    kind: "offline",
    role: "golden set scored on every pull request",
    summary:
      "A golden set of labelled question and answer pairs, scored for faithfulness, answer relevance and context precision on every pull request.",
    kept:
      "The eval as a CI gate. A prompt change that drops faithfulness by more than two points fails the build, so a quality regression cannot ship quietly.",
    cut:
      "Eyeballing a handful of answers after each change. It missed every regression that only appeared on the long tail of question shapes.",
    impact: { metric: "Quality regressions reaching production", before: "3 of 9 releases", after: "0 of 14" },
    traceMs: 0,
    code: {
      file: "tests/test_eval_gate.py",
      source: `BUDGET = 0.02   # tolerated drop against the committed baseline

def test_no_quality_regression():
    report = run_eval(golden_set, pipeline)
    baseline = json.load(open("evals/baseline.json"))

    for metric in ("faithfulness", "answer_relevancy", "context_precision"):
        drop = baseline[metric] - report[metric]
        assert drop <= BUDGET, f"{metric} fell {drop:.3f} (budget {BUDGET})"`,
    },
  },
  {
    id: "observe",
    k: "OB",
    name: "Observe",
    phase: "Quality loop",
    kind: "runtime",
    role: "per-request traces, cost, feedback → eval set",
    summary:
      "Trace every request stage by stage with tokens, cost and latency, and capture every downvote with the retrieved context still attached.",
    kept:
      "Routing downvotes straight into the golden set review queue. The questions real users ask make better eval data than anything written by hand.",
    cut:
      "Aggregate dashboards alone. Averages reported a healthy system while individual users hit the same retrieval miss over and over.",
    impact: { metric: "Golden set size", before: "40 hand-written", after: "180 user-derived" },
    traceMs: 8,
    toggle: {
      label: "Trace + feedback",
      deltas: { latencyMs: 8, costPer1k: 0.02 },
    },
    code: {
      file: "pipeline/observe.py",
      source: `@trace("answer")
async def answer(question: str, user: User) -> Answer:
    with span("retrieve") as s:
        chunks = await retrieve(question, user)
        s.set(candidates=len(chunks))

    with span("generate") as s:
        out = await generate(question, chunks)
        s.set(in_tokens=out.usage.input, out_tokens=out.usage.output,
              usd=price(out.usage))

    return out   # a downvote replays this trace into the eval queue`,
    },
  },
];

/* ------------------------------------------------------------------ *
 * The specimen: one question, answered by whatever pipeline is built.
 * ------------------------------------------------------------------ */

export const SPECIMEN_QUESTION =
  "Why does learning-rate warmup stabilise Adam early in training?";

export type Fragment = {
  text: string;
  /** grounded = cited to a retrieved chunk; unsupported = no chunk says this. */
  tone: "plain" | "grounded" | "unsupported" | "thin";
  cite?: string;
};

export type Provenance = {
  section: string;
  doc: string;
  score: string;
  miss?: boolean;
};

export function buildSpecimen(on: (id: string) => boolean): {
  fragments: Fragment[];
  provenance: Provenance[];
  note: string;
  alert: boolean;
} {
  const cite = (id: string) => (on("generate") ? id : undefined);
  const fragments: Fragment[] = [
    {
      text: "Warmup holds the effective step size small while Adam's second-moment estimate is still built from very few samples",
      tone: "grounded",
      cite: cite("c-14"),
    },
    { text: ", so the early updates are divided by a variance term that is mostly noise.", tone: "plain" },
  ];

  if (on("retrieve")) {
    fragments.push({
      text: " Your document calls this the update-direction variance problem and measures it over the first 400 steps",
      tone: "grounded",
      cite: cite("c-15"),
    });
    fragments.push({ text: ".", tone: "plain" });
  } else {
    fragments.push({
      text: " The effect is usually described in general terms, since the exact passage naming it was not retrieved.",
      tone: "thin",
    });
  }

  if (on("chunk")) {
    fragments.push({
      text: " It then shows the same run without warmup diverging at step 310, in the section on optimiser stability",
      tone: "grounded",
      cite: cite("c-21"),
    });
    fragments.push({ text: ".", tone: "plain" });
  }

  if (!on("rerank")) {
    fragments.push({
      text: " Warmup should be set to 4,000 steps by default, which is the figure the original Adam paper recommends.",
      tone: "unsupported",
      cite: "unsupported",
    });
  }

  if (on("rerank") && on("generate")) {
    fragments.push({
      text: " Your documents do not give a recommended warmup length, so none is stated here.",
      tone: "thin",
    });
  }

  const provenance: Provenance[] = on("retrieve")
    ? [
        { section: "Optimiser stability → Warmup", doc: "lecture-07.pdf", score: "0.91" },
        { section: "Adam → Second-moment estimate", doc: "lecture-07.pdf", score: "0.84" },
        { section: "Experiments → Divergence at step 310", doc: "notes-week3.md", score: "0.77" },
      ]
    : [
        { section: "Optimiser stability → Warmup", doc: "lecture-07.pdf", score: "0.88" },
        { section: "Learning-rate schedules → Cosine decay", doc: "lecture-09.pdf", score: "0.52", miss: true },
        { section: "Regularisation → Weight decay", doc: "lecture-04.pdf", score: "0.44", miss: true },
      ];

  let note =
    "Every underlined claim resolves to a chunk id the retriever actually returned.";
  let alert = false;

  if (!on("rerank")) {
    note =
      "Gate off: nothing filtered the weak candidates, so an unsupported sentence entered the answer in the same confident register as the rest.";
    alert = true;
  } else if (!on("generate")) {
    note =
      "Citation check off: the claims may still be correct, but nothing ties them to a chunk, so a reader cannot tell retrieval from recall.";
    alert = true;
  } else if (!on("retrieve")) {
    note =
      "Hybrid off: the literal passage was ranked below two topically-adjacent sections, so the answer thins out into generalities.";
    alert = true;
  } else if (!on("chunk")) {
    note =
      "Breadcrumbs off: the experiment chunk lost its section context and no longer matched, so the supporting evidence is missing.";
    alert = true;
  }

  return { fragments, provenance, note, alert };
}
