import { createFileRoute, redirect } from "@tanstack/react-router";

// Projects now live on the home page.
export const Route = createFileRoute("/$locale/projects")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/$locale", params, hash: "projects-heading" });
  },
});
