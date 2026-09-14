"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { GUIDE_CATEGORIES } from "@/data/guides";
import type { GuideCategoryId } from "@/types/guide";
import type { WikiItem } from "@/types/wikiItem";
import WikiCatalogItem from "./WikiCatalogItem";

type CategoryFilter = GuideCategoryId | "all";

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

const AVAILABLE_CATEGORIES = new Set(
  GUIDE_CATEGORIES.map((category) => category.id)
);

export default function WikiCatalogBrowser({
  items,
}: {
  items: WikiItem[];
}): React.ReactElement {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const deferredQuery = useDeferredValue(query);

  const categoriesWithItems = useMemo(
    () => GUIDE_CATEGORIES.filter((cat) => AVAILABLE_CATEGORIES.has(cat.id)),
    []
  );

  const results = useMemo(() => {
    const needle = normalize(deferredQuery);

    return items.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (!needle) return true;
      return normalize(item.name).includes(needle);
    });
  }, [items, deferredQuery, category]);

  if (items.length === 0) {
    return (
      <div className="frame-gold rounded-sm bg-void-2 px-4 py-8 text-center">
        <p className="text-sm text-mist/70">
          Não deu para sincronizar o catálogo do wiki agora. Tente novamente mais tarde.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <label htmlFor="wiki-catalogo-busca" className="sr-only">
          Buscar item no catálogo do wiki
        </label>
        <input
          id="wiki-catalogo-busca"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar no catálogo do wiki (nome em inglês)..."
          className="w-full rounded-sm border border-gold/30 bg-void-2 px-4 py-3 text-parchment placeholder:text-mist/40 focus:border-gold focus:outline-none"
        />

        <div className="themed-scrollbar flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
          <CategoryChip active={category === "all"} onClick={() => setCategory("all")} label="Todos" />
          {categoriesWithItems.map((item) => (
            <CategoryChip
              key={item.id}
              active={category === item.id}
              onClick={() => setCategory(item.id)}
              label={item.labelPt}
              hint={item.labelEn}
            />
          ))}
        </div>
      </div>

      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist/50">
        {results.length} item{results.length === 1 ? "" : "ns"} do wiki
      </p>

      {results.length === 0 ? (
        <div className="frame-gold rounded-sm bg-void-2 px-4 py-10 text-center">
          <p className="text-sm text-mist/70">Nenhum item encontrado para essa busca.</p>
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {results.slice(0, 60).map((item) => (
            <li key={item.url}>
              <WikiCatalogItem item={item} />
            </li>
          ))}
        </ul>
      )}

      {results.length > 60 ? (
        <p className="text-center text-xs text-mist/40">
          Mostrando 60 de {results.length} itens — refine a busca para ver mais.
        </p>
      ) : null}
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
