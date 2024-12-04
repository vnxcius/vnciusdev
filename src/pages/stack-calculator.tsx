import { useEffect, useState } from "react";
import MinecraftLayout from "../components/minecraft-layout";
import { Helmet } from "react-helmet";

const StackCalculator = () => {
  const [items, setItems] = useState<string>("");
  const [result, setResult] = useState({ stacks: 0, remainingItems: 0 });
  const [stacks, setStacks] = useState<string>("");
  const [stacksRemaining, setStacksRemaining] = useState<string>("");
  const [stacksResult, setStacksResult] = useState<string>("");

  const calculateItems = () => {
    if (items === "") {
      setStacks("");
      setStacksRemaining("");
      return;
    };
    const numericItems = parseInt(items, 10) || 0;
    setResult(countItems(numericItems));
  };

  const calculateStacks = () => {
    if (stacks === "" && stacksRemaining === "") return;
    countStacks(parseInt(stacks, 10) || 0, parseInt(stacksRemaining, 10) || 0);
  };

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
    const totalItems = stacks * itemsPerStack + remainingItems;

    setStacksResult(totalItems.toString());
    setItems(totalItems.toString());
  };

  useEffect(() => {
    calculateItems();
  }, [items]);

  useEffect(() => {
    calculateStacks();
  }, [stacks, stacksRemaining]);

  return (
    <MinecraftLayout>
      <Helmet title="Stack Calculator | Minecraft Tools" />
      <div className="max-w-2xl mx-auto px-4 max-sm:max-w-sm">
        <h1 className="text-4xl font-mojangles text-neutral-700 dark:text-neutral-200">
          Stack Calculator
        </h1>
        <hr className="border-neutral-200 dark:border-[#292c32] mt-5" />
        <div className="flex flex-col w-fit mt-7 space-y-1.5">
          <label
            htmlFor="items"
            className="font-mojangles text-neutral-700 dark:text-neutral-200"
          >
            Items
          </label>
          <input
            id="items"
            type="number"
            value={items}
            autoFocus
            placeholder="Enter number of items"
            className="
              focus:outline-none [appearance:textfield] font-mojangles p-3 w-64
              placeholder:text-neutral-400 border-2 border-neutral-400
              bg-black text-neutral-200 shadow dark:border-neutral-50
            "
            onChange={(e) => {
              // Allow only numeric input or an empty string
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setItems(value);
              }
            }}
          />
          <div
            className="
              text-neutral-800 dark:text-neutral-200 text-lg py-2.5
              flex items-center gap-3.5 font-mojangles
            "
          >
            <div className="flex items-center gap-2">
              <img
                src="/img/spruce_planks_stack.png"
                alt="Stack Spruce Planks Icons"
                width={28}
                height={28}
              />
              <span>
                {result.stacks} stacks
              </span>
            </div>
            <div className="flex items-center gap-2">
              <img
                src="/img/spruce_planks.png"
                alt="Stack Spruce Planks Icons"
                width={28}
                height={28}
              />
              <span>
                {result.remainingItems} items
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 w-fit mt-7">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="stacks"
              className="font-mojangles text-neutral-700 dark:text-neutral-200"
            >
              Stacks
            </label>
            <input
              id="stacks"
              type="number"
              value={stacks}
              placeholder="Enter number of stacks"
              className="
                focus:outline-none [appearance:textfield] font-mojangles p-3 w-64
                placeholder:text-neutral-400 border-2 border-neutral-400
                bg-black text-neutral-200 shadow dark:border-neutral-50
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
          <div className="flex flex-col gap-2">
            <label
              htmlFor="stacks"
              className="font-mojangles text-neutral-700 dark:text-neutral-200"
            >
              Items
            </label>
            <input
              id="items"
              type="number"
              value={stacksRemaining}
              placeholder="Enter number of items"
              className="
                focus:outline-none [appearance:textfield] font-mojangles p-3 w-64
                placeholder:text-neutral-400 border-2 border-neutral-400
                bg-black text-neutral-200 shadow dark:border-neutral-50
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
        <div
          className="
            flex items-center text-neutral-800 dark:text-neutral-200
            font-mojangles text-lg gap-2 py-2.5
          "
        >
          <img
            src="/img/spruce_planks.png"
            alt="Stack Spruce Planks Icons"
            width={28}
            height={28}
          />
          <p>
            {stacksResult || "0"} items
          </p>
        </div>
      </div>
    </MinecraftLayout>
  )
};

export default StackCalculator;