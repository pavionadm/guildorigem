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

export default function CharacterCard({ character }: { character: CharacterData }): React.ReactElement {
  const [painelAberto, setPainelAberto] = useState<"badges" | "inventario" | null>(null);
  const { summary } = character;

  return (
    <div className="space-y-4">
      <CharacterViewer rawFlashVars={character.rawFlashVars} characterName={summary.name} />

      <div className="frame-gold rounded-sm bg-parchment p-5 text-ink">
        <h2 className="font-display text-2xl">{summary.name}</h2>
        {summary.guild ? (
          <p className="text-sm text-ink/70">Guild: {summary.guild}</p>
        ) : null}

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-4">
          {CAMPOS.map(({ label, key }) => {
            const valor = summary[key];
            if (!valor) return null;
            return (
              <div key={key}>
                <dt className="font-mono text-[11px] uppercase tracking-wide text-ink/50">
                  {label}
                </dt>
                <dd className="font-medium">{valor}</dd>
              </div>
            );
          })}
        </dl>
      </div>

      <div className="frame-gold overflow-hidden rounded-sm bg-parchment text-ink">
        <button
          type="button"
          onClick={() => setPainelAberto(painelAberto === "badges" ? null : "badges")}
          aria-expanded={painelAberto === "badges"}
          className="flex w-full items-center justify-between px-4 py-3 text-left font-display text-sm text-ink"
        >
          Achievements ({character.badges.length})
          <span aria-hidden>{painelAberto === "badges" ? "−" : "+"}</span>
        </button>
        {painelAberto === "badges" ? (
          <div className="border-t border-ink/10 p-4">
            <BadgeList badges={character.badges} />
          </div>
        ) : null}
      </div>

      <div className="frame-gold overflow-hidden rounded-sm bg-parchment text-ink">
        <button
          type="button"
          onClick={() => setPainelAberto(painelAberto === "inventario" ? null : "inventario")}
          aria-expanded={painelAberto === "inventario"}
          className="flex w-full items-center justify-between px-4 py-3 text-left font-display text-sm text-ink"
        >
          Inventário ({character.inventory.length})
          <span aria-hidden>{painelAberto === "inventario" ? "−" : "+"}</span>
        </button>
        {painelAberto === "inventario" ? (
          <div className="border-t border-ink/10 p-4">
            <InventoryList items={character.inventory} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
