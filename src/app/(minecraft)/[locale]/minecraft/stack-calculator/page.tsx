import ItemsList from "@/components/items-list";
import Separator from "@/components/ui/separator";
import StackCalculator from "@/components/stack-calculator";
import { Locale } from "@/types/locales";
import { getDictionary } from "@/utils/dictionaries";

export const metadata = {
  title: "Stack Calculator | Minecraft Tools",
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const dictionary = await getDictionary((await params).locale);
  return (
    <>
      <StackCalculator dict={dictionary} />
      <Separator className="mt-10" />
      <ItemsList dict={dictionary} />
    </>
  )
};
