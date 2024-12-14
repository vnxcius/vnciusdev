"use client"

import Link from "next/link";
import Image from "next/image";
import { Howl } from "howler";
import { useTranslations } from "next-intl";
import data from "@/assets/data/tools.json";

const Button = ({
  icon,
  content,
  link,
}: {
  icon: string;
  content: string;
  link: string;
}) => {
  const play = () => {
    const audio = new Howl({
      src: ["/sounds/minecraft_click_sound.mp3"],
      volume: 0.15,
      preload: true,
    });

    audio.play();
  };

  return (
    <button
      onClick={play}
      className="w-full max-w-md mx-auto"
    >
      <Link
        href={link}
        className="
          text-2xl flex w-full h-16 items-center px-6 py-2
          bg-green-600 border-y-[6px] text-white border-t-green-500
          border-b-green-700 hover:bg-green-600/90
        "
      >
        <Image
          src={icon}
          alt={content + " icon"}
          draggable={false}
          width={35}
          height={35}
        />
        <p className="ml-6">
          {content}
        </p>
      </Link>
    </button>
  )
};

export default function Tools() {
  const t = useTranslations("minecraft");
  const tools = data.tools;

  return (
    <>
      <div className="flex flex-col gap-8 justify-center w-full">
        {tools.map((tool) => (
          <Button
            key={tool.id}
            icon={tool.icon}
            content={t(`tool${tool.id}`)}
            link={tool.link}
          />
        ))}
      </div>
      <p className="text-center mt-10 text-gray-500">
        {t("moreTools")}...
      </p>
    </>
  );
}