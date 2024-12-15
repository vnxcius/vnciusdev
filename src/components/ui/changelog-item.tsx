import clsx from "clsx";
import { useLocale } from "next-intl";

export default function ChangelogItem({
  children,
  title,
  date,
}: {
  children: React.ReactNode;
  title: string;
  date: string;
}) {
  const locale = useLocale();

  return (
    <div className="flex gap-5 relative">
      <div
        className={clsx(
          "w-0.5 bg-green-500 min-h-full translate-y-2 before:absolute",
          "before:top-0 before:-left-[.31rem] before:size-3 before:rounded-full",
          "before:border-green-500 before:border-2 before:duration-150",
          "before:bg-soapstone before:dark:bg-cinder"
        )}
      />
      <div>
        <h2 className="text-xl">{title}</h2>
        <p className="text-gray-600">
          {new Date(date).toLocaleDateString(locale, {
            year: "numeric",
            month: "long",
            day: "2-digit",
            timeZone: "UTC",
          })}
        </p>
        <ul className="list-disc list-inside space-y-1.5 my-3.5">
          {children}
        </ul>
      </div>
    </div>
  )
}