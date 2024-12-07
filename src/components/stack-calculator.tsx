"use client"

import Image from "next/image";
import { DictionaryJSON } from "@/types/locales";
import { useState, useEffect } from "react";

export default function StackCalculator({
  dict
}: {
  dict: DictionaryJSON
}) {
  const [items, setItems] = useState<string>("");
  const [result, setResult] = useState({ stacks: 0, remainingItems: 0 });
  const [stacks, setStacks] = useState<string>("");
  const [stacksRemaining, setStacksRemaining] = useState<string>("");
  const [stacksResult, setStacksResult] = useState<string>("");

  const [shulkers, setShulkers] = useState<string>("");
  const [chests, setChests] = useState<string>("");

  function countItems(items: number) {
    const itemsPerStack = 64;
    const stacks = Math.floor(items / itemsPerStack); // Full stacks
    const remainingItems = items % itemsPerStack; // Items left over

    setStacks(stacks.toString());
    setStacksRemaining(remainingItems.toString());

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
    if (items === "") {
      setStacks("");
      setStacksRemaining("");
      setStacksResult("");
      setResult({ stacks: 0, remainingItems: 0 });
      return;
    };

    const numericItems = parseInt(items, 10) || 0;
    const { stacks, remainingItems } = countItems(numericItems);

    setStacks(stacks.toString());
    setStacksRemaining(remainingItems.toString());
    setResult({ stacks, remainingItems });

    const shulkers = Math.ceil(numericItems / 1728);
    setShulkers(shulkers.toString());

    const chests = Math.ceil(numericItems / 3456);
    setChests(chests.toString());
  }, [items]);

  useEffect(() => {
    if (stacks === "" && stacksRemaining === "") return;

    const totalItems = countStacks(
      parseInt(stacks, 10) || 0,
      parseInt(stacksRemaining, 10) || 0
    );

    setStacksResult(totalItems.toString());
  }, [stacks, stacksRemaining]);

  return (
    <>
      <h1 className="text-4xl">
        {dict.minecraft.keywords.stackCalculator}
      </h1>
      <hr className="border-neutral-200 dark:border-baltic-sea mt-5 duration-150" />
      <div className="flex flex-col mt-7 space-y-1.5">
        <label htmlFor="items">
          {dict.minecraft.keywords.items}
        </label>
        <input
          id="items"
          type="number"
          value={items}
          autoFocus
          placeholder={dict.minecraft.keywords.enterItems}
          className="
            focus:outline-none [appearance:textfield] p-3 bg-black
            placeholder:text-neutral-400 border-2 border-neutral-400
            dark:border-neutral-50 text-neutral-50
          "
          onChange={(e) => {
            // Allow only numeric input or an empty string
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setItems(value);
            }
          }}
        />
        <div className="text-lg py-2.5 flex items-center gap-3.5">
          <div className="flex items-center gap-2">
            <Image
              src="/img/spruce_planks_stack.png"
              alt="Stack Spruce Planks Icon"
              className="select-none"
              draggable={false}
              unoptimized
              width={28}
              height={28}
            />
            <span className="lowercase">
              {result.stacks} {dict.minecraft.keywords.stacks}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/img/spruce_planks.png"
              alt="Spruce Planks Icon"
              className="select-none"
              draggable={false}
              unoptimized
              width={28}
              height={28}
            />
            <span className="lowercase">
              {result.remainingItems} {dict.minecraft.keywords.items}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-7">
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="stacks">
            {dict.minecraft.keywords.stacks}
          </label>
          <input
            id="stacks"
            type="number"
            value={stacks}
            placeholder={dict.minecraft.keywords.enterPacks}
            className="
              focus:outline-none [appearance:textfield] p-3 bg-black
              placeholder:text-neutral-400 border-2 border-neutral-400
              dark:border-neutral-50 text-neutral-50
            "
            onChange={(e) => {
              // Allow only numeric input or an empty string
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setStacks(value);
              }
            }}
          />
        </div>
        <div className="flex flex-col gap-2 w-full flex-1">
          <label htmlFor="stacks">
            {dict.minecraft.keywords.items}
          </label>
          <input
            id="items"
            type="number"
            value={stacksRemaining}
            placeholder={dict.minecraft.keywords.enterItems}
            className="
              focus:outline-none [appearance:textfield] p-3 bg-black
              placeholder:text-neutral-400 border-2 border-neutral-400
              dark:border-neutral-50 text-neutral-50
            "
            onChange={(e) => {
              // Allow only numeric input or an empty string
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setStacksRemaining(value);
              }
            }}
          />
        </div>
      </div>

      <div className="flex items-center text-lg gap-2 py-4">
        <Image
          src="/img/spruce_planks.png"
          alt="Spruce Planks Icon"
          className="select-none"
          draggable={false}
          unoptimized
          width={28}
          height={28}
        />
        <p>
          {stacksResult || "0"} {dict.minecraft.keywords.items}
        </p>
      </div>
      <p className="text-center">
        {dict.minecraft.keywords.or}
      </p>
      <div className="flex justify-center items-center flex-wrap max-sm:gap-7 mt-7">
        <div className="flex items-center text-lg gap-3 w-64">
          <Image
            src="/img/shulker_box.webp"
            alt="Shulker Box Icon"
            className="select-none"
            draggable={false}
            unoptimized
            width={0}
            height={0}
            style={{ width: '32px', height: "auto" }}
          />
          <p className="lowercase">
            {shulkers || "0"} {dict.minecraft.keywords.shulkerBoxes}
            <span className="text-xs block text-neutral-400">
              27 {dict.minecraft.keywords.stacksPerShulker}
            </span>
          </p>
        </div>
        <div className="flex items-center text-lg gap-3 w-64">
          <Image
            src="/img/chest.webp"
            alt="Chest Icon"
            className="select-none"
            draggable={false}
            unoptimized
            width={0}
            height={0}
            style={{ width: '32px', height: "auto" }}
          />
          <p className="lowercase">
            {chests || "0"} {dict.minecraft.keywords.doubleChests}
            <span className="text-xs block text-neutral-400">
              54 {dict.minecraft.keywords.stacksPerDoubleChest}
            </span>
          </p>
        </div>
      </div>
    </>
  )
}