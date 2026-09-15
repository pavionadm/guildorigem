import Image from "next/image";
import Link from "next/link";

const BG_URL =
  "https://res.cloudinary.com/dpyhkwaw9/image/upload/v1789431851/origem_d1iycp.jpg";

export default function GuildHero(): React.ReactElement {
  return (
    <section className="relative flex min-h-[70svh] items-end overflow-hidden sm:min-h-[85svh]">
      <Image
        src={BG_URL}
        alt=""
        fill
        priority
        quality={80}
        sizes="100vw"
        className="object-cover object-top"
      />
      <div className="absolute inset-0 bg-guild-vignette" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 sm:pb-16">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold-light/80">
          AdventureQuest Worlds
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-parchment text-shadow-ember sm:text-6xl">
          Guild Origem
        </h1>
        <p className="mt-4 max-w-xl text-sm text-mist sm:text-base">
          Uma guild forjada por quem joga junto há anos. Missões, farm de badges,
          eventos de guerra e sempre alguém on-line pra fazer dungeon.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/guia"
            className="rounded-sm bg-gold px-5 py-2.5 text-center font-medium text-ink transition-colors hover:bg-gold-light"
          >
            Guias de Farm
          </Link>
          <Link
            href="/personagem"
            className="rounded-sm border border-mist/30 px-5 py-2.5 text-center text-mist transition-colors hover:border-gold/50 hover:text-gold-light"
          >
            Buscar Personagem
          </Link>
        </div>
      </div>
    </section>
  );
}
