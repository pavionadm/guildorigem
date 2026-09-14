import type { Metadata } from "next";
import GuideBrowser from "@/components/guia/GuideBrowser";

export const metadata: Metadata = {
  title: "Guias de Farm | Guild Origem",
  description:
    "Guias de itens farmáveis do AQW por categoria — capacetes, espadas, armaduras, capas, pets, amuletos e mais.",
};

export default function GuiaPage(): React.ReactElement {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold/80">AQW</p>
      <h1 className="mt-2 font-display text-2xl text-parchment sm:text-3xl">Guias de Farm</h1>
      <p className="mt-2 max-w-xl text-sm text-mist">
        Capacetes, espadas, armaduras, capas, pets, amuletos e outros itens. Busque em
        português ou inglês e abra o passo a passo com imagens.
      </p>
      <div className="mt-8">
        <GuideBrowser />
      </div>
    </section>
  );
}
