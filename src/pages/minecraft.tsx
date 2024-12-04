import React from "react";
import { Howl } from "howler";
import { NavLink } from "react-router-dom";
import MinecraftLayout from "../components/minecraft-layout";
import minecraft_click_sound from "../assets/sounds/minecraft_click_sound.mp3";

const Minecraft = () => {
  const play = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const audio = new Howl({
      src: [minecraft_click_sound],
      volume: 0.15,
      preload: true,
    });

    audio.play();
  };

  return (
    <MinecraftLayout>
      <div className="flex justify-center">
        <button onClick={play}>
          <NavLink
            to="/minecraft/stack-calculator"
            className="
              font-mojangles text-2xl flex w-fit items-center gap-3 leading-none
              bg-green-600 border-y-[6px] border-t-green-500 px-6 py-2
              border-b-green-700 text-white hover:bg-green-600/90
            "
          >
            <img
              src="/img/stack_calculator_icon.png"
              alt="Stack Calculator icon"
              draggable={false}
              width={35}
              height={35}
            />{' '}
            Stack Calculator
          </NavLink>
        </button>
      </div>
    </MinecraftLayout>
  )
};

export default Minecraft;