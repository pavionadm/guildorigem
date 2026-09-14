import type { Metadata } from "next";
import NewsCard from "@/components/novidades/NewsCard";
import { getNewsFeed } from "@/lib/aqwwiki";
import type { NewsItem } from "@/types/news";

export const metadata: Metadata = {
  title: "Novidades | Guild Origem",
  description: "Últimas atualizações, eventos e itens novos do AQW.",
};

export default async function NovidadesPage(): Promise<React.ReactElement> {
  let news: NewsItem[] = [];

  try {
    news = await getNewsFeed();
  } catch {
    news = [];
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold/80">AQW</p>
      <h1 className="mt-2 font-display text-2xl text-parchment sm:text-3xl">Novidades</h1>
      <p className="mt-2 max-w-xl text-sm text-mist">
        Atualizações recentes do jogo, sincronizadas automaticamente do AQWorlds Wiki.
      </p>

      <div className="mt-8">
        {news.length === 0 ? (
          <div className="frame-gold rounded-sm bg-void-2 px-4 py-10 text-center">
            <p className="text-sm text-mist/70">
              Não deu para sincronizar as novidades agora. Tente novamente mais tarde.
            </p>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {news.map((item, index) => (
              <li key={`${item.imageUrl}-${index}`}>
                <NewsCard item={item} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mt-8 text-[11px] text-mist/35">
        Dados via{" "}
        <a
          href="https://aqwwiki.wikidot.com/new-releases"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-mist/60"
        >
          AQWorlds Wiki
        </a>
        , sob licença Creative Commons BY-SA 3.0.
      </p>
    </section>
  );
}
