import type { WikiItem, WikiItemTag } from "@/types/wikiItem";
import { getCategory } from "@/lib/guides";

const TAG_LABELS: Record<WikiItemTag, string> = {
  ac: "AC",
  legend: "Legend",
  rare: "Raro",
  seasonal: "Sazonal",
  pseudo: "Pseudo-classe",
  special: "Especial",
  beta: "Beta",
  ptr: "PTR",
  founder: "Founder",
  upholder: "Upholder",
  temporary: "Temporário",
};

export default function WikiCatalogItem({ item }: { item: WikiItem }): React.ReactElement {
  const category = getCategory(item.category);

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="frame-gold block rounded-sm bg-void-2/80 px-4 py-4 transition-colors hover:bg-void-2 sm:px-5"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/80">
          {category.labelPt} · {category.labelEn}
        </span>
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-sm border border-gold/25 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-mist/60"
          >
            {TAG_LABELS[tag]}
          </span>
        ))}
      </div>
      <h3 className="mt-2 font-display text-base text-parchment sm:text-lg">{item.name}</h3>
      <p className="mt-1 text-xs text-mist/60">Ver no Wiki oficial ↗</p>
    </a>
  );
}
