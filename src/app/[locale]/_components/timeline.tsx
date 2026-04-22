import {
  ArrowUpRightIcon,
  BuildingOfficeIcon,
  CalendarBlankIcon,
  GraduationCapIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import { getDictionary } from "@/dictionaries";

export default async function ExperienceTimeline({
  locale,
}: {
  locale: "en" | "pt";
}) {
  const dict = await getDictionary(locale);

  const items = [
    {
      id: 1,
      title: dict.landing.experiences[0].title,
      description: dict.landing.experiences[0].description,
      date: `07.2025 - ${dict.landing.present}`,
      icon: BuildingOfficeIcon,
      link: dict.landing.experiences[0].link,
    },
    {
      id: 2,
      title: dict.landing.experiences[1].title,
      description: dict.landing.experiences[1].description,
      date: "2022 - 2024",
      icon: GraduationCapIcon,
      link: dict.landing.experiences[1].link,
    },
  ];
  return (
    <Timeline defaultValue={3}>
      {items.map((item) => (
        <TimelineItem
          className="group-data-[orientation=vertical]/timeline:ms-10"
          key={item.id}
          step={item.id}
        >
          <TimelineHeader>
            <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
            <TimelineTitle className="mt-0.5">
              {item.link ? (
                <a
                  referrerPolicy="no-referrer"
                  href={item.link}
                  target="_blank"
                  className="flex items-center gap-1 hover:text-emerald-600 hover:underline"
                >
                  {item.title}
                  <ArrowUpRightIcon size={10} />
                </a>
              ) : (
                <span>{item.title}</span>
              )}
            </TimelineTitle>
            <TimelineIndicator className="flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7 group-data-completed/timeline-item:bg-green-500 group-data-completed/timeline-item:text-black">
              <item.icon size={14} />
            </TimelineIndicator>
          </TimelineHeader>
          <TimelineContent>
            {item.description}
            <div className="mt-2 flex items-center gap-2 *:text-muted-foreground/70">
              <CalendarBlankIcon size={16} className="mb-1" />
              <TimelineDate>{item.date}</TimelineDate>
            </div>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
