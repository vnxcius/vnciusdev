"use client"

import ItemSelector from "@/components/item-selector";
import { useTranslations } from "next-intl";

export default function ItemsList() {
  const t = useTranslations("minecraft");
  return (
    <section className="mt-10" id="items-list">
      <h2 className="text-2xl">
        {t('itemsList')}
      </h2>
      <p className="text-sm text-neutral-400">
        {t('itemsListDescription')}
      </p>
      <ItemSelector />
    </section>
  )
}