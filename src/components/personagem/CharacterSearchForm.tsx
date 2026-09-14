"use client";

import { useState } from "react";

interface Props {
  onSearch: (nome: string) => void;
  isLoading: boolean;
}

export default function CharacterSearchForm({ onSearch, isLoading }: Props): React.ReactElement {
  const [value, setValue] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const trimmed = value.trim();
    if (trimmed.length === 0) return;
    onSearch(trimmed);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        maxLength={25}
        placeholder="Nome do personagem (ex: Artix)"
        aria-label="Nome do personagem"
        className="w-full flex-1 rounded-sm border border-gold/30 bg-void-2 px-4 py-2.5 text-parchment placeholder:text-mist/40 focus:border-gold focus:outline-none"
      />
      <button
        type="submit"
        disabled={isLoading || value.trim().length === 0}
        className="rounded-sm bg-gold px-6 py-2.5 font-medium text-ink transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Buscando..." : "Buscar"}
      </button>
    </form>
  );
}
