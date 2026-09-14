import type { Metadata } from "next";
import DiscordCommunity from "@/components/DiscordCommunity";
import GuildHero from "@/components/GuildHero";
import GuildInfo from "@/components/GuildInfo";

export const metadata: Metadata = {
  title: "Guild Origem | AQW",
  description:
    "Página oficial da Guild Origem em AdventureQuest Worlds — comunidade, membros e busca de personagens.",
};

export default function HomePage(): React.ReactElement {
  return (
    <>
      <GuildHero />
      <GuildInfo />
      <DiscordCommunity />
    </>
  );
}
