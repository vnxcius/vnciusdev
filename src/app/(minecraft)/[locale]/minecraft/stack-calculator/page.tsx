import ItemsList from "@/components/items-list";
import Separator from "@/components/ui/separator";
import StackCalculator from "@/components/stack-calculator";

export const metadata = {
  title: "Stack Calculator | Minecraft Tools",
};

export default async function Page() {
  return (
    <>
      <StackCalculator />
      <Separator className="mt-10" />
      <ItemsList />
    </>
  )
};
