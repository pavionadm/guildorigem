"use client";

import { useState } from "react";
import type { CharacterData } from "@/types/aqw";
import CharacterViewer from "./CharacterViewer";
import BadgeList from "./BadgeList";
import InventoryList from "./InventoryList";

const CAMPOS: Array<{ label: string; key: keyof CharacterData["summary"] }> = [
  { label: "Level", key: "level" },
  { label: "Classe", key: "className" },
  { label: "Arma", key: "weaponName" },
  { label: "Armadura", key: "armorName" },
  { label: "Elmo", key: "helmName" },
  { label: "Capa", key: "capeName" },
  { label: "Pet", key: "petName" },
  { label: "Acessório", key: "miscName" },
  { label: "Facção", key: "faction" },
];
const BADGE_BASE_URL = "https://game.aq.com/game/gamefiles/badges/";

export default function CharacterCard({ character }: { character: CharacterData }): React.ReactElement {
  const [painelAberto, setPainelAberto] = useState<"badges" | "inventario" | null>(null);
  const { summary } = character;

  return (
    <div className="space-y-4">
      <CharacterViewer rawFlashVars={character.rawFlashVars} characterName={summary.name} />

      <div className="frame-gold rounded-sm bg-parchment p-5 text-center text-ink">
        <h2 className="font-display text-2xl font-semibold">{summary.name}</h2>
        {summary.guild ? <p className="text-sm text-ink/70">Guild: {summary.guild}</p> : null}
        <dl className="mx-auto mt-4 grid max-w-3xl grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid-cols-4">
          {CAMPOS.map(({ label, key }) => {
            const valor = summary[key];
            if (!valor) return null;
            return (
              <div key={key}>
                <dt className="font-mono text-[11px] font-semibold uppercase tracking-wide text-[#212121]/60">{label}</dt>
                <dd className="font-semibold">{valor}</dd>
              </div>
            );
          })}
        </dl>
        {character.badges.length > 0 ? (
          <div className="mx-auto mt-5 flex max-w-3xl flex-wrap items-center justify-center gap-4 overflow-visible rounded-sm bg-[#FEF1BF] p-4 sm:gap-5">
            {character.badges.slice(0, 5).map((badge) => (
              <div key={badge.sFileName} className="group relative isolate">
                <img
                  src={`${BADGE_BASE_URL}${badge.sFileName}`}
                  alt={badge.sTitle}
                  width={96}
                  height={80}
                  loading="lazy"
                  className="h-20 w-24 object-contain drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]"
                />
                <span className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-[min(240px,calc(100vw-2rem))] -translate-x-1/2 whitespace-normal break-words rounded-sm bg-black px-2 py-1 text-[10px] text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  {badge.sTitle}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="frame-gold overflow-hidden rounded-sm bg-parchment text-[#212121]">
        <button
          type="button"
          onClick={() => setPainelAberto(painelAberto === "badges" ? null : "badges")}
          aria-expanded={painelAberto === "badges"}
          className="flex w-full items-center justify-between px-4 py-3 text-left font-display text-sm font-semibold text-[#212121]"
        >
          Achievements ({character.badges.length})
          <span aria-hidden>{painelAberto === "badges" ? "−" : "+"}</span>
        </button>
        {painelAberto === "badges" ? <div className="border-t border-[#212121]/10 p-4"><BadgeList badges={character.badges} /></div> : null}
      </div>

      <div className="frame-gold overflow-hidden rounded-sm bg-parchment text-[#212121]">
        <button
          type="button"
          onClick={() => setPainelAberto(painelAberto === "inventario" ? null : "inventario")}
          aria-expanded={painelAberto === "inventario"}
          className="flex w-full items-center justify-between px-4 py-3 text-left font-display text-sm font-semibold text-[#212121]"
        >
          Inventory ({character.inventory.length})
          <span aria-hidden>{painelAberto === "inventario" ? "−" : "+"}</span>
        </button>
        {painelAberto === "inventario" ? <div className="border-t border-[#212121]/10 p-4"><InventoryList items={character.inventory} /></div> : null}
      </div>
    </div>
  );
}
