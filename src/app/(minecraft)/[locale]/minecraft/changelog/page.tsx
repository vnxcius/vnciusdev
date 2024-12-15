import { useTranslations } from "next-intl";
import ChangelogItem from "@/components/ui/changelog-item";

export default function Page() {
  const t = useTranslations();
  return (
    <>
      <div className="w-fit mx-auto my-10">
        <h1 className="text-3xl text-center">Changelog</h1>
        <p className="text-neutral-500 dark:text-gray-400 my-1">
          {t('changelog.description')}
        </p>
      </div>

      <div className="font-mono">
        <ChangelogItem title="v1.11" date="2024-12-14">
          <li>
            {t('changelog.structureImprovement')}
          </li>
          <li>
            {t('changelog.createdChangelog')}
          </li>
          <li>
            ♻️ &#47;br -&gt; &#47;pt
          </li>
        </ChangelogItem>
        <ChangelogItem title="v1.1" date="2024-12-12">
          <li>
            {t('changelog.addedTool')}{": "}
            {t('minecraft.itemsList')}
          </li>
          <li>
            🌎 Localization
          </li>
        </ChangelogItem>
        <ChangelogItem title="v1.0" date="2024-12-04">
          <li>
            {t('changelog.addedTool')}{": "}
            {t('minecraft.stackCalculator')}
          </li>
          <li>
            {t('changelog.firstRelease')}
          </li>
        </ChangelogItem>
      </div>
    </>
  )
}