import { permanentRedirect } from "next/navigation";

export default function Page() {
  // https://nextjs.org/docs/app/building-your-application/routing/redirecting#permanentredirect-function
  return permanentRedirect("https://linkedin.com/in/vinicius-simon-gouveia-hilton/");
};