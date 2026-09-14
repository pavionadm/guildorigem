import { useMemo } from "react";
import type { CharacterInventoryItem } from "@/types/aqw";

function wikiLink(name: string): string {
  const slug = encodeURIComponent(name.replace(/[':;\s]/g, "-"));
  return `https://aqwwiki.wikidot.com/${slug}`;
}

export default function InventoryList({
  items,
}: {
  items: CharacterInventoryItem[];
}): React.ReactElement {
  const itemsByType = useMemo(() => {
    const grouped = new Map<string, CharacterInventoryItem[]>();
    for (const item of items) {
      const current = grouped.get(item.strType) ?? [];
      current.push(item);
      grouped.set(item.strType, current);
    }
    return Array.from(grouped.entries());
  }, [items]);

  if (items.length === 0) {
    return <p className="py-6 text-center text-sm text-ink/60">Inventário vazio.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {itemsByType.map(([tipo, tipoItems]) => (
        <div
          key={tipo}
          className="inventory-category frame-gold rounded-sm bg-void-2 p-3"
        >
          <h4 className="font-display text-xs uppercase tracking-wide text-gold-light">
            {tipo}
          </h4>
          <ul className="mt-2 space-y-1.5 text-sm leading-6">
            {tipoItems.map((item) => (
              <li key={`${item.strType}-${item.strName}`}>
                <a
                  href={wikiLink(item.strName)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    item.bCoins
                      ? "break-words font-semibold text-gold-light underline-offset-2 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                      : item.bUpgrade
                        ? "break-words font-semibold text-sky-200 underline-offset-2 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                        : "break-words font-medium text-parchment underline-offset-2 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  }
                >
                  {item.strName}
                  {item.intCount > 1 ? (
                    <span className="ml-1 whitespace-nowrap font-normal text-mist/85">×{item.intCount}</span>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
