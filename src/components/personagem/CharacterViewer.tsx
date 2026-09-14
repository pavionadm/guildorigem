"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

function downloadBlob(blob: Blob, characterName: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${characterName.replace(/[^\p{L}\p{N}_-]+/gu, "-")}-aqw.png`;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function CharacterViewer({ rawFlashVars, characterName }: Props): React.ReactElement {
  const [ruffleReady, setRuffleReady] = useState(false);
  const [captureStatus, setCaptureStatus] = useState<string | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.RufflePlayer) setRuffleReady(true);
  }, []);

  const captureCharacter = useCallback(async (): Promise<void> => {
    setCaptureStatus("Preparando captura…");
    const canvas = viewerRef.current?.querySelector("canvas");
    if (canvas instanceof HTMLCanvasElement) {
      try {
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
        if (blob) {
          downloadBlob(blob, characterName);
          setCaptureStatus("Imagem salva");
          window.setTimeout(() => setCaptureStatus(null), 2200);
          return;
        }
      } catch {
        // O canvas pode estar protegido por CORS; use o fallback de captura da aba.
      }
    }

    if (!navigator.mediaDevices?.getDisplayMedia) {
      setCaptureStatus("Seu navegador bloqueou a captura. Tente Chrome ou Edge.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: "browser" },
        audio: false,
      });
      const track = stream.getVideoTracks()[0];
      if (!track) throw new Error("No capture track");
      const video = document.createElement("video");
      video.srcObject = stream;
      video.muted = true;
      await video.play();
      await new Promise((resolve) => window.requestAnimationFrame(() => resolve(undefined)));
      const snapshot = document.createElement("canvas");
      snapshot.width = video.videoWidth;
      snapshot.height = video.videoHeight;
      snapshot.getContext("2d")?.drawImage(video, 0, 0);
      track.stop();
      video.srcObject = null;
      const blob = await new Promise<Blob | null>((resolve) => snapshot.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("Empty snapshot");
      downloadBlob(blob, characterName);
      setCaptureStatus("Imagem salva");
      window.setTimeout(() => setCaptureStatus(null), 2200);
    } catch {
      setCaptureStatus("Captura cancelada. Permita o compartilhamento desta aba para tentar novamente.");
    }
  }, [characterName]);

  if (!rawFlashVars) {
    return (
      <div
        className="frame-gold flex aspect-[715/455] w-full items-center justify-center rounded-sm bg-void-2"
        aria-label={`Sprite de ${characterName} indisponível`}
      >
        <p className="px-6 text-center text-xs text-mist/70">
          Visualização 3D indisponível para este personagem no momento.
        </p>
      </div>
    );
  }

  return (
    <div ref={viewerRef} className="character-viewer frame-gold relative aspect-[715/455] w-full overflow-hidden rounded-sm bg-void-2">
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
          className="character-swf block h-full w-full"
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
      <button
        type="button"
        onClick={captureCharacter}
        className="absolute right-3 top-3 z-20 rounded-sm border border-gold/50 bg-void/85 px-3 py-2 text-sm text-gold-light shadow-lg transition hover:bg-void hover:text-parchment"
        aria-label={`Capturar imagem do personagem ${characterName}`}
        title="Capturar personagem"
      >
        <span aria-hidden>▣</span>
      </button>
      {captureStatus ? (
        <p className="absolute bottom-3 left-3 z-20 rounded-sm bg-void/90 px-3 py-2 text-[11px] text-parchment" role="status">
          {captureStatus}
        </p>
      ) : null}
    </div>
  );
}
