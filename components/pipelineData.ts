/**
 * ---------------------------------------------------------------------------
 * WHERE THESE NUMBERS COME FROM
 * ---------------------------------------------------------------------------
 * Everything in MEASURED is the output of the eval harness in the
 * learnforge-ai repository (`python evals/run_eval.py`), run against 52
 * labelled cases over a three-document fixture corpus. Regenerate it from
 * `evals/results/latest.json` after any run; the harness is deterministic, so
 * the same corpus and golden set reproduce the same figures.
 *
 * Nothing on this page is a sample value any more. Where a figure does not
 * exist yet — anything needing a model to judge it — the page says so instead
 * of estimating it.
 */

export const MEASURED = {
  runOn: "2026-10-11",
  command: "python evals/run_eval.py",
  corpus: {
    documents: 3,
    chunks: 17,
    cases: 52,
    answerable: 46,
    unanswerable: 6,
    shapes: { literal: 27, paraphrase: 16, multi: 3, unanswerable: 6 },
  },
};

export type Scope = "document" | "corpus";

export type Row = {
  id: string;
  name: string;
  /** What the strategy actually is, stated without euphemism. */
  what: string;
  live?: boolean;
  recall1: number;
  recall3: number;
  mrr: number;
  /** Threshold-free answerable/unanswerable separability (Mann-Whitney). */
  gate: number;
  p50ms: number;
  canRefuse: boolean;
  byShape: { literal: number; paraphrase: number; multi: number };
};

export const SCOPES: {
  id: Scope;
  label: string;
  note: string;
  rows: Row[];
}[] = [
  {
    id: "document",
    label: "Inside one document",
    note:
      "What LearnForge does today — /documents/ask filters to a single document_id, so retrieval only ever sees that document's chunks.",
    rows: [
      {
        id: "prod_keyword",
        name: "Keyword overlap",
        what: "Two points per matching word, plus repeats. What is deployed.",
        live: true,
        recall1: 0.804, recall3: 0.957, mrr: 0.880, gate: 0.750, p50ms: 0.07,
        canRefuse: false,
        byShape: { literal: 1.0, paraphrase: 0.875, multi: 1.0 },
      },
      {
        id: "bm25",
        name: "BM25",
        what: "Rarity weighting, term saturation at k1 = 1.2, length normalisation at b = 0.75.",
        recall1: 0.804, recall3: 0.935, mrr: 0.882, gate: 0.931, p50ms: 0.41,
        canRefuse: true,
        byShape: { literal: 1.0, paraphrase: 0.812, multi: 1.0 },
      },
      {
        id: "tfidf_cosine",
        name: "TF-IDF cosine",
        what: "TF-IDF vectors over the corpus vocabulary. Not a learned embedding.",
        recall1: 0.804, recall3: 0.935, mrr: 0.886, gate: 0.960, p50ms: 0.77,
        canRefuse: true,
        byShape: { literal: 1.0, paraphrase: 0.812, multi: 1.0 },
      },
      {
        id: "hybrid_rrf",
        name: "Hybrid · RRF",
        what: "Reciprocal rank fusion, k = 60, over the two lists above.",
        recall1: 0.804, recall3: 0.935, mrr: 0.886, gate: 0.645, p50ms: 1.22,
        canRefuse: true,
        byShape: { literal: 1.0, paraphrase: 0.812, multi: 1.0 },
      },
    ],
  },
  {
    id: "corpus",
    label: "Across every document",
    note:
      "Harder, and where the strategies separate: the retriever has to pick the right document before it can pick the right passage.",
    rows: [
      {
        id: "prod_keyword",
        name: "Keyword overlap",
        what: "Two points per matching word, plus repeats. What is deployed.",
        live: true,
        recall1: 0.739, recall3: 0.913, mrr: 0.828, gate: 0.676, p50ms: 0.18,
        canRefuse: false,
        byShape: { literal: 1.0, paraphrase: 0.75, multi: 1.0 },
      },
      {
        id: "bm25",
        name: "BM25",
        what: "Rarity weighting, term saturation at k1 = 1.2, length normalisation at b = 0.75.",
        recall1: 0.804, recall3: 0.913, mrr: 0.874, gate: 0.833, p50ms: 1.23,
        canRefuse: true,
        byShape: { literal: 1.0, paraphrase: 0.75, multi: 1.0 },
      },
      {
        id: "tfidf_cosine",
        name: "TF-IDF cosine",
        what: "TF-IDF vectors over the corpus vocabulary. Not a learned embedding.",
        recall1: 0.804, recall3: 0.935, mrr: 0.874, gate: 0.873, p50ms: 2.08,
        canRefuse: true,
        byShape: { literal: 1.0, paraphrase: 0.812, multi: 1.0 },
      },
      {
        id: "hybrid_rrf",
        name: "Hybrid · RRF",
        what: "Reciprocal rank fusion, k = 60, over the two lists above.",
        recall1: 0.804, recall3: 0.913, mrr: 0.874, gate: 0.565, p50ms: 3.26,
        canRefuse: true,
        byShape: { literal: 1.0, paraphrase: 0.75, multi: 1.0 },
      },
    ],
  },
];

