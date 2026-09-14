const MAX_NAME_LENGTH = 25;

/**
 * Nomes de personagem na AQW aceitam letras, números, espaços e alguns
 * caracteres pontuais. Qualquer coisa fora disso é rejeitada — nunca
 * repassamos a query string do usuário direto para a requisição upstream.
 */
const NAME_PATTERN = /^[\p{L}\p{N} '_-]{1,25}$/u;

export function sanitizeCharacterName(input: string | null): string | null {
  if (!input) return null;

  const trimmed = input.trim().slice(0, MAX_NAME_LENGTH);
  if (trimmed.length === 0) return null;
  if (!NAME_PATTERN.test(trimmed)) return null;

  return trimmed;
}

export function isValidCcid(value: number): boolean {
  return Number.isInteger(value) && value > 0 && value < 100_000_000;
}
