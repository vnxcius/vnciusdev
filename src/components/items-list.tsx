"use client"

import { DictionaryJSON } from "@/types/locales";
import ItemSelector from "@/components/item-selector";

export default function ItemsList({
  dict
}: {
  dict: DictionaryJSON
}) {
  return (
    <section className="mt-10" id="items-list">
      <h2 className="text-2xl">
        {dict.minecraft.keywords.itemsList}
      </h2>
      <p className="text-sm text-neutral-400">
        {dict.minecraft.keywords.itemsListDescription}
      </p>
      <ItemSelector dict={dict} />
    </section>
  )
}