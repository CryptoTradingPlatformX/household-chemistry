import { useEffect, useState } from "react";

const KEY = "household-atom-style";

export type AtomStyle = "all" | "simplified";

function readStyle(): AtomStyle {
  try {
    return window.localStorage.getItem(KEY) === "simplified" ? "simplified" : "all";
  } catch {
    return "all";
  }
}

export function useAtomStyle(): [AtomStyle, (next: AtomStyle) => void] {
  const [style, setStyle] = useState<AtomStyle>(readStyle);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === KEY) setStyle(readStyle());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function update(next: AtomStyle) {
    try {
      window.localStorage.setItem(KEY, next);
    } catch {
      /* private mode can refuse storage; the choice still applies on this page */
    }
    setStyle(next);
  }

  return [style, update];
}
