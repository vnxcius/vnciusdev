"use client"

import { DictionaryJSON } from "@/types/locales";
import { useEffect, useState } from "react";
import Image from "next/image";
import { XIcon } from "lucide-react";
import Separator from "@/components/ui/separator";
import ItemButton from "@/components/ui/item-button";
import clsx from "clsx";

interface Item {
  name: string;
  path: string;
  quantity?: number;
  done?: boolean;
}

export default function ItemSelector({
  dict
}: {
  dict: DictionaryJSON
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  useEffect(() => {
    // Set React Strict mode to false for not resetting the local storage on
    // navigation, if it happens... idk why sometimes it does, sometimes dont.
    // https://www.reddit.com/r/react/comments/1b1n87v/comment/ksfznkr/
    const storedItems = JSON.parse(localStorage.getItem("selectedItems")!) ?? [];
    if (storedItems) {
      setSelectedItems(storedItems);
    }
  }, []);

  const handleToggleItem = (item: Item) => {
    item.quantity = item.quantity ? 0 : 1;
    const isAlreadySelected = selectedItems.some(
      (selected) => selected.path === item.path
    );

    if (isAlreadySelected) {
      // Remove the item if it's already selected
      setSelectedItems(
        selectedItems.filter((selected) => selected.path !== item.path)
      );
    } else {
      // Add the item if it's not selected
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleClearList = () => {
    setSelectedItems([]); // Clear the state
    setTotalQuantity(0);
    localStorage.removeItem("selectedItems"); // Remove from local storage
  };

  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add("overflow-hidden")
    } else {
      document.documentElement.classList.remove("overflow-hidden")
    };

    // Only listen to keydown events when the modal is open
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      console.log("PRESSED ESCAPE KEY");
      // Close modal when Esc key pressed
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    const total = selectedItems.reduce((acc, item) => acc + (item.quantity ?? 0), 0);
    setTotalQuantity(total);
  }, [selectedItems]);

  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  return (
    <>
      <div className="flex flex-col items-center mt-6">
        <button
          className="hover:underline"
          onClick={() => setIsOpen(true)}
        >
          {dict.minecraft.keywords.itemsClickHere}
        </button>
        {selectedItems.length > 0 && (
          <button
            className="text-red-500 hover:text-red-600 hover:underline"
            onClick={() => handleClearList()}
          >
            {dict.minecraft.keywords.clearSelection}
          </button>
        )}
      </div>
      <div className={clsx(
        "w-full bg-black px-8 mt-5 h-[90lvh] overflow-auto relative",
        "border-2 border-neutral-400 dark:border-neutral-50",
      )}>
        <div className="sticky top-0 bg-black py-4 z-10">
          <h3 className="text-lg text-white">
            {dict.minecraft.keywords.selectedItems}
          </h3>
          <p className="text-neutral-500">
            {dict.minecraft.keywords.totalQuantity}: {totalQuantity}
          </p>
        </div>
        {selectedItems.map((item) => (
          <div
            key={item.name}
            className={clsx(
              "text-neutral-200 my-2 border-b border-neutral-900 py-3",
              "flex justify-between w-full select-none duration-150",
              item.done && "line-through text-neutral-500"
            )}
          >
            <div className="flex gap-2 items-center">
              <Image
                src={'/img/minecraft/1.21/' + item.path}
                className={clsx(
                  "duration-300",
                  item.done && "grayscale brightness-50"
                )}
                alt={item.name}
                draggable={false}
                width={32}
                height={32}
                loading="lazy"
                unoptimized
              />
              <div className="max-sm:w-32 overflow-x-auto">
                <p className="truncate">{item.name}</p>
              </div>
            </div>
            <div className="flex items-center">
              <label
                htmlFor={"done" + item.path}
                className="cursor-pointer mx-4"
              >
                <Image
                  src={'/img/minecraft/items_list_icon.png'}
                  className={clsx(
                    "size-5 min-w-fit duration-150",
                    !item.done && "grayscale"
                  )}
                  alt="Checklist icon"
                  draggable={false}
                  width={0}
                  height={0}
                />
              </label>
              <input
                id={"done" + item.path}
                type="checkbox"
                checked={!!item.done}
                hidden
                aria-hidden
                tabIndex={-1}
                onChange={(e) => {
                  item.done = e.target.checked;
                  setSelectedItems([...selectedItems]);
                }}
              />

              <input
                type="number"
                placeholder="0"
                className={clsx(
                  "focus:outline-none [appearance:textfield] p-2 bg-black",
                  "placeholder:text-neutral-400 border-2 w-16 duration-150",
                  "text-center text-sm",
                  item.done ?
                    "border-neutral-600 text-neutral-500" :
                    "border-neutral-100"
                )}
                value={item.quantity === 0 ? "" : item.quantity}
                onChange={(e) => {
                  const quantity = parseInt(e.target.value);
                  item.quantity = isNaN(quantity) ? 0 : quantity;
                  setSelectedItems([...selectedItems]);
                }}
              />

              <button
                onClick={() => handleToggleItem(item)}
                className="ml-2.5"
              >
                <Image
                  src={'/img/minecraft/items_list_icon_X.png'}
                  alt="Checklist icon"
                  className="min-w-fit size-3"
                  draggable={false}
                  width={0}
                  height={0}
                />
              </button>
            </div>
          </div>
        ))}
        <div className="flex flex-col my-16">
          <button
            className="hover:underline w-fit mx-auto"
            onClick={() => setIsOpen(true)}
          >
            {dict.minecraft.keywords.selectMore}
          </button>
          <button
            className="text-red-500 hover:text-red-600 hover:underline w-fit mx-auto"
            onClick={() => handleClearList()}
          >
            {dict.minecraft.keywords.clearSelection}
          </button>
        </div>
      </div>

      {/* Select Items modal */}
      {isOpen && (
        <div
          onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
          className="
            fixed top-0 left-0 w-full h-screen flex flex-col items-center
            justify-center bg-black/70 z-50
          "
        >
          <div
            className="
              bg-soapstone p-5 sm:max-w-sm lg:max-w-2xl w-full h-3/4
              rounded-sm dark:bg-cinder
            "
          >
            <div className="flex items-center justify-end gap-3">
              {selectedItems.length > 0 && (
                <button
                  onClick={handleClearList}
                  className="text-red-500 hover:text-red-600 hover:underline duration-150"
                >
                  {dict.minecraft.keywords.clearSelection}
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
              >
                <XIcon />
              </button>
            </div>

            <div className="px-5 py-2.5 rounded-md">
              <h3 className="text-lg">
                {dict.minecraft.keywords.selectedItems}
              </h3>
              <p className="text-sm text-neutral-400">
                {dict.minecraft.keywords.selectedItemsDescription}
              </p>
              <div className="flex flex-wrap gap-1 h-32 overflow-auto py-2.5 px-2.5">
                {selectedItems.map((item) => (
                  <button
                    key={item.path}
                    className="cursor-pointer p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-gray-800 duration-150 relative group select-none size-12"
                    onClick={() => handleToggleItem(item)} // Remove item on click
                  >
                    <span
                      className={clsx(
                        "fixed -mx-4 -my-3 w-max px-1.5 rounded-md text-white",
                        "bg-neutral-800 duration-300 z-10 text-xs opacity-0",
                        "pointer-events-none group-hover:opacity-100"
                      )}
                    >
                      {item.name}
                    </span>
                    <img
                      src={'/img/minecraft/1.21/' + item.path}
                      alt={item.name}
                      width={44}
                      height={44}
                      draggable={false}
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
              <Separator className="my-5 max-w-sm mx-auto" />
            </div>

            <h1 className="text-xl">
              {dict.minecraft.keywords.itemSelector}
            </h1>

            <ItemButton
              dict={dict}
              handleToggleItem={handleToggleItem}
            />
          </div>
        </div>
      )}
    </>
  )
};