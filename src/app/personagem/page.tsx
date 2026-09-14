import type { Metadata } from "next";
import CharacterSearch from "@/components/personagem/CharacterSearch";

export const metadata: Metadata = {
  title: "Buscar Personagem | Guild Origem",
};

export default function PersonagemPage(): React.ReactElement {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold/80">AQW</p>
      <h1 className="mt-2 font-display text-2xl text-parchment sm:text-3xl">
        Buscar Personagem
      </h1>
      <p className="mt-2 max-w-xl text-sm text-mist">
        Digite o nome exato de um personagem de AdventureQuest Worlds para ver level,
        equipamentos, badges e inventário direto da conta.
      </p>

      <div className="mt-8">
        <CharacterSearch />
      </div>
    </section>
  );
}
