import { redirect } from "next/navigation";

// The project index now lives on the home page. Kept so existing links resolve.
export default function ProjectsPage() {
  redirect("/#index");
}
