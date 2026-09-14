export default function Footer(): React.ReactElement {
  const currentYear = new Date().getFullYear();
  const copyrightYears = currentYear > 2026 ? `2026–${currentYear}` : "2026";

  return (
    <footer className="border-t border-gold/15 bg-void py-8">
      <div className="mx-auto max-w-6xl px-4 text-center text-xs text-mist/60 sm:px-6">
        <p>Guild Origem — comunidade independente de jogadores de AdventureQuest Worlds.</p>
        <p className="mt-1">
          AdventureQuest Worlds e todos os personagens são marcas registradas da Artix
          Entertainment, LLC. Este site não é afiliado à Artix Entertainment.
        </p>
        <p className="mt-3 text-mist/40">
          ©{" "}
          <a
            href="https://x.com/zrhaqw"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-mist/70"
          >
            {copyrightYears} Gabriel Pavion
          </a>
          . Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