/* ------------------------------------------------------------------ *
 * The nine stages, each labelled with what is actually running.
 * ------------------------------------------------------------------ */

export type Status = "shipped" | "partial" | "planned";

export type Stage = {
  id: string;
  k: string;
  name: string;
  phase: "Data plane" | "Serving path" | "Quality loop";
  status: Status;
  /** One line under the stage name in the chain. */
  role: string;
  summary: string;
  /** For shipped work: the decision. For planned work: what the eval says to do. */
  decision: string;
  /** For shipped work: the rejected option. For planned work: the measured reason. */
  counter: string;
  evidence?: { metric: string; value: string };
  code: { file: string; source: string };
};

export const STATUS_LABEL: Record<Status, string> = {
  shipped: "Running",
  partial: "Partly running",
  planned: "Measured next",
};

export const phases = [
  { name: "Data plane" as const, note: "Offline. Runs on upload, never on the request path." },
  { name: "Serving path" as const, note: "Online. Every millisecond here is in the user's budget." },
  { name: "Quality loop" as const, note: "Continuous. Turns production behaviour back into test data." },
];

export const stages: Stage[] = [
  {
    id: "ingest",
    k: "IN",
    name: "Ingest & parse",
    phase: "Data plane",
    status: "shipped",
    role: "PDF upload → extracted text → stored rows",
    summary:
      "A PDF is uploaded, pypdf extracts its text page by page, and the result is stored against the user with a document row and its chunks.",
    decision:
      "Parsing happens once, at upload, and the request path never touches a PDF. That single choice is why question latency is dominated by the model rather than by file handling.",
    counter:
      "Extraction currently drops structure: headings and tables arrive as flat text. The chunker downstream has no section context to attach, which is the root of the paraphrase misses the eval reports.",
    evidence: { metric: "parse work on the request path", value: "none" },
    code: {
      file: "backend/main.py",
      source: `reader = PdfReader(io.BytesIO(await file.read()))
text = "".join((page.extract_text() or "") for page in reader.pages)

document_id = insert_document(user_id, file.filename)
for i, chunk in enumerate(split_text_into_chunks(text)):
    insert_chunk(document_id, user_id, i, chunk)`,
    },
  },
  {
    id: "chunk",
    k: "CH",
    name: "Chunk",
    phase: "Data plane",
    status: "partial",
    role: "fixed 1,200 characters, no overlap, no breadcrumb",
    summary:
      "Whitespace is collapsed and the text is cut into 1,200-character windows. Simple, deterministic, and the thing the eval chunks with too, so measurement and production never diverge.",
    decision:
      "Keeping one chunker, imported by both the API and the harness. A chunker that exists twice is a chunker that disagrees with itself.",
    counter:
      "Fixed windows cut through sentences and tables, and no heading breadcrumb is attached. The eval localises the cost: every miss in the run is a paraphrased question, at recall@3 0.75 to 0.88 against 1.000 for literal ones.",
    evidence: { metric: "recall@3 · paraphrased questions", value: "0.75 – 0.88" },
    code: {
      file: "backend/retrieval.py",
      source: `def split_text_into_chunks(text: str, chunk_size: int = 1200) -> list[str]:
    clean_text = " ".join(text.split())
    chunks = []

    for i in range(0, len(clean_text), chunk_size):
        chunk = clean_text[i:i + chunk_size]
        if chunk.strip():
            chunks.append(chunk)

    return chunks`,
    },
  },
  {
    id: "embed",
    k: "EM",
    name: "Embed",
    phase: "Data plane",
    status: "planned",
    role: "not built — the eval says what it has to beat",
    summary:
      "Nothing is embedded today. Retrieval is lexical from end to end, so a question that avoids the document's own wording has nothing to match against.",
    decision:
      "The target is already set: beat TF-IDF cosine at recall@1 0.804 and MRR 0.886 on the same 52 cases, and specifically lift paraphrased recall@3 above 0.812. If an embedding model cannot clear a bag-of-words baseline on this corpus, it is not earning its latency.",
    counter:
      "Stated plainly: TF-IDF is not semantic search. It is in the harness to establish the floor a real embedding has to clear, not to stand in for one.",
    evidence: { metric: "TF-IDF floor to beat · recall@1", value: "0.804" },
    code: {
      file: "evals/strategies.py",
      source: `# The floor an embedding model has to clear, measured on the same cases.
def tfidf_cosine(question, chunks):
    return TfidfIndex(chunks).score(question)

# Add the candidate beside it and the comparison is one command:
#   python evals/run_eval.py --strategy tfidf_cosine --strategy embeddings`,
    },
  },
  {
    id: "index",
    k: "IX",
    name: "Index",
    phase: "Data plane",
    status: "partial",
    role: "Postgres rows today, no vector or keyword index",
    summary:
      "Chunks live in a Supabase table keyed by document and user. Retrieval reads every chunk for the document and scores them in Python.",
    decision:
      "Keeping chunks in the same Postgres as the application rows. The owner id comes from a verified token rather than the request body, so per-user scoping is a WHERE clause the database enforces behind row-level security — not a filter applied after the fact.",
    counter:
      "Scoring in application code is fine at a few hundred chunks and will not survive a real library. The measured cost is not latency yet — retrieval runs in under a millisecond locally — it is that every chunk has to be fetched to score it.",
    evidence: { metric: "retrieval p50, local, one document", value: "0.07 ms" },
    code: {
      file: "backend/main.py",
      source: `def ask_document(request: DocumentAskRequest,
                 user_id: str = Depends(get_current_user_id)):
    chunks_result = (
        supabase.table("document_chunks")
        .select("chunk_text, chunk_index")
        .eq("document_id", request.document_id)
        .eq("user_id", user_id)       # from the verified token, not the body,
        .execute()                    # and scoped in the query, not after it
    )`,
    },
  },
  {
    id: "retrieve",
    k: "RT",
    name: "Retrieve",
    phase: "Serving path",
    status: "partial",
    role: "keyword overlap scoring · hybrid measured, not shipped",
    summary:
      "Content words from the question are matched against each chunk: two points for a hit, extra for repeats, ten for the question appearing verbatim. The top eight scoring chunks become the context.",
    decision:
      "The eval compares it against three alternatives on identical cases. Inside one document it holds its own — recall@1 0.804, the same as every other strategy. That is a real result, and it is why replacing it was not the first thing I did.",
    counter:
      "Across documents it falls behind: recall@1 0.739 against 0.804, MRR 0.828 against 0.874. The weakness is telling documents apart, and the single-document scope in production hides it entirely.",
    evidence: { metric: "recall@1 · corpus scope, deployed vs best", value: "0.739 → 0.804" },
    code: {
      file: "backend/retrieval.py",
      source: `for term in terms:
    if term in text:
        score += 2

    occurrences = text.count(term)
    if occurrences > 1:
        score += occurrences

if question.lower() in text:
    score += 10`,
    },
  },
  {
    id: "rerank",
    k: "RR",
    name: "Rerank & gate",
    phase: "Serving path",
    status: "planned",
    role: "not built — and the eval shows exactly what it costs",
    summary:
      "There is no reranker and no relevance floor. The selector keeps whatever scored above zero and, when nothing scored, returns the first four chunks anyway.",
    decision:
      "The gate comes before the reranker. All six unanswerable questions in the eval came back with context: four scored non-zero against documents that do not contain the answer, and the other two hit the fallback. A zero score is the system saying it found nothing, and the fallback rewrites that as 'here is some text'.",
    counter:
      "The measurement that matters here is separability — can any threshold tell answerable from unanswerable. Deployed scoring reaches 0.750 inside a document; TF-IDF reaches 0.960 on the same questions. A gate is viable, just not on these scores.",
    evidence: { metric: "separability · deployed vs best", value: "0.750 → 0.960" },
    code: {
      file: "backend/retrieval.py",
      source: `best = [c for c in scored if c.score > 0][:top_k]

if not best:
    best = scored[:fallback_k]   # <- this is the bug the eval caught:
                                 #    "nothing matched" becomes "here are
                                 #    four arbitrary chunks"`,
    },
  },
  {
    id: "generate",
    k: "GN",
    name: "Generate",
    phase: "Serving path",
    status: "partial",
    role: "structured answer, document-only instruction, no citation check",
    summary:
      "The retrieved chunks are rendered into a prompt that forbids outside knowledge and fixes the answer's shape — direct answer, explanation from the document, details, sources used, summary — and Llama 3.3 70B on Groq generates it at temperature 0.4.",
    decision:
      "Instructing the model to answer only from the context, and to say when the document does not contain the answer. That instruction is doing real work, and it is also the only thing standing between a bad retrieval and a confident wrong answer.",
    counter:
      "The model is asked to name the chunks it used, and nothing checks that it did. A citation to a chunk the retriever never returned would pass straight through. Validating citations against the retrieved ids is cheap; measuring whether it helps needs a judge model, which the harness deliberately does not have yet.",
    code: {
      file: "backend/main.py",
      source: `prompt = f"""
You are LearnForge AI Document Mode.

Answer the user's question using ONLY the document context below.

Rules:
- If the answer is not found in the document, say:
  "I could not find this information in the uploaded document."
- Do not make up information.
- Mention which source chunks helped.

Document Context:
{context}
"""`,
    },
  },
  {
    id: "evaluate",
    k: "EV",
    name: "Evaluate",
    phase: "Quality loop",
    status: "shipped",
    role: "52 labelled cases, 4 strategies, gated in CI",
    summary:
      "A deterministic harness: 52 labelled questions over a three-document corpus, scored for recall@k, precision@3, MRR and separability, across four retrieval strategies and two scopes. No API key, no database, no network — it runs in under a second.",
    decision:
      "Making it offline and stdlib-only was the design constraint, not an accident. A gate that needs a secret runs occasionally; a gate that needs nothing runs on every pull request. Gold labels are exact spans resolved to chunk ids at load time, so re-chunking cannot silently invalidate a label, and a typo in a label fails loudly instead of scoring zero.",
    counter:
      "The corpus is small — 17 chunks — so recall@5 saturates in document scope. The harness flags that in its own output rather than letting a saturated metric read as a result. Growing the labelled set is the highest-value next step, and production downvotes are the right source.",
    evidence: { metric: "labelled cases · regression budget", value: "52 · 0.02" },
    code: {
      file: "evals/run_eval.py",
      source: `GATED_METRICS = ("recall@1", "recall@3", "recall@5", "mrr", "gate_auroc")
REGRESSION_BUDGET = 0.02

for metric in GATED_METRICS:
    drop = base[metric] - row[metric]
    if drop > REGRESSION_BUDGET:
        failures.append(f"{scope}/{row['strategy']}/{metric}: "
                        f"{base[metric]:.3f} -> {row[metric]:.3f}")

return 1 if failures else 0   # the build fails, quietly is not an option`,
    },
  },
  {
    id: "observe",
    k: "OB",
    name: "Observe",
    phase: "Quality loop",
    status: "planned",
    role: "not built — the loop the eval needs to keep growing",
    summary:
      "Nothing traces a request stage by stage, and nothing captures a downvote with the retrieved context attached. Errors print to the log and that is all.",
    decision:
      "This is what makes the eval improve on its own. A downvote carrying the question, the retrieved chunks and the answer is a finished eval case; hand-written questions drift away from what people actually ask. The harness is already shaped to receive them — a case is one line of JSONL.",
    counter:
      "Aggregate numbers would not have found any of this. The separability failure and the paraphrase gap both came out of per-case inspection, which is the same granularity production tracing needs.",
    evidence: { metric: "corpus size · now vs useful", value: "17 chunks" },
    code: {
      file: "evals/golden.jsonl",
      source: `{"id":"q12","shape":"paraphrase","doc":"optimizers",
 "question":"Is the early instability about how big the steps are,
             or about how unreliable they are?",
 "gold_spans":["This is a variance problem, not a scale problem"]}

# A downvote already carries every field this line needs.`,
    },
  },
];

