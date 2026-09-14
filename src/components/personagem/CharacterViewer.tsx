"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

interface Props {
  rawFlashVars: string | null;
  characterName: string;
}

interface RuffleAPI {
  config: Record<string, unknown>;
}

declare global {
  interface Window {
    RufflePlayer?: RuffleAPI;
  }
}

const SWF_URL = "https://game.aq.com/game/gamefiles/etc/chardetail/characterB.swf?v=2";

export default function CharacterViewer({ rawFlashVars, characterName }: Props): React.ReactElement {
  const [ruffleReady, setRuffleReady] = useState(false);

  useEffect(() => {
    if (window.RufflePlayer) setRuffleReady(true);
  }, []);

  if (!rawFlashVars) {
    return (
      <div
        className="frame-gold flex aspect-[4/5] w-full items-center justify-center rounded-sm bg-void-2 sm:aspect-[715/455]"
        aria-label={`Sprite de ${characterName} indisponível`}
      >
        <p className="px-6 text-center text-xs text-mist/70">
          Visualização 3D indisponível para este personagem no momento.
        </p>
      </div>
    );
  }

  return (
    <div className="character-viewer frame-gold relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-void-2 sm:aspect-[715/455]">
      <Script
        src="https://unpkg.com/@ruffle-rs/ruffle"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.RufflePlayer) {
            window.RufflePlayer.config = {
              autoplay: "on",
              unmuteOverlay: "hidden",
              backgroundColor: "#0b0906",
              letterbox: "off",
              scale: "showall",
              wmode: "opaque",
              forceScale: true,
            };
          }
          setRuffleReady(true);
        }}
      />
      {ruffleReady ? (
        <object
          className="character-swf absolute inset-0 block h-full w-full"
          data={SWF_URL}
          type="application/x-shockwave-flash"
          width="715"
          height="455"
          aria-label={`Player nativo AQW do personagem ${characterName}`}
        >
          <param name="movie" value={SWF_URL} />
          <param name="FlashVars" value={rawFlashVars} />
          <param name="quality" value="high" />
          <param name="loop" value="true" />
          <param name="scale" value="showall" />
          <param name="allowScriptAccess" value="always" />
          <param name="menu" value="true" />
          <param name="wmode" value="opaque" />
        </object>
      ) : null}
    </div>
  );
}
