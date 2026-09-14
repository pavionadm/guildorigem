/**
 * Rate limiter em memória (janela deslizante simples).
 *
 * Aviso: em ambientes serverless/edge com múltiplas instâncias, este Map
 * não é compartilhado entre instâncias — funciona bem para um único
 * processo Node (ex.: `next start` em VM/container) mas não é garantia
 * em plataformas com múltiplas réplicas. Para produção com múltiplas
 * instâncias, troque por um store durável (ex.: Upstash Redis).
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 20;

interface Bucket {
  count: number;
  windowStart: number;
}

const buckets = new Map<string, Bucket>();

export function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(identifier);

  if (!bucket || now - bucket.windowStart > WINDOW_MS) {
    buckets.set(identifier, { count: 1, windowStart: now });
    return true;
  }

  if (bucket.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  bucket.count += 1;
  return true;
}
