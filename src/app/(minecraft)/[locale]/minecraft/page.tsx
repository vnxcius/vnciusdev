import Tools from "@/components/tools";
import { Locale } from "@/types/locales";
import { getDictionary } from "@/utils/dictionaries";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const dictionary = await getDictionary((await params).locale);
  return (
    <Tools dict={dictionary} />
  )
};