import { createServerFn } from "@tanstack/react-start";

import type { Locale } from "@/dictionaries";
import { cachedFetch } from "@/lib/cached-fetch";

import { ExternalLink, inlineLinkClass } from "./ui";

const GITLAB_USER = "vncius";
const GITHUB_USER = "vnxcius";

interface Push {
  name: string;
  url: string;
  time: number;
}

async function fetchJson(url: string) {
  return JSON.parse(await cachedFetch(url));
}

async function getGitlabPush(): Promise<Push | null> {
  const [event] = await fetchJson(
    `https://gitlab.com/api/v4/users/${GITLAB_USER}/events?action=pushed&per_page=1`,
  );
  if (!event) return null;
  const project = await fetchJson(
    `https://gitlab.com/api/v4/projects/${event.project_id}`,
  );
  return {
    name: project.name,
    url: project.web_url,
    time: Date.parse(event.created_at),
  };
}

async function getGithubPush(): Promise<Push | null> {
  const events: { type: string; repo: { name: string }; created_at: string }[] =
    await fetchJson(
      `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=30`,
    );
  const event = events.find(({ type }) => type === "PushEvent");
  if (!event) return null;
  return {
    name: event.repo.name.split("/")[1],
    url: `https://github.com/${event.repo.name}`,
    time: Date.parse(event.created_at),
  };
}

export interface LatestPush extends Push {
  elapsed: number;
}

// The most recent public push on either account, or null if neither answers.
export const getLatestPush = createServerFn().handler(
  async (): Promise<LatestPush | null> => {
    const results = await Promise.allSettled([
      getGitlabPush(),
      getGithubPush(),
    ]);
    const pushes = results.flatMap((result) =>
      result.status === "fulfilled" && result.value ? [result.value] : [],
    );
    if (pushes.length === 0) return null;
    const latest = pushes.reduce((a, b) => (b.time > a.time ? b : a));
    return { ...latest, elapsed: Date.now() - latest.time };
  },
);

function formatElapsed(elapsed: number, locale: Locale) {
  const format = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const hours = Math.round(elapsed / (60 * 60 * 1000));
  if (hours < 24) return format.format(-hours, "hour");
  const days = Math.round(hours / 24);
  if (days < 30) return format.format(-days, "day");
  return format.format(-Math.round(days / 30), "month");
}

export function Now({
  label,
  locale,
  push,
}: {
  label: string;
  locale: Locale;
  push: LatestPush;
}) {
  return (
    <p className="mt-4 flex items-center gap-2 text-[13px] text-muted-foreground">
      <span aria-hidden="true" className="relative flex size-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-brand opacity-60" />
        <span className="relative size-2 rounded-full bg-brand" />
      </span>
      <span>
        {label}{" "}
        <ExternalLink
          className={`${inlineLinkClass} text-foreground-secondary`}
          href={push.url}
        >
          {push.name}
        </ExternalLink>{" "}
        · {formatElapsed(push.elapsed, locale)}
      </span>
    </p>
  );
}
