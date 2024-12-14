"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import Separator from "@/components/ui/separator";
import { useTranslations } from "next-intl";

export default function StackCalculator() {
  const t = useTranslations("minecraft");
  const [items, setItems] = useState<number>(0);
  const [result, setResult] = useState({ stacks: 0, remainingItems: 0 });
  const [stacks, setStacks] = useState<number>(0);
  const [stacksRemaining, setStacksRemaining] = useState<number>(0);
  const [stacksResult, setStacksResult] = useState<number>(0);

  const [shulkers, setShulkers] = useState<number>(0);
  const [chests, setChests] = useState<number>(0);

  function countItems(items: number) {
    const itemsPerStack = 64;
    const stacks = Math.floor(items / itemsPerStack); // Full stacks
    const remainingItems = items % itemsPerStack; // Items left over

    setStacks(stacks);
    setStacksRemaining(remainingItems);

    return {
      stacks,
      remainingItems,
    };
  };

  function countStacks(stacks: number, remainingItems: number) {
    const itemsPerStack = 64;
    return stacks * itemsPerStack + remainingItems;
  }

  useEffect(() => {
    const { stacks, remainingItems } = countItems(items);

    setStacks(stacks);
    setStacksRemaining(remainingItems);
    setResult({ stacks, remainingItems });

    const shulkers = Math.ceil(items / 1728);
    setShulkers(shulkers);

    const chests = Math.ceil(items / 3456);
    setChests(chests);
  }, [items]);

  useEffect(() => {
    const totalItems = countStacks(stacks, stacksRemaining);
    setStacksResult(totalItems);
    setItems(totalItems);
  }, [stacks, stacksRemaining]);

  return (
    <>
      <h1 className="text-4xl">
        {t('stackCalculator')}
      </h1>
      <p className="text-neutral-400">
        {t('stackCalculatorDescription')}
      </p>
      <Separator className="mt-5" />
      <div className="flex flex-col mt-7 space-y-1.5 text-lg">
        <label htmlFor="items">
          {t('items')}
        </label>
        <input
          id="items"
          type="number"
          value={items === 0 ? "" : items}
          autoFocus
          placeholder={t('enterItems')}
          className="
            focus:outline-none [appearance:textfield] p-3 bg-black
            placeholder:text-neutral-400 border-2 border-neutral-400
            dark:border-neutral-50 text-neutral-50
          "
          onChange={(e) => setItems(parseInt(e.target.value))}
        />
        <div className="py-2.5 flex items-center gap-3.5">
          <div className="flex items-center gap-2">
            <Image
              src="/img/minecraft/spruce_planks_stack.png"
              alt="Stack Spruce Planks Icon"
              className="select-none"
              draggable={false}
              unoptimized
              width={28}
              height={28}
            />
            <span className="lowercase">
              {result.stacks} {t('stacks')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/img/minecraft/spruce_planks.png"
              alt="Spruce Planks Icon"
              className="select-none"
              draggable={false}
              unoptimized
              width={28}
              height={28}
            />
            <span className="lowercase">
              {result.remainingItems} {t('items')}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-7 text-lg">
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="stacks">
            {t('stacks')}
          </label>
          <input
            id="stacks"
            type="number"
            value={stacks === 0 ? "" : stacks}
            placeholder={t('enterPacks')}
            className="
              focus:outline-none [appearance:textfield] p-3 bg-black
              placeholder:text-neutral-400 border-2 border-neutral-400
              dark:border-neutral-50 text-neutral-50
            "
            onChange={(e) => setStacks(parseInt(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-2 w-full flex-1">
          <label htmlFor="stacksRemaining">
            {t('items')}
          </label>
          <input
            id="stacksRemaining"
            type="number"
            value={stacksRemaining === 0 ? "" : stacksRemaining}
            placeholder={t('enterItems')}
            className="
              focus:outline-none [appearance:textfield] p-3 bg-black
              placeholder:text-neutral-400 border-2 border-neutral-400
              dark:border-neutral-50 text-neutral-50
            "
            onChange={(e) => setStacksRemaining(parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="flex items-center text-lg gap-2 py-4">
        <Image
          src="/img/minecraft/spruce_planks.png"
          alt="Spruce Planks Icon"
          className="select-none"
          draggable={false}
          unoptimized
          width={28}
          height={28}
        />
        <p className="lowercase">
          {stacksResult ?? "0"} {t('items')}
        </p>
      </div>
      <p className="text-center">
        {t('or')}
      </p>
      <div className="flex justify-center items-center flex-wrap max-sm:gap-7 mt-7">
        <div className="flex items-center text-lg gap-3 w-64">
          <Image
            src="/img/minecraft/shulker_box.webp"
            alt="Shulker Box Icon"
            className="select-none"
            draggable={false}
            unoptimized
            width={0}
            height={0}
            style={{ width: '32px', height: "auto" }}
          />
          <p className="lowercase">
            {shulkers || "0"} {t('shulkerBoxes')}
            <span className="text-xs block text-neutral-400">
              27 {t('stacksPerShulker')}
            </span>
          </p>
        </div>
        <div className="flex items-center text-lg gap-3 w-64">
          <Image
            src="/img/minecraft/chest.webp"
            alt="Chest Icon"
            className="select-none"
            draggable={false}
            unoptimized
            width={0}
            height={0}
            style={{ width: '32px', height: "auto" }}
          />
          <p className="lowercase">
            {chests || "0"} {t('doubleChests')}
            <span className="text-xs block text-neutral-400">
              54 {t('stacksPerDoubleChest')}
            </span>
          </p>
        </div>
      </div>
    </>
  )
}