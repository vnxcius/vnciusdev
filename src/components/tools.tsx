"use client"

import Link from "next/link";
import Image from "next/image";
import { Howl } from "howler";
import { DictionaryJSON } from "@/types/locales";

const Button = ({
  icon,
  content,
  locale,
}: {
  icon: string;
  content: string;
  locale: string;
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
    <button onClick={play}>
      <Link
        href={`/${locale}/minecraft/stack-calculator`}
        className="
          font-mojangles text-2xl flex w-fit items-center gap-3 leading-none
          bg-green-600 border-y-[6px] border-t-green-500 px-6 py-2
          border-b-green-700 text-white hover:bg-green-600/90
        "
      >
        <Image
          src={icon}
          alt={content + " icon"}
          draggable={false}
          width={35}
          height={35}
        />{' '}
        {content}
      </Link>
    </button>
  )
};

const tools = [
  { icon: "/img/stack_calculator_icon.png", content: "Stack Calculator" },
]

export default function Tools({
  dict
}: {
  dict: DictionaryJSON
}) {
  return (
    <>
      <div className="flex justify-center">
        {tools.map((tool) => (
          <Button
            key={tool.content}
            icon={tool.icon}
            content={tool.content}
            locale={dict.locale}
          />
        ))}
      </div>
      <p className="text-center mt-10 text-gray-500">
        {dict.minecraft.keywords.moreTools}...
      </p>
    </>
  );
}