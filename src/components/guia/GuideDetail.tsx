import Link from "next/link";
import type { Guide } from "@/types/guide";
import { getCategory } from "@/lib/guides";
import GuideStepBlock from "./GuideStepBlock";

export default function GuideDetail({ guide }: { guide: Guide }): React.ReactElement {
  const category = getCategory(guide.category);

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <Link
          href="/guia"
          className="inline-flex text-sm text-mist/70 transition-colors hover:text-gold-light"
        >
          ← Voltar aos guias
        </Link>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold/80">
            {category.labelPt} · {category.labelEn}
          </p>
          <h1 className="mt-2 font-display text-2xl text-parchment sm:text-4xl">
            {guide.namePt}
          </h1>
          <p className="mt-1 text-base text-mist/75 sm:text-lg">{guide.nameEn}</p>
        </div>

        <p className="max-w-2xl text-sm leading-relaxed text-mist sm:text-base">
          {guide.summary}
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-gold-light">Missão</h2>
        <p className="text-sm leading-relaxed text-mist sm:text-base">{guide.quest}</p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-gold-light">Itens necessários</h2>
        <ul className="space-y-2">
          {guide.requirements.map((item) => (
            <li
              key={item}
              className="border-l-2 border-gold/40 pl-3 text-sm leading-relaxed text-mist sm:text-base"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-8">
        <div>
          <h2 className="font-display text-xl text-gold-light">Passo a passo</h2>
          <p className="mt-1 text-sm text-mist/60">
            Cada etapa começa com o texto e, em seguida, a imagem ilustrando o passo.
          </p>
        </div>

        <div className="space-y-10">
          {guide.steps.map((step, index) => (
            <GuideStepBlock key={`${guide.slug}-${index}`} step={step} index={index} />
          ))}
        </div>
      </section>
    </article>
  );
}
