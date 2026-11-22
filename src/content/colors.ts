import type { ElementSymbol } from "./species";

export interface LegendEntry {
  symbol: ElementSymbol | "e";
  name: string;
  color: string;
  ink: string;
}

export const ELEMENT_COLORS: Record<ElementSymbol, { color: string; ink: string; name: string }> = {
  H: { color: "#f4f1ea", ink: "#3a342e", name: "hydrogen" },
  C: { color: "#3e4654", ink: "#fffaf6", name: "carbon" },
  N: { color: "#3d6fbe", ink: "#fffaf6", name: "nitrogen" },
  O: { color: "#e15b4a", ink: "#fffaf6", name: "oxygen" },
  F: { color: "#8fd18a", ink: "#16301a", name: "fluorine" },
  Na: { color: "#8d6bb8", ink: "#fffaf6", name: "sodium" },
  Al: { color: "#c5d0d8", ink: "#24303a", name: "aluminum" },
  P: { color: "#e09a3e", ink: "#3a2508", name: "phosphorus" },
  S: { color: "#e2c044", ink: "#3a2e08", name: "sulfur" },
  Cl: { color: "#3cba7a", ink: "#06281a", name: "chlorine" },
  K: { color: "#7a4e9a", ink: "#fffaf6", name: "potassium" },
  Ca: { color: "#d5ddd4", ink: "#24302a", name: "calcium" },
  Ti: { color: "#8a939c", ink: "#1c2126", name: "titanium" },
  Mn: { color: "#b06a8a", ink: "#fffaf6", name: "manganese" },
  Fe: { color: "#c46a45", ink: "#fffaf6", name: "iron" },
  Zn: { color: "#7f93a8", ink: "#14202c", name: "zinc" },
  Ag: { color: "#d9dde2", ink: "#22262b", name: "silver" },
};

export const ELECTRON_COLOR = "#f0d078";

export const LEGEND: LegendEntry[] = [
  ...(["H", "C", "N", "O", "F", "Na", "Al", "P", "S", "Cl", "K", "Ca", "Ti", "Mn", "Fe", "Zn", "Ag"] as const).map(
    (symbol) => ({ symbol, ...ELEMENT_COLORS[symbol] }),
  ),
  { symbol: "e", name: "electron", color: ELECTRON_COLOR, ink: "#3a2c08" },
];