/* ------------------------------------------------------------------ *
 * A constructed illustration of the failure the gate statistic
 * measures. Not a transcript — the page says so where it renders.
 * ------------------------------------------------------------------ */

export const SPECIMEN_QUESTION =
  "What dropout rate did the authors use in their final model?";

export type Fragment = {
  text: string;
  tone: "plain" | "grounded" | "unsupported" | "thin";
  cite?: string;
};

export type Provenance = { section: string; doc: string; score: string; miss?: boolean };

export function buildSpecimen(gateOn: boolean, citationsOn: boolean): {
  fragments: Fragment[];
  provenance: Provenance[];
  note: string;
  alert: boolean;
} {
  // The corpus genuinely does not answer this question. It is one of the six
  // unanswerable cases in the golden set.
  if (gateOn) {
    return {
      fragments: [
        {
          text: "Your documents do not state a dropout rate. The closest passages cover weight decay and gradient clipping, neither of which answers the question",
          tone: "thin",
          cite: citationsOn ? "c-05" : undefined,
        },
        { text: ".", tone: "plain" },
      ],
      provenance: [
        { section: "Weight decay and AdamW", doc: "optimizers.md", score: "0.21", miss: true },
        { section: "Gradient clipping", doc: "optimizers.md", score: "0.18", miss: true },
      ],
      note:
        "Gate on: nothing clears the relevance floor, so the pipeline refuses instead of generating. A refusal is a correct answer.",
      alert: false,
    };
  }

  return {
    fragments: [
      {
        text: "The authors used a dropout rate of 0.1 across the residual connections and attention layers, which is the standard setting for a model of this depth",
        tone: "unsupported",
        cite: "no source",
      },
      {
        text: " The notes also recommend pairing it with weight decay",
        tone: "unsupported",
        cite: "no source",
      },
      { text: ".", tone: "plain" },
    ],
    provenance: [
      { section: "Weight decay and AdamW", doc: "optimizers.md", score: "18.0", miss: true },
      { section: "Gradient clipping", doc: "optimizers.md", score: "6.0", miss: true },
    ],
    note:
      "Gate off — today's behaviour. This question is one of the six the eval labels unanswerable; it scored 18.0 against a document that never mentions dropout, so context was handed over and the answer was written anyway.",
    alert: true,
  };
}
