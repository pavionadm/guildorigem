"use client";

import { useState } from "react";
import type { CharacterData } from "@/types/aqw";
import CharacterSearchForm from "./CharacterSearchForm";
import CharacterCard from "./CharacterCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";

type Status = "idle" | "loading" | "success" | "error";

export default function CharacterSearch(): React.ReactElement {
  const [status, setStatus] = useState<Status>("idle");
  const [character, setCharacter] = useState<CharacterData | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSearch(nome: string): Promise<void> {
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch(`/api/personagem?nome=${encodeURIComponent(nome)}`);
      const data: unknown = await response.json();

      if (!response.ok) {
        const message =
          typeof data === "object" && data !== null && "error" in data
            ? String((data as { error: unknown }).error)
            : "Não foi possível buscar o personagem.";
        setErrorMessage(message);
        setStatus("error");
        return;
      }

      setCharacter(data as CharacterData);
      setStatus("success");
    } catch {
      setErrorMessage("Falha de conexão. Tente novamente.");
      setStatus("error");
    }
  }

  return (
    <div className="space-y-6">
      <CharacterSearchForm onSearch={handleSearch} isLoading={status === "loading"} />

      {status === "loading" ? <LoadingSpinner label="Buscando personagem..." /> : null}
      {status === "error" ? <ErrorMessage message={errorMessage} /> : null}
      {status === "success" && character ? <CharacterCard character={character} /> : null}
    </div>
  );
}
