"use client";

// The cat that chases the cursor. A port of oneko.js
// (https://github.com/adryd325/oneko.js), which also provides the sprite sheet
// in /public/oneko.gif.
//
// Copyright © 2022 adryd
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the “Software”), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

import { useEffect, useRef } from "react";

const SIZE = 32;
const SPEED = 10;
const FRAME_MS = 100;

// Column and row of each frame in the sprite sheet, as negative offsets.
const sprites = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, -1],
  ],
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ],
  scratchWallE: [
    [-2, -2],
    [-2, -3],
  ],
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
};

type Sprite = keyof typeof sprites;

export function Oneko() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cat = ref.current;
    // No cat without a mouse to chase, or for people who asked for less motion.
    if (
      !cat ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let catX = SIZE;
    let catY = SIZE;
    let mouseX = catX;
    let mouseY = catY;
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation: Sprite | null = null;
    let idleAnimationFrame = 0;
    let lastFrame = 0;
    let request = 0;

    const setSprite = (name: Sprite, frame: number) => {
      const [column, row] = sprites[name][frame % sprites[name].length];
      cat.style.backgroundPosition = `${column * SIZE}px ${row * SIZE}px`;
    };

    const idle = () => {
      idleTime += 1;

      // Roughly every 20 seconds, pick something to do while waiting.
      if (
        idleTime > 10 &&
        idleAnimation === null &&
        Math.floor(Math.random() * 200) === 0
      ) {
        const available: Sprite[] = ["sleeping", "scratchSelf"];
        if (catX < SIZE) available.push("scratchWallW");
        if (catY < SIZE) available.push("scratchWallN");
        if (catX > window.innerWidth - SIZE) available.push("scratchWallE");
        if (catY > window.innerHeight - SIZE) available.push("scratchWallS");
        idleAnimation = available[Math.floor(Math.random() * available.length)];
      }

      if (idleAnimation === null) {
        setSprite("idle", 0);
        return;
      }
      if (idleAnimation === "sleeping") {
        if (idleAnimationFrame < 8) {
          setSprite("tired", 0);
        } else {
          setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
        }
        if (idleAnimationFrame > 192) idleAnimation = null;
      } else {
        setSprite(idleAnimation, idleAnimationFrame);
        if (idleAnimationFrame > 9) idleAnimation = null;
      }
      idleAnimationFrame = idleAnimation === null ? 0 : idleAnimationFrame + 1;
    };

    const frame = () => {
      frameCount += 1;
      const diffX = catX - mouseX;
      const diffY = catY - mouseY;
      const distance = Math.hypot(diffX, diffY);

      if (distance < 48) {
        idle();
        return;
      }

      idleAnimation = null;
      idleAnimationFrame = 0;

      // Look surprised for a few frames before starting to run.
      if (idleTime > 1) {
        setSprite("alert", 0);
        idleTime = Math.min(idleTime, 7) - 1;
        return;
      }

      let direction = "";
      if (diffY / distance > 0.5) direction += "N";
      if (diffY / distance < -0.5) direction += "S";
      if (diffX / distance > 0.5) direction += "W";
      if (diffX / distance < -0.5) direction += "E";
      setSprite(direction as Sprite, frameCount);

      catX -= (diffX / distance) * SPEED;
      catY -= (diffY / distance) * SPEED;
      catX = Math.min(Math.max(SIZE / 2, catX), window.innerWidth - SIZE / 2);
      catY = Math.min(Math.max(SIZE / 2, catY), window.innerHeight - SIZE / 2);

      cat.style.left = `${catX - SIZE / 2}px`;
      cat.style.top = `${catY - SIZE / 2}px`;
    };

    const onAnimationFrame = (timestamp: number) => {
      if (timestamp - lastFrame > FRAME_MS) {
        lastFrame = timestamp;
        frame();
      }
      request = window.requestAnimationFrame(onAnimationFrame);
    };

    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    cat.style.display = "block";
    setSprite("idle", 0);
    document.addEventListener("mousemove", onMouseMove);
    request = window.requestAnimationFrame(onAnimationFrame);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      window.cancelAnimationFrame(request);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-4 left-4 z-50 hidden size-8 bg-[url(/oneko.gif)] [image-rendering:pixelated]"
      ref={ref}
    />
  );
}
