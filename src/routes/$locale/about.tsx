import {
  ArrowLeftIcon,
  CircuitryIcon,
  CpuIcon,
  GraphicsCardIcon,
  HardDriveIcon,
  LightningIcon,
  MemoryIcon,
} from "@phosphor-icons/react";
import {
  createFileRoute,
  getRouteApi,
  Link,
  notFound,
} from "@tanstack/react-router";

import { buttonVariants, ExternalLink, inlineLinkClass } from "@/components/ui";
import { getDictionary, hasLocale } from "@/dictionaries";
import { localeLinks } from "@/lib/seo";

const specs = [
  { icon: CpuIcon, text: "AMD Ryzen 7 3700x, 8 Cores, 16 Threads, 3.6GHz" },
  { icon: GraphicsCardIcon, text: "NVIDIA RTX 5060 8GB OC" },
  { icon: CircuitryIcon, text: "ASUS Prime B450M-GAMING/BR" },
  { icon: MemoryIcon, text: "HyperX 32GB RAM 3200MHz DDR4 CL18 (2x16)" },
  { icon: LightningIcon, text: "PS Corsair VS650, 650W 80 Plus White" },
  { icon: HardDriveIcon, text: "SSD Kingston 1TB NVMe M.2" },
];

const localeRoute = getRouteApi("/$locale");

export const Route = createFileRoute("/$locale/about")({
  loader: async ({ params: { locale } }) => {
    if (!hasLocale(locale)) throw notFound();
    const { about } = await getDictionary(locale);
    return { locale, title: about.title };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    return {
      meta: [{ title: `${loaderData.title} – Vinícius Simon` }],
      links: localeLinks(loaderData.locale, "/about"),
    };
  },
  component: AboutPage,
});

function AboutPage() {
  const { locale, dict } = localeRoute.useLoaderData();
  const { about, landing } = dict;
  const email = landing.email;

  return (
    <>
      <section className="flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="font-medium">{about.title}</h1>
          <Link
            className={`${buttonVariants.ghost} -mr-2`}
            params={{ locale }}
            to="/$locale"
          >
            <ArrowLeftIcon className="size-3.5" />
            {about.back}
          </Link>
        </div>

        {/* Cropped to the two hands of the portrait-shaped original. */}
        <div className="group relative mt-6 aspect-5/2 overflow-hidden rounded-xl border border-border squircle">
          <img
            alt="Detail of Michelangelo's The Creation of Adam"
            className="absolute inset-0 size-full object-cover object-[50%_45%] saturate-[0.9] transition-transform duration-700 ease-smooth group-hover:scale-105 dark:brightness-[0.85]"
            fetchPriority="high"
            height={800}
            src="/adam.jpg"
            width={451}
          />
        </div>

        <div className="mt-6 space-y-2.5 text-foreground-secondary">
          <p>{about.paragraphs.p1}</p>
          <p>{about.paragraphs.p2}</p>
          <p>{about.paragraphs.p3}</p>
          <p>
            {about.paragraphs.contact.dm}{" "}
            <ExternalLink
              className={inlineLinkClass}
              href="https://instagram.com/vncius.ts"
            >
              Instagram
            </ExternalLink>{" "}
            {about.paragraphs.contact.email}{" "}
            <a className={inlineLinkClass} href={`mailto:${email}`}>
              {email}
            </a>
            .
          </p>
          <p className="pt-2">
            {about.signature},
            <br />
            Vinícius Simon
          </p>
        </div>
      </section>

      <section aria-labelledby="specs-heading" className="flex flex-col gap-5">
        <h2 id="specs-heading">{about.specs}</h2>
        <ul className="space-y-2">
          {specs.map((spec) => (
            <li
              className="flex items-center gap-1.5 text-[13px] text-foreground-secondary"
              key={spec.text}
            >
              <spec.icon
                aria-hidden="true"
                className="size-3.5 shrink-0 opacity-70"
              />
              {spec.text}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
