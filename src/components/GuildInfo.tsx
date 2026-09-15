import Image from "next/image";

// TODO: colar aqui a URL definitiva da imagem de cenário para a seção
// "Sobre" (uma cena/arte do AQW que represente a guild).
// Enquanto ficar vazia, um placeholder estilizado é exibido no lugar.
const BG_URL = "";

const PILARES = [
  {
    titulo: "Missões em grupo",
    texto: "Chamadas frequentes para farmar classes, badges e itens raros juntos.",
  },
  {
    titulo: "Guerra de Guildas",
    texto: "Participação ativa nos eventos de guerra, com estratégia combinada.",
  },
  {
    titulo: "Comunidade",
    texto: "Chat sempre ativo — dúvidas, dicas de build e histórias da AQ Worlds.",
  },
];

export default function GuildInfo(): React.ReactElement {
  return (
    <section id="sobre" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="grid gap-8 sm:grid-cols-[1.1fr_0.9fr] sm:items-center sm:gap-12">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold/80">
            Sobre
          </p>
          <h2 className="mt-2 font-display text-2xl text-parchment sm:text-3xl">
            Quem somos
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-mist sm:text-base">
            A Guild Origem nasceu de um grupo de amigos que não largava o AQW nem depois
            de anos de jogo. Hoje reunimos jogadores de todos os níveis, do recém-chegado
            ao level 100 com inventário lotado, em torno de uma ideia simples: jogar
            junto é melhor.
          </p>

          <ul className="mt-8 space-y-5">
            {PILARES.map((pilar) => (
              <li key={pilar.titulo} className="border-l-2 border-gold/40 pl-4">
                <h3 className="font-display text-base text-gold-light">{pilar.titulo}</h3>
                <p className="mt-1 text-sm text-mist/90">{pilar.texto}</p>
              </li>
            ))}
          </ul>
        </div>

 <div className="frame-gold relative aspect-[4/5] w-full overflow-hidden rounded-sm">
          <Image
            src="/origem.png"
            alt="Cenário de AdventureQuest Worlds"
            fill
            quality={60}
            sizes="(min-width: 640px) 40vw, 90vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
