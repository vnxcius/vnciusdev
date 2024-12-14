"use client"

import data from "@/assets/data/items.json";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Item {
  name: string;
  path: string;
  quantity?: number;
  done?: boolean;
};

function Button({ name, path, onClick }: { name: string; path: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "cursor-pointer p-0.5 rounded-md duration-150 select-none",
        "hover:bg-neutral-200 dark:hover:bg-gray-800 size-[44px]",
      )}
    >
      <img
        src={'/img/minecraft/1.21/' + path}
        alt={name}
        width={44}
        height={44}
        draggable={false}
        loading="lazy"
      />
    </button>
  )
};

export default function ItemButton({
  handleToggleItem,
}: {
  handleToggleItem: (item: Item) => void;
}) {
  const t = useTranslations("minecraft");
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const items = data.items;

  useEffect(() => {
    const filtered = items.filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredItems(filtered);
  }, [query, items]);
  return (
    <>
      <input
        type="text"
        placeholder={t('items')}
        className={clsx(
          "focus:outline-none [appearance:textfield] p-3 bg-black",
          "placeholder:text-neutral-400 border-2 border-neutral-400",
          "dark:border-neutral-50 text-neutral-50 w-full mt-2 mb-5",
        )}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="h-[calc(43%)] overflow-y-scroll">
        <div className="flex flex-wrap">
          {filteredItems.map((item) => (
            <Button
              key={item.path}
              path={item.path}
              name={item.name}
              onClick={() => handleToggleItem(item)}
            />
          ))}
        </div>
      </div>
    </>
  )
}