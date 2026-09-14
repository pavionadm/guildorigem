"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { GUIDE_CATEGORIES } from "@/data/guides";
import { filterGuides } from "@/lib/guides";
import type { GuideCategoryId } from "@/types/guide";
import GuideListItem from "./GuideListItem";

type CategoryFilter = GuideCategoryId | "all";

export default function GuideBrowser(): React.ReactElement {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(
    () => filterGuides(deferredQuery, category),
    [deferredQuery, category]
  );

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <label htmlFor="guia-busca" className="sr-only">
          Buscar guia por nome em português ou inglês
        </label>
        <input
          id="guia-busca"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar item (PT ou EN) — ex: NSoD, capacete, cape..."
          className="w-full rounded-sm border border-gold/30 bg-void-2 px-4 py-3 text-parchment placeholder:text-mist/40 focus:border-gold focus:outline-none"
        />

        <div className="themed-scrollbar flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
          <CategoryChip
            active={category === "all"}
            onClick={() => setCategory("all")}
            label="Todos"
          />
          {GUIDE_CATEGORIES.map((item) => (
            <CategoryChip
              key={item.id}
              active={category === item.id}
              onClick={() => setCategory(item.id)}
              label={`${item.labelPt}`}
              hint={item.labelEn}
            />
          ))}
        </div>
      </div>

      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist/50">
        {results.length} guia{results.length === 1 ? "" : "s"}
      </p>

      {results.length === 0 ? (
        <div className="frame-gold rounded-sm bg-void-2 px-4 py-10 text-center">
          <p className="text-sm text-mist/70">Nenhum guia encontrado para essa busca.</p>
          <p className="mt-1 text-xs text-mist/40">
            Tente o nome em inglês, português ou a categoria do item.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {results.map((guide) => (
            <li key={guide.slug}>
              <GuideListItem guide={guide} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CategoryChip({
  active,
  onClick,
  label,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  hint?: string;
}): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-sm border px-3 py-1.5 text-xs transition-colors sm:text-sm ${
        active
          ? "border-gold bg-gold/15 text-gold-light"
          : "border-gold/25 text-mist hover:border-gold/50 hover:text-gold-light"
      }`}
    >
      {label}
      {hint ? <span className="ml-1 text-mist/40">/{hint}</span> : null}
    </button>
  );
}
