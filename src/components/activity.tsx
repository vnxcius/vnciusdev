import { PlayIcon, StopIcon } from "@phosphor-icons/react";
import { createServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";

import type { Locale } from "@/dictionaries";
import { cachedFetch } from "@/lib/cached-fetch";
import { cn } from "@/lib/cn";

import { buttonVariants } from "./ui";

const GITLAB_USERS = ["vncius"];
const GITHUB_USERS = ["vnxcius", "vinicius-simon"];
const WEEKS = 53;
const ROWS = 7;
const DAY = 24 * 60 * 60 * 1000;

const levels = [
  "bg-foreground/10",
  "bg-brand/30",
  "bg-brand/50",
  "bg-brand/75",
  "bg-brand",
];

type Counts = Record<string, number>;

async function getGitlabCounts(user: string): Promise<Counts> {
  return JSON.parse(
    await cachedFetch(`https://gitlab.com/users/${user}/calendar.json`),
  );
}

// GitHub has no public JSON for this, so read the profile's calendar markup:
// each day is a cell with an id and a date, and its count sits in a tooltip
// that points back at that id.
async function getGithubCounts(user: string): Promise<Counts> {
  const html = await cachedFetch(
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

export interface Contributions {
  // Midnight UTC of the first day; `counts` has one entry per day after it.
  start: number;
  counts: number[];
}

export const getContributions = createServerFn().handler(
  async (): Promise<Contributions | null> => {
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

    const counts = [];
    for (let time = start; time <= end; time += DAY) {
      const key = new Date(time).toISOString().slice(0, 10);
      counts.push(loaded.reduce((sum, source) => sum + (source[key] ?? 0), 0));
    }
    return { start, counts };
  },
);

type Direction = [x: number, y: number];

const TICK_MS = 110;
const START: Direction = [1, 0];

const directions: Record<string, Direction> = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  w: [0, -1],
  s: [0, 1],
  a: [-1, 0],
  d: [1, 0],
};

// Snake, played on the graph. Cells are numbered like the graph draws them,
// column by column, and `body` starts at the head.
interface Snake {
  body: number[];
  direction: Direction;
  food: number;
  over: boolean;
}

function placeFood(body: number[], columns: number) {
  const free = [];
  for (let cell = 0; cell < columns * ROWS; cell++) {
    if (!body.includes(cell)) free.push(cell);
  }
  return free[Math.floor(Math.random() * free.length)] ?? -1;
}

function startSnake(columns: number): Snake {
  const row = Math.floor(ROWS / 2);
  const body = [6, 5, 4].map((column) => column * ROWS + row);
  return {
    body,
    direction: START,
    food: placeFood(body, columns),
    over: false,
  };
}

// One step. Like on the old Nokias the edges wrap around, and the only way
// to lose is to bite yourself.
function moveSnake(snake: Snake, turn: Direction | null, columns: number) {
  // A turn straight back into the neck is ignored.
  const reverses =
    turn && turn[0] === -snake.direction[0] && turn[1] === -snake.direction[1];
  const direction = turn && !reverses ? turn : snake.direction;

  const head = snake.body[0];
  const column = (Math.floor(head / ROWS) + direction[0] + columns) % columns;
  const row = ((head % ROWS) + direction[1] + ROWS) % ROWS;
  const next = column * ROWS + row;

  const eats = next === snake.food;
  const tail = eats ? snake.body : snake.body.slice(0, -1);
  if (tail.includes(next)) return { ...snake, direction, over: true };

  const body = [next, ...tail];
  return {
    body,
    direction,
    food: eats ? placeFood(body, columns) : snake.food,
    over: false,
  };
}

export function Activity({
  contributions,
  heading,
  label,
  labels,
  locale,
}: {
  contributions: Contributions;
  heading: string;
  label: string;
  labels: { play: string; stop: string; score: string; gameOver: string };
  locale: Locale;
}) {
  // The board is the full weeks of the graph, so the snake never leaves
  // through a cell of the current week that does not exist yet.
  const columns = Math.floor(contributions.counts.length / ROWS);
  const [snake, setSnake] = useState<Snake | null>(null);
  const turn = useRef<Direction | null>(null);
  const playing = snake !== null && !snake.over;

  useEffect(() => {
    if (!playing) return;

    // While playing, the arrow keys steer instead of scrolling the page.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.key === "Escape") {
        setSnake(null);
        return;
      }
      const direction =
        directions[
          event.key.length === 1 ? event.key.toLowerCase() : event.key
        ];
      if (!direction) return;
      event.preventDefault();
      turn.current = direction;
    };

    const interval = setInterval(() => {
      setSnake(
        (current) => current && moveSnake(current, turn.current, columns),
      );
    }, TICK_MS);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [playing, columns]);

  // The lost game stays on screen for a moment before the graph comes back.
  const over = snake?.over ?? false;
  useEffect(() => {
    if (!over) return;
    const timeout = setTimeout(() => setSnake(null), 1800);
    return () => clearTimeout(timeout);
  }, [over]);

  const toggleSnake = () => {
    turn.current = null;
    setSnake(snake ? null : startSnake(columns));
  };

  const days = contributions.counts.map((count, index) => ({
    date: new Date(contributions.start + index * DAY),
    count,
  }));

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
  const cellClass = (index: number, count: number) => {
    if (!snake) return levels[Math.ceil((count / max) * (levels.length - 1))];
    if (index === snake.food) return "bg-foreground";
    if (!snake.body.includes(index)) return levels[0];
    return snake.over ? "bg-brand/40" : "bg-brand";
  };

  const gridColumns = { gridTemplateColumns: `repeat(${WEEKS}, 0.625rem)` };

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
      <div className="flex items-center justify-between">
        <h2 id="activity-heading">{heading}</h2>
        <button
          aria-pressed={snake !== null}
          className={cn(
            buttonVariants.ghost,
            "-mr-2 hidden pointer-fine:inline-flex",
          )}
          onClick={toggleSnake}
          type="button"
        >
          {snake ? labels.stop : labels.play}
          {snake ? (
            <StopIcon className="size-3.5" />
          ) : (
            <PlayIcon className="size-3.5" />
          )}
        </button>
      </div>
      <div>
        {/* Reversed so narrow screens start scrolled to the most recent weeks */}
        <div className="no-scrollbar flex max-w-full flex-row-reverse overflow-x-auto overflow-y-hidden">
          <div className="mr-auto w-max">
            <div
              aria-hidden="true"
              className="mb-1.5 grid h-3 gap-0.5 text-[12px] leading-none text-muted-foreground"
              style={gridColumns}
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
              style={gridColumns}
            >
              {days.map((day, index) => (
                <li
                  className={cn(
                    "size-2.5 animate-cell rounded-cell squircle",
                    cellClass(index, day.count),
                  )}
                  key={day.date.getTime()}
                  // Cells fade in as a wave, one week column after another.
                  style={{ animationDelay: `${Math.floor(index / 7) * 12}ms` }}
                  title={
                    snake
                      ? undefined
                      : `${day.count} · ${fullDate.format(day.date)}`
                  }
                />
              ))}
            </ol>
          </div>
        </div>
        <p className="mt-2 text-[12px] text-muted-foreground">
          {snake
            ? `${labels.score}: ${snake.body.length - 3}${snake.over ? ` · ${labels.gameOver}` : ""}`
            : `${total.toLocaleString(locale)} ${label}`}
        </p>
      </div>
    </section>
  );
}
