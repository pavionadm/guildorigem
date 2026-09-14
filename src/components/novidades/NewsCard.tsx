import Image from "next/image";
import type { NewsItem } from "@/types/news";

export default function NewsCard({ item }: { item: NewsItem }): React.ReactElement {
  const daysWithChangeLog = item.days.filter((day) => day.changeLog.length > 0);

  return (
    <a
      href={item.wikiUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="frame-gold block overflow-hidden rounded-sm bg-void-2/80 transition-colors hover:bg-void-2"
    >
      <div className="relative aspect-[16/9] w-full bg-void-2">
        <Image
          src={item.imageUrl}
          alt={item.imageAlt}
          fill
          quality={70}
          sizes="(min-width: 768px) 480px, 100vw"
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="px-4 py-4 sm:px-5">
        {daysWithChangeLog.length > 0 ? (
          <ul className="space-y-3">
            {daysWithChangeLog.map((day) => (
              <li key={day.date}>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/80">
                  {day.date}
                </span>
                <ul className="mt-1 list-disc space-y-1 pl-4">
                  {day.changeLog.map((line, index) => (
                    <li key={index} className="text-sm leading-relaxed text-mist sm:text-base">
                      {line}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm leading-relaxed text-mist sm:text-base">
            Novos itens e atualizações da semana no AQWorlds.
          </p>
        )}
        <p className="mt-3 text-xs text-mist/60">Ver no Wiki oficial ↗</p>
      </div>
    </a>
  );
}
