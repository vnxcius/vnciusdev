"use client"

import Link from "next/link";
import Image from "next/image";
import { Howl } from "howler";
import { DictionaryJSON } from "@/types/locales";

const Button = ({
  locale,
  icon,
  content,
  link,
}: {
  locale: string;
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
        href={`/${locale + link}`}
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

export default function Tools({
  dict
}: {
  dict: DictionaryJSON
}) {
  const tools = dict.minecraft.tools;
  const locale = dict.locale;
  return (
    <>
      <div className="flex flex-col gap-8 justify-center w-full">
        {tools.map((tool) => (
          <Button
            key={tool.id}
            locale={locale}
            icon={tool.icon}
            content={tool.name}
            link={tool.link}
          />
        ))}
      </div>
      <p className="text-center mt-10 text-gray-500">
        {dict.minecraft.keywords.moreTools}...
      </p>
    </>
  );
}