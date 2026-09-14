"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/guia", label: "Guias" },
  { href: "/novidades", label: "Novidades" },
];

export default function Navbar(): React.ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gold/20 bg-void/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="font-display text-lg tracking-wide text-gold-light sm:text-xl"
        >
          Guild Origem
        </Link>

        <div className="hidden items-center gap-5 text-sm sm:flex sm:text-base">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-mist transition-colors hover:text-gold-light"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/personagem"
            className="rounded-sm border border-gold/50 px-3 py-1.5 text-gold-light transition-colors hover:bg-gold/10"
          >
            Buscar
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          className="flex h-9 w-9 items-center justify-center rounded-sm border border-gold/40 text-gold-light sm:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            className="h-5 w-5"
            aria-hidden="true"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {isMenuOpen ? (
        <div className="border-t border-gold/15 bg-void/95 px-4 py-3 sm:hidden">
          <div className="flex flex-col gap-3 text-sm">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-mist transition-colors hover:text-gold-light"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/personagem"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-sm border border-gold/50 px-3 py-2 text-center text-gold-light transition-colors hover:bg-gold/10"
            >
              Buscar
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
