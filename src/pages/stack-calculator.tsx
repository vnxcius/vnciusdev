import { useEffect, useState } from "react";
import MinecraftLayout from "../components/minecraft-layout";
import { Helmet } from "react-helmet";

const StackCalculator = () => {
  const [items, setItems] = useState<string>("");
  const [result, setResult] = useState({ stacks: 0, remainingItems: 0 });
  const [stacks, setStacks] = useState<string>("");
  const [stacksRemaining, setStacksRemaining] = useState<string>("");
  const [stacksResult, setStacksResult] = useState<string>("");

  const [shulkers, setShulkers] = useState<string>("");
  const [chests, setChests] = useState<string>("");

  const calculateItems = () => {
    if (items === "") {
      setStacks("");
      setStacksRemaining("");
      setStacksResult("");
      setResult({ stacks: 0, remainingItems: 0 });
      return;
    };
    const numericItems = parseInt(items, 10) || 0;
    setResult(countItems(numericItems));
  };

  const calculateStacks = () => {
    if (stacks === "" && stacksRemaining === "") return;
    countStacks(parseInt(stacks, 10) || 0, parseInt(stacksRemaining, 10) || 0);
  };

  const calculateShulkers = () => {
    // 1728 items per shulker
    if (items === "") {
      setShulkers("");
      return;
    };

    const numericItems = parseInt(items, 10) || 0;
    const shulkers = Math.ceil(numericItems / 1728);
    setShulkers(shulkers.toString());
  };

  const calculateChests = () => {
    // 1728 items per chest and 3456 items per double chest
    if (items === "") {
      setChests("");
      return;
    };

    const numericItems = parseInt(items, 10) || 0;
    const chests = Math.ceil(numericItems / 3456);
    setChests(chests.toString());
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
    calculateShulkers();
    calculateChests();
  }, [items]);

  useEffect(() => {
    calculateStacks();
  }, [stacks, stacksRemaining]);

  return (
    <MinecraftLayout>
      <Helmet title="Stack Calculator | Minecraft Tools" />
      <div
        className="
          font-mojangles text-neutral-700 dark:text-neutral-200 mx-auto px-4
          max-w-2xl max-sm:max-w-sm
        "
      >
        <h1 className="text-4xl">Stack Calculator</h1>
        <hr className="border-neutral-200 dark:border-[#292c32] mt-5 duration-100" />
        <div className="flex flex-col mt-7 space-y-1.5">
          <label htmlFor="items">
            Items
          </label>
          <input
            id="items"
            type="number"
            value={items}
            autoFocus
            placeholder="Enter number of items"
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
              <img
                src="/img/spruce_planks_stack.png"
                alt="Stack Spruce Planks Icon"
                className="select-none"
                draggable={false}
                unselectable="on"
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
                alt="Spruce Planks Icon"
                className="select-none"
                draggable={false}
                unselectable="on"
                width={28}
                height={28}
              />
              <span>
                {result.remainingItems} items
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-7">
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="stacks">
              Stacks
            </label>
            <input
              id="stacks"
              type="number"
              value={stacks}
              placeholder="Enter number of stacks"
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
              Items
            </label>
            <input
              id="items"
              type="number"
              value={stacksRemaining}
              placeholder="Enter number of items"
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
          <img
            src="/img/spruce_planks.png"
            alt="Spruce Planks Icon"
            className="select-none"
            draggable={false}
            unselectable="on"
            width={28}
            height={28}
          />
          <p>
            {stacksResult || "0"} items
          </p>
        </div>
        <p className="text-center">
          or
        </p>
        <div className="flex justify-center items-center flex-wrap max-sm:gap-7 mt-7">
          <div className="flex items-center text-lg gap-3 w-64">
            <img
              src="/img/shulker_box.webp"
              alt="Shulker Box Icon"
              className="select-none"
              draggable={false}
              unselectable="on"
              width={28}
              height={28}
            />
            <p>
              {shulkers || "0"} shulker boxes
              <span className="text-xs block text-neutral-400">
                27 stacks per shulker
              </span>
            </p>
          </div>
          <div className="flex items-center text-lg gap-3 w-64">
            <img
              src="/img/chest.webp"
              alt="Chest Icon"
              className="select-none"
              draggable={false}
              unselectable="on"
              width={28}
              height={28}
            />
            <p>
              {chests || "0"} double chests
              <span className="text-xs block text-neutral-400">
                54 stacks per double chest
              </span>
            </p>
          </div>
        </div>
      </div>
    </MinecraftLayout>
  )
};

export default StackCalculator;