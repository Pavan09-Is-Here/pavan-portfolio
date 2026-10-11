import { redirect } from "next/navigation";

// The systems index lives on the home page. Kept so existing links resolve.
export default function ProjectsPage() {
  redirect("/#systems");
}
