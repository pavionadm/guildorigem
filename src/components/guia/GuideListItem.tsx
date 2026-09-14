import Link from "next/link";
import type { Guide } from "@/types/guide";
import { getCategory } from "@/lib/guides";

export default function GuideListItem({ guide }: { guide: Guide }): React.ReactElement {
  const category = getCategory(guide.category);

  return (
    <Link
      href={`/guia/${guide.slug}`}
      className="frame-gold block rounded-sm bg-void-2/80 px-4 py-4 transition-colors hover:bg-void-2 sm:px-5"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/80">
          {category.labelPt} · {category.labelEn}
        </span>
      </div>
      <h2 className="mt-2 font-display text-lg text-parchment sm:text-xl">{guide.namePt}</h2>
      <p className="mt-0.5 text-sm text-mist/70">{guide.nameEn}</p>
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-mist/90">{guide.summary}</p>
    </Link>
  );
}
