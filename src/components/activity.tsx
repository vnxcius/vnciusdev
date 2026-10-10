import type { Locale } from "@/dictionaries";
import { cn } from "@/lib/cn";

const GITLAB_USERS = ["vncius"];
const GITHUB_USERS = ["vnxcius", "vinicius-simon"];
const WEEKS = 53;
const DAY = 24 * 60 * 60 * 1000;

const levels = [
  "bg-foreground/10",
  "bg-brand/30",
  "bg-brand/50",
  "bg-brand/75",
  "bg-brand",
];

type Counts = Record<string, number>;

async function fetchText(url: string) {
  const response = await fetch(url, { next: { revalidate: 3600 } });
  if (!response.ok) throw new Error(`${url}: ${response.status}`);
  return response.text();
}

async function getGitlabCounts(user: string): Promise<Counts> {
  return JSON.parse(
    await fetchText(`https://gitlab.com/users/${user}/calendar.json`),
  );
}

// GitHub has no public JSON for this, so read the profile's calendar markup:
// each day is a cell with an id and a date, and its count sits in a tooltip
// that points back at that id.
async function getGithubCounts(user: string): Promise<Counts> {
  const html = await fetchText(
    `https://github.com/users/${user}/contributions`,
  );
  const dates = new Map<string, string>();
  for (const [cell] of html.matchAll(/<td[^>]*data-date="[^"]*"[^>]*>/g)) {
    const date = cell.match(/data-date="([^"]*)"/)?.[1];
    const id = cell.match(/\sid="([^"]*)"/)?.[1];
    if (date && id) dates.set(id, date);
  }
  if (dates.size === 0) throw new Error(`No GitHub calendar for ${user}`);

  const counts: Counts = {};
  const tooltips = html.matchAll(
    /<tool-tip[^>]*\sfor="([^"]*)"[^>]*>\s*([\d,]+) contributions?/g,
  );
  for (const [, id, count] of tooltips) {
    const date = dates.get(id);
    if (date) counts[date] = Number(count.replaceAll(",", ""));
  }
  return counts;
}

async function getContributions() {
  const sources = await Promise.allSettled([
    ...GITLAB_USERS.map(getGitlabCounts),
    ...GITHUB_USERS.map(getGithubCounts),
  ]);
  // A source that is down is left out; the rest still add up.
  const loaded = sources.flatMap((source) =>
    source.status === "fulfilled" ? [source.value] : [],
  );
  if (loaded.length === 0) return null;

  // Weeks run Sunday to Saturday; the last column is the current week.
  const today = new Date();
  const end = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
  );
  const start = end - (new Date(end).getUTCDay() + (WEEKS - 1) * 7) * DAY;

  const days = [];
  for (let time = start; time <= end; time += DAY) {
    const date = new Date(time);
    const key = date.toISOString().slice(0, 10);
    const count = loaded.reduce((sum, counts) => sum + (counts[key] ?? 0), 0);
    days.push({ date, count });
  }
  return days;
}

export async function Activity({
  heading,
  label,
  locale,
}: {
  heading: string;
  label: string;
  locale: Locale;
}) {
  const days = await getContributions();
  if (!days) return null;

  const total = days.reduce((sum, day) => sum + day.count, 0);
  const max = Math.max(...days.map((day) => day.count), 1);
  const month = new Intl.DateTimeFormat(locale, {
    month: "short",
    timeZone: "UTC",
  });
  const fullDate = new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
    timeZone: "UTC",
  });
  const columns = { gridTemplateColumns: `repeat(${WEEKS}, 0.625rem)` };

  // One entry per week column, labelled where a new month starts.
  const weekStarts = days.filter((_, index) => index % 7 === 0);
  const monthLabels = weekStarts.map(({ date }, week) => {
    const previous = weekStarts[week - 1]?.date;
    // A label on the last column would overflow the graph.
    const changed =
      previous &&
      week < WEEKS - 1 &&
      previous.getUTCMonth() !== date.getUTCMonth();
    return { key: date.getTime(), text: changed ? month.format(date) : "" };
  });

  return (
    <section aria-labelledby="activity-heading" className="flex flex-col gap-5">
      <h2 id="activity-heading">{heading}</h2>
      <div>
        {/* Reversed so narrow screens start scrolled to the most recent weeks */}
        <div className="no-scrollbar flex max-w-full flex-row-reverse overflow-x-auto overflow-y-hidden">
          <div className="mr-auto w-max">
            <div
              aria-hidden="true"
              className="mb-1.5 grid h-3 gap-0.5 text-[12px] leading-none text-muted-foreground"
              style={columns}
            >
              {monthLabels.map(({ key, text }) => (
                <span className="whitespace-nowrap" key={key}>
                  {text}
                </span>
              ))}
            </div>
            <ol
              aria-label={`${total.toLocaleString(locale)} ${label}`}
              className="grid grid-flow-col grid-rows-7 gap-0.5"
              style={columns}
            >
              {days.map((day, index) => (
                <li
                  className={cn(
                    "size-2.5 animate-cell rounded-cell squircle",
                    levels[Math.ceil((day.count / max) * (levels.length - 1))],
                  )}
                  key={day.date.getTime()}
                  // Cells fade in as a wave, one week column after another.
                  style={{ animationDelay: `${Math.floor(index / 7) * 12}ms` }}
                  title={`${day.count} · ${fullDate.format(day.date)}`}
                />
              ))}
            </ol>
          </div>
        </div>
        <p className="mt-2 text-[12px] text-muted-foreground">
          {total.toLocaleString(locale)} {label}
        </p>
      </div>
    </section>
  );
}
