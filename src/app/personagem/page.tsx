import type { Metadata } from "next";
import { Suspense } from "react";
import CharacterSearch from "@/components/personagem/CharacterSearch";

export const metadata: Metadata = {
  title: "Buscar Personagem | Guild Origem",
};

export default function PersonagemPage(): React.ReactElement {
  return (
    <section className="min-h-screen bg-[#0b0906] px-4 py-10 text-[#EEE2B8] sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#EEE2B8]/80">AQW</p>
      <h1 className="mt-2 font-display text-2xl text-[#EEE2B8] sm:text-3xl">
        Buscar Personagem
      </h1>
      <p className="mt-2 max-w-xl text-sm text-[#EEE2B8]/75">
        Digite o nome exato de um personagem de AdventureQuest Worlds para ver level,
        equipamentos, badges e inventário direto da conta.
      </p>

      <div className="mt-8">
        <Suspense fallback={null}>
          <CharacterSearch />
        </Suspense>
      </div>
      </div>
    </section>
  );
}
