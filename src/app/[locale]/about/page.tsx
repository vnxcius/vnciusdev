import {
  ArrowLeftIcon,
  CircuitryIcon,
  CpuIcon,
  GraphicsCardIcon,
  HardDriveIcon,
  LightningIcon,
  MemoryIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { buttonVariants, ExternalLink, inlineLinkClass } from "@/components/ui";
import { getDictionary, hasLocale } from "@/dictionaries";
import { i18n } from "@/i18n.config";

const specs = [
  { icon: CpuIcon, text: "AMD Ryzen 7 3700x, 8 Cores, 16 Threads, 3.6GHz" },
  { icon: GraphicsCardIcon, text: "NVIDIA RTX 5060 8GB OC" },
  { icon: CircuitryIcon, text: "ASUS Prime B450M-GAMING/BR" },
  { icon: MemoryIcon, text: "HyperX 32GB RAM 3200MHz DDR4 CL18 (2x16)" },
  { icon: LightningIcon, text: "PS Corsair VS650, 650W 80 Plus White" },
  { icon: HardDriveIcon, text: "SSD Kingston 1TB NVMe M.2" },
];

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};

  const { about } = await getDictionary(locale);
  return {
    title: `${about.title} – Vinícius Simon`,
    alternates: {
      canonical: `/${locale}/about`,
      languages: Object.fromEntries(
        i18n.locales.map((language) => [language, `/${language}/about`]),
      ),
    },
  };
}

export default async function AboutPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const { about, landing } = await getDictionary(locale);
  const email = landing.email;

  return (
    <>
      <section className="flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="font-medium">{about.title}</h1>
          <Link className={`${buttonVariants.ghost} -mr-2`} href={`/${locale}`}>
            <ArrowLeftIcon className="size-3.5" />
            {about.back}
          </Link>
        </div>

        {/* Cropped to the two hands of the portrait-shaped original. */}
        <div className="group relative mt-6 aspect-5/2 overflow-hidden rounded-xl border border-border squircle">
          <Image
            alt="Detail of Michelangelo's The Creation of Adam"
            className="object-cover object-[50%_45%] saturate-[0.9] transition-transform duration-700 ease-smooth group-hover:scale-105 dark:brightness-[0.85]"
            fill
            priority
            sizes="(min-width: 700px) 636px, 100vw"
            src="/adam.jpg"
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
