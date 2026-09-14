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
    <div className="space-y-7 rounded-sm bg-[#e6d6b4] p-4 sm:p-6">
      {badgesByCategory.map(([categoria, categoryBadges]) => (
        <div key={categoria} className="badge-category">
          <h4 className="font-display text-sm uppercase tracking-wide text-ink">
            {categoria}
          </h4>
          <div className="mt-4 flex flex-wrap gap-4 sm:gap-5">
            {categoryBadges.map((badge) => (
              <img
                key={badge.sFileName}
                src={`${BADGE_BASE_URL}${badge.sFileName}`}
                alt={badge.sTitle}
                title={`${badge.sTitle} — ${badge.sDesc}`}
                width={96}
                height={80}
                loading="lazy"
                decoding="async"
                className="h-20 w-24 object-contain drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
