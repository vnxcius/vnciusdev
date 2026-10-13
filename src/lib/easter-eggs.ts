import { useEffect } from "react";

const duck = String.raw`
    __
  <(o )___
   ( ._> /
    '---'
`;

let greeted = false;

// A hello for whoever opens the devtools.
export function greetConsole() {
  if (greeted) return;
  greeted = true;
  console.log(
    `%c${duck}%c\nLooking under the hood? The code lives at https://gitlab.com/vncius/vnciusdev`,
    "font-family: monospace; color: #34d399",
    "font-family: inherit",
  );
}

// Swaps the tab title while the visitor is on another tab.
export function useAwayTitle(title: string) {
  useEffect(() => {
    let previous: string | null = null;

    const onVisibilityChange = () => {
      if (document.hidden) {
        previous = document.title;
        document.title = title;
      } else if (previous !== null) {
        document.title = previous;
        previous = null;
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (previous !== null) document.title = previous;
    };
  }, [title]);
}
