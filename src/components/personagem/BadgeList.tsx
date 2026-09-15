import { useMemo } from "react";
import type { CharacterBadge } from "@/types/aqw";

const BADGE_BASE_URL = "https://game.aq.com/game/gamefiles/badges/";

export default function BadgeList({ badges }: { badges: CharacterBadge[] }): React.ReactElement {
  const badgesByCategory = useMemo(() => {
    const grouped = new Map<string, CharacterBadge[]>();
    for (const badge of badges) {
      const current = grouped.get(badge.sCategory) ?? [];
      current.push(badge);
      grouped.set(badge.sCategory, current);
    }
    return Array.from(grouped.entries());
  }, [badges]);

  if (badges.length === 0) {
    return <p className="py-6 text-center text-sm text-ink/60">Nenhuma badge encontrada.</p>;
  }

  return (
    <div className="space-y-6 rounded-sm bg-[#FEF0C1] p-3 sm:space-y-7 sm:p-6">
      {badgesByCategory.map(([categoria, categoryBadges]) => (
        <div key={categoria} className="badge-category">
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-[#212121]">
            {categoria}
          </h4>
          <div className="mt-3 grid grid-cols-[repeat(auto-fill,minmax(5.25rem,1fr))] items-start gap-2 overflow-visible sm:mt-4 sm:grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] sm:gap-5">
            {categoryBadges.map((badge) => (
              <div key={badge.sFileName} className="group relative isolate flex min-w-0 justify-center">
                <img
                  src={`${BADGE_BASE_URL}${badge.sFileName}`}
                  alt={badge.sTitle}
                  width={96}
                  height={80}
                  loading="lazy"
                  decoding="async"
                  className="h-[4.5rem] w-[5.25rem] object-contain drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)] sm:h-20 sm:w-24"
                />
                <div className="pointer-events-none absolute bottom-full left-1/2 z-[100] mb-2 w-[min(280px,calc(100vw-2rem))] -translate-x-1/2 whitespace-normal break-words rounded-sm bg-black px-3 py-2 text-left text-xs text-white opacity-0 shadow-2xl transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                  <p className="font-semibold text-white">{badge.sTitle}</p>
                  <p className="mt-1 leading-relaxed text-white/75">{badge.sDesc || "Sem descrição disponível."}</p>
                </div>
                <span className="sr-only">{badge.sTitle}: {badge.sDesc}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
