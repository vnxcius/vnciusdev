"use client";

import { ArrowUpIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export const ScrollToTop = ({ text }: { text: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="Scroll to top"
        className={`${isVisible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} fixed z-10 items-center gap-2 rounded-sm bg-zinc-50 py-2 pr-3 pl-4 ring-1 ring-zinc-400 transition-transform sm:top-8 sm:right-8 sm:flex sm:hover:bg-zinc-100 dark:bg-zinc-900 dark:ring-zinc-500 sm:dark:hover:bg-zinc-800`}
        onClick={() => window.scrollTo({ top: 0 })}
      >
        {text}
        <ArrowUpIcon className="size-4" />
      </button>
      <button
        type="button"
        aria-label="Scroll to top"
        className={`${isVisible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} fixed z-10 items-center gap-2 rounded-sm bg-zinc-50 p-3 ring-1 ring-zinc-400 transition-transform max-sm:right-6 max-sm:bottom-6 max-sm:flex sm:hover:bg-zinc-100 dark:bg-zinc-900 dark:ring-zinc-500 sm:dark:hover:bg-zinc-800`}
        onClick={() => window.scrollTo({ top: 0 })}
      >
        <ArrowUpIcon className="size-5" />
      </button>
    </>
  );
};
