import Link from "next/link";

const DISCORD_INVITE = "https://discord.gg/mrEyu2UmVu";

const MEMBERS = [
  ["ZRH", "Leader", 100],
  ["chaosbxd", "Officer", 100],
  ["DarkMel", "Officer", 100],
  ["vordred the deathless", "Officer", 100],
  ["xx_natanael_xx", "Member", 100],
  ["TheMasion", "Member", 100],
  ["Madara1230", "Member", 66],
  ["Hertus", "Member", 100],
  ["juinor hector", "Member", 100],
  ["anjoloko_", "Member", 100],
  ["ArtistHumano", "Member", 37],
  ["torben013", "Member", 100],
  ["jp vida", "Member", 91],
  ["Arc4njo", "Member", 100],
  ["Pavion", "Member", 100],
  ["MARCOS FLAVIO 5", "Member", 71],
  ["BR henryke", "Member", 100],
  ["Rafaelrt12", "Member", 100],
  ["retrs", "Member", 75],
  ["abersoado", "Member", 96],
  ["MagiKopa", "Member", 74],
  ["Oga", "Member", 100],
  ["gabriel652", "Member", 100],
  ["Guild Origem", "Member", 28],
  ["SrSmash", "Member", 100],
  ["johnatas k", "Member", 100],
  ["Um_Nerd555", "Member", 100],
  ["Love Fury", "Member", 64],
  ["kira13", "Member", 100],
  ["marcosmg12", "Member", 96],
  ["LEGACYdavid", "Member", 94],
  ["Macabra asasino", "Member", 100],
  ["sadi123", "Member", 100],
  ["Hemy_", "Member", 78],
  ["Dragao Elias", "Member", 100],
  ["Sasq Utirra", "Member", 100],
  ["tuzins244", "Member", 40],
  ["Netsah", "Member", 95],
  ["Tchullito", "Member", 100],
  ["vampiro_007", "Member", 100],
  ["yunitayo", "Member", 58],
  ["NeymarJr01", "Member", 100],
  ["King Of Death", "Member", 100],
  ["Jesus Koreano", "Member", 37],
  ["LuanZika987", "Member", 100],
  ["xxx_vinicius_xxx", "Member", 100],
  ["usagui sam", "Member", 100],
  ["FLINAR", "Member", 99],
  ["Graxa", "Member", 96],
  ["iLynxGTZ", "Member", 38],
  ["nicola507", "Member", 100],
  ["DoomXHacker", "Member", 100],
  ["henrique_200", "Member", 100],
  ["Melly1", "Member", 56],
  ["tomasmartin1463", "Member", 92],
  ["i sorry", "Member", 94],
  ["K1r1t1n", "Member", 47],
  ["MaxMSK", "Member", 81],
  ["kikohom", "Member", 100],
  ["MarcosDono", "Member", 26],
  ["NoelBR07", "Member", 32],
  ["Katellyn Viana", "Member", 45],
  ["Robinman", "Member", null],
] as const;

export default function DiscordCommunity(): React.ReactElement {
  const leaders = MEMBERS.filter(([, rank]) => rank !== "Member").length;
  const maxLevel = MEMBERS.filter(([, , level]) => level === 100).length;

  return (
    <section id="comunidade" className="border-y border-gold/15 bg-void-2/70 px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold/80">Comunidade</p>
            <h2 className="mt-2 font-display text-2xl text-parchment sm:text-3xl">Entre no Discord da Guild Origem</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-mist sm:text-base">
              Encontre jogadores para farms, dungeons e eventos de guerra. O servidor é o ponto de encontro para chamadas, dúvidas e novidades da guilda.
            </p>
            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-3 rounded-sm bg-[#5865F2] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4752c4]"
            >
              <span aria-hidden className="text-lg">◈</span>
              Entrar no Discord
              <span aria-hidden>↗</span>
            </a>
            <p className="mt-3 font-mono text-[10px] text-mist/50">discord.gg/mrEyu2UmVu</p>
          </div>
          <div className="frame-gold rounded-sm bg-void p-5 sm:p-6">
            <div className="flex items-end justify-between gap-4 border-b border-gold/15 pb-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/70">Guild roster</p>
                <h3 className="mt-1 font-display text-xl text-parchment">Membros da Origem</h3>
              </div>
              <p className="font-mono text-xs text-mist/60">{MEMBERS.length} personagens</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2 sm:grid-cols-3">
              {MEMBERS.map(([name, rank, level]) => (
                <Link
                  key={name}
                  href={`/personagem?nome=${encodeURIComponent(name)}`}
                  className="group min-w-0 border-l border-gold/20 pl-2 transition-colors hover:border-gold"
                >
                  <p className="truncate text-xs text-parchment group-hover:text-gold-light" title={name}>{name}</p>
                  <p className="font-mono text-[9px] uppercase tracking-wide text-mist/45">
                    {rank === "Leader" ? "Líder" : rank === "Officer" ? "Oficial" : "Membro"}{level ? ` · Lv. ${level}` : ""}
                  </p>
                </Link>
              ))}
            </div>
            <p className="mt-5 border-t border-gold/10 pt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-mist/45">
              {leaders} liderança{leaders === 1 ? "" : "s"} · {maxLevel} no level 100 · atualização: setembro de 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
