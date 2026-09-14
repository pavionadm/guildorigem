import Image from "next/image";
import type { GuideStep } from "@/types/guide";
import { GUIDE_IMAGE_PLACEHOLDER_HINT } from "@/data/guides";

export default function GuideStepBlock({
  step,
  index,
}: {
  step: GuideStep;
  index: number;
}): React.ReactElement {
  return (
    <article className="space-y-4 border-t border-gold/15 pt-8 first:border-t-0 first:pt-0">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold/70">
          Passo {index + 1}
        </p>
        <h3 className="mt-1 font-display text-lg text-parchment sm:text-xl">{step.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-mist sm:text-base">{step.description}</p>
      </div>

      <div className="frame-gold relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-void-2">
        {step.imageUrl ? (
          <Image
            src={step.imageUrl}
            alt={step.imageAlt}
            fill
            quality={70}
            sizes="(min-width: 768px) 720px, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-6 text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold/50">
              Imagem em breve
            </span>
            <span className="max-w-sm text-xs text-mist/45">{GUIDE_IMAGE_PLACEHOLDER_HINT}</span>
            <span className="mt-1 max-w-md text-[11px] text-mist/30">{step.imageAlt}</span>
          </div>
        )}
      </div>
    </article>
  );
}
