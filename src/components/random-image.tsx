import { useEffect, useState } from "react";

// ── Module-level shared state ────────────────────────────────────────────
// Lens renders `children` twice (base + magnified), creating two RandomImage
// instances with the same `src`. These caches ensure both share one request
// and one resolved URL.

const resolvedCache = new Map<string, string>(); // src → final URL
const pendingLoads = new Map<string, Promise<string>>(); // src → in-flight promise
const usedFingerprints = new Set<string>(); // content hashes already assigned
const usedUrls = new Set<string>(); // fallback when canvas is tainted (CORS)

const MAX_RETRIES = 8;

// ── Content fingerprint ──────────────────────────────────────────────────
// Draws the loaded image onto a tiny 8×8 canvas and hashes the pixel data.
// Returns null if the canvas is tainted (CORS issue), in which case we fall
// back to URL-based dedup.
function fingerprint(img: HTMLImageElement): string | null {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 8;
    canvas.height = 8;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, 8, 8);
    const pixels = ctx.getImageData(0, 0, 8, 8).data;
    // 64 pixels × 3 bytes (RGB) → 192-char hex string
    const parts: string[] = [];
    for (let i = 0; i < pixels.length; i += 4) {
      // Average the 3 channels into 1 byte per pixel (64 bytes total)
      const avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
      parts.push(Math.floor(avg).toString(16).padStart(2, "0"));
    }
    return parts.join("");
  } catch {
    // Canvas tainted — can't read pixel data
    return null;
  }
}

// ── Image loader with content-aware dedup ───────────────────────────────
function loadImage(src: string, retryDepth: number): Promise<string> {
  // 1. Cache hit — already resolved this exact src
  const cached = resolvedCache.get(src);
  if (cached) return Promise.resolve(cached);

  // 2. In-flight — reuse the pending promise (handles Lens double-render)
  const pending = pendingLoads.get(src);
  if (pending) return pending;

  // 3. Start a new load
  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("image load failed"));
    img.src = src;
  })
    .then(async (img) => {
      pendingLoads.delete(src);
      const finalUrl = img.src;

      // 4. Content-based dedup — compare pixel fingerprints
      const fp = fingerprint(img);

      if (fp !== null) {
        // Canvas readable — use fingerprint-based dedup
        if (usedFingerprints.has(fp) && retryDepth < MAX_RETRIES) {
          return loadImage(retrySrc(src), retryDepth + 1);
        }
        usedFingerprints.add(fp);
      } else {
        // Canvas tainted — fall back to URL-based dedup
        if (usedUrls.has(finalUrl) && retryDepth < MAX_RETRIES) {
          return loadImage(retrySrc(src), retryDepth + 1);
        }
        usedUrls.add(finalUrl);
      }

      // 5. Record & return
      resolvedCache.set(src, finalUrl);
      return finalUrl;
    })
    .catch(() => {
      // On error, just use the original src and don't cache
      pendingLoads.delete(src);
      return src;
    });

  pendingLoads.set(src, promise);
  return promise;
}

// ── Helpers ──────────────────────────────────────────────────────────────
function retrySrc(src: string): string {
  const [base, qs = ""] = src.split("?");
  const params = new URLSearchParams(qs);
  params.set("_r", Math.random().toString(36).slice(2, 10));
  return `${base}?${params.toString()}`;
}

/**
 * Resolves a random-image redirect URL once, then renders with a stable URL.
 *
 * Handles two problems at once:
 * - **Lens double-render**: two instances with the same src share one request
 * - **Duplicate images**: content-fingerprint dedup ensures three cards never
 *   show the same image, even when the server returns identical content at
 *   different URLs.
 */
export function RandomImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const cached = resolvedCache.get(src);
  const [resolved, setResolved] = useState<string | null>(cached ?? null);

  useEffect(() => {
    let cancelled = false;
    loadImage(src, 0).then((finalUrl) => {
      if (!cancelled) setResolved(finalUrl);
    });
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!resolved) {
    return <div className={`${className} bg-zinc-900 animate-pulse`} />;
  }

  return <img src={resolved} alt={alt} className={className} />;
}
