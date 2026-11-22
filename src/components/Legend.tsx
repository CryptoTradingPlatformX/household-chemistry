import { LEGEND, type LegendEntry } from "../content/colors";
import type { ElementSymbol } from "../content/species";

export function Legend({ symbols }: { symbols?: readonly (ElementSymbol | "e")[] }) {
  const entries: LegendEntry[] = symbols
    ? LEGEND.filter((entry) => symbols.includes(entry.symbol) || entry.symbol === "e")
    : LEGEND;
  return (
    <div className="legend-block">
      <ul className="legend" aria-label="Atom colors">
        {entries.map((atom) => (
          <li key={atom.symbol}>
            <span className="swatch" style={{ background: atom.color, color: atom.ink }}>
              {atom.symbol === "e" ? "" : atom.symbol}
            </span>
            {atom.name}
          </li>
        ))}
      </ul>
      <p className="legend-note">
        Letters sit on the atoms. A gold speck is an electron. Long chains are drawn shorter than the formula so the shape fits.
      </p>
    </div>
  );
}
