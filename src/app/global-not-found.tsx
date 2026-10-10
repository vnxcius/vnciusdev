import Link from "next/link";

import { inlineLinkClass } from "@/components/ui";

import RootLayout from "./layout";

export default function NotFound() {
  return (
    <RootLayout>
      <body>
        <main className="mx-auto flex min-h-svh w-full max-w-page flex-col justify-center gap-2.5 px-5 sm:px-8">
          <h1 className="font-medium">This page doesn&apos;t exist.</h1>
          <Link
            className={`${inlineLinkClass} w-fit text-foreground-secondary`}
            href="/"
          >
            Just take me back already...
          </Link>
        </main>
      </body>
    </RootLayout>
  );
}
