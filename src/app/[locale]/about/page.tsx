import {
  CircuitryIcon,
  CpuIcon,
  DesktopTowerIcon,
  GraphicsCardIcon,
  HardDriveIcon,
  LightningIcon,
  MemoryIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/dictionaries";

export default async function AboutPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const { about } = await getDictionary(locale);
  const email = locale === "pt" ? "contato@vncius.dev" : "contact@vncius.dev";
  return (
    <>
      <h1 className="mt-4 mb-16 text-center text-5xl max-sm:text-4xl">
        {about.title}
      </h1>
      <div className="my-8">
        <div className="flex items-center gap-1 dark:text-zinc-400">
          <DesktopTowerIcon size={20} weight="duotone" />
          <p className="font-semibold">PC Specs:</p>
        </div>

        <ul className="my-2 space-y-1.5 text-zinc-700 dark:text-zinc-400 [&>li>div]:flex [&>li>div]:translate-y-1 [&>li>div]:items-center [&>li>div]:gap-2">
          <li>
            <div>
              <CpuIcon
                size={16}
                weight="duotone"
                className="text-neutral-500 dark:text-zinc-400"
              />
              <p>AMD Ryzen 7 3700x, 8 Cores, 16 Threads, 3.6GHz</p>
            </div>
          </li>
          <li>
            <div>
              <GraphicsCardIcon
                size={16}
                weight="duotone"
                className="text-neutral-500 dark:text-zinc-400"
              />
              <p>NVIDIA RTX 2060 6GB OC</p>
            </div>
          </li>
          <li>
            <div>
              <CircuitryIcon
                size={16}
                weight="duotone"
                className="text-neutral-500 dark:text-zinc-400"
              />
              <p>ASUS Prime B450M-GAMING/BR</p>
            </div>
          </li>
          <li>
            <div>
              <MemoryIcon
                size={16}
                weight="duotone"
                className="text-neutral-500 dark:text-zinc-400"
              />
              <p>HyperX 32GB RAM 3200MHz DDR4 CL18 (2x16)</p>
            </div>
          </li>
          <li>
            <div>
              <LightningIcon
                size={16}
                weight="duotone"
                className="text-neutral-500 dark:text-zinc-400"
              />
              <p>PS Corsair VS650, 650W 80 Plus White</p>
            </div>
          </li>
          <li>
            <div>
              <HardDriveIcon
                size={16}
                weight="duotone"
                className="text-neutral-500 dark:text-zinc-400"
              />
              <p>SSD Kingston 1TB NVMe M.2</p>
            </div>
          </li>
        </ul>
      </div>

      <hr className="my-8 dark:border-zinc-700" />

      <article>
        <p>{about.paragraphs.p1}</p>

        <p>{about.paragraphs.p2}</p>

        <p>{about.paragraphs.p3}</p>

        <p>
          {about.paragraphs.p4.p4_1}{" "}
          <Link
            target="_blank"
            referrerPolicy="no-referrer"
            href="https://www.linkedin.com/posts/vinicius-hilton_gostaria-de-compartilhar-que-finalizei-meu-activity-7221974297945210880-f16o"
          >
            {about.paragraphs.p4.p4LinkText}
          </Link>{" "}
          {about.paragraphs.p4.p4_2}
        </p>

        <p>
          {about.paragraphs.p5.p5_1}{" "}
          <Link target="_blank" referrerPolicy="no-referrer" href="/projects">
            {about.paragraphs.p5.p5LinkText}
          </Link>
          {about.paragraphs.p5.p5_2}
        </p>

        <p className="my-4">
          {about.paragraphs.p6.p6_1}{" "}
          <Link
            target="_blank"
            referrerPolicy="no-referrer"
            href="https://instagram.com/vncius.ts"
          >
            Instagram
          </Link>{" "}
          {about.paragraphs.p6.p6_2}{" "}
          <Link
            target="_blank"
            referrerPolicy="no-referrer"
            href={`mailto:${email}`}
          >
            {email}
          </Link>
        </p>

        <p>
          {about.signature}, <br />
          Vinícius Simon
        </p>
      </article>
    </>
  );
}
