// import moment from "moment";
// import Link from "next/link";
// import { type Article, getArticles } from "@/src/lib/articles";

import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/dictionaries";

export default async function ArticlesPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  // const articles = getArticles();
  return (
    <>
      <h1 className="mt-4 mb-16 text-center text-5xl max-sm:text-4xl">
        {dict.articles.title}
      </h1>

      <section className="flex flex-col divide-y divide-zinc-400 overflow-hidden rounded-sm ring-1 ring-zinc-400 dark:divide-zinc-500 dark:ring-zinc-500">
        {/*{articles.map((article: Article) => (
          <Link
            className="flex items-center justify-between px-4 py-2 transition-transform sm:p-4 sm:hover:bg-zinc-100 sm:dark:hover:bg-zinc-800"
            href={`/articles/${article.id}`}
            key={article.id}
          >
            <div className="flex gap-1 gap-x-2 max-sm:flex-col sm:items-center">
              {article.title}{" "}
              <span className="flex gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                {article?.tags?.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </span>
            </div>
            <span className="text-zinc-500 max-sm:text-sm dark:text-zinc-400">
              {moment(article.date, "YYYY-MM-DD").format("MMM/YYYY")}
            </span>
          </Link>
        ))}*/}

        <p className="p-6 text-center">{dict.articles.empty} 😔</p>
      </section>
    </>
  );
}
