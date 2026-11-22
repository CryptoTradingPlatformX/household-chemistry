import type { ElementSymbol } from "../content/species";

export interface GeomAtom {
  el: ElementSymbol;
  x: number;
  y: number;
  r?: number;
}

export interface Geom {
  atoms: GeomAtom[];
  bonds: { a: number; b: number; order?: 1 | 2 | 3 }[];
  halo?: string;
}

function sphere(el: ElementSymbol, halo?: string, r = 13): Geom {
  return { atoms: [{ el, x: 0, y: 0, r }], bonds: [], halo };
}

function pair(el: ElementSymbol, order: 1 | 2 | 3 = 2, gap = 16): Geom {
  return {
    atoms: [
      { el, x: -gap / 2, y: 0 },
      { el, x: gap / 2, y: 0 },
    ],
    bonds: [{ a: 0, b: 1, order }],
  };
}

const glucose: Geom = {
  atoms: [
    { el: "C", x: 0, y: -16 },
    { el: "C", x: 14, y: -8 },
    { el: "C", x: 14, y: 8 },
    { el: "C", x: 0, y: 16 },
    { el: "C", x: -14, y: 8 },
    { el: "O", x: -14, y: -8 },
    { el: "O", x: 28, y: -14, r: 8 },
  ],
  bonds: [
    { a: 0, b: 1 },
    { a: 1, b: 2 },
    { a: 2, b: 3 },
    { a: 3, b: 4 },
    { a: 4, b: 5 },
    { a: 5, b: 0 },
    { a: 1, b: 6 },
  ],
};

export const MOLS = {
  h2o: {
    atoms: [
      { el: "O", x: 0, y: 2, r: 11 },
      { el: "H", x: -12, y: -8, r: 7 },
      { el: "H", x: 12, y: -8, r: 7 },
    ],
    bonds: [
      { a: 0, b: 1 },
      { a: 0, b: 2 },
    ],
  },
  o2: pair("O", 2),
  co2: {
    atoms: [
      { el: "O", x: -18, y: 0 },
      { el: "C", x: 0, y: 0 },
      { el: "O", x: 18, y: 0 },
    ],
    bonds: [
      { a: 0, b: 1, order: 2 },
      { a: 1, b: 2, order: 2 },
    ],
  },
  co: {
    atoms: [
      { el: "C", x: -9, y: 0 },
      { el: "O", x: 9, y: 0 },
    ],
    bonds: [{ a: 0, b: 1, order: 3 }],
  },
  h2o2: {
    atoms: [
      { el: "H", x: -18, y: -6, r: 7 },
      { el: "O", x: -6, y: 2 },
      { el: "O", x: 6, y: -2 },
      { el: "H", x: 18, y: 6, r: 7 },
    ],
    bonds: [
      { a: 0, b: 1 },
      { a: 1, b: 2 },
      { a: 2, b: 3 },
    ],
  },
  ch4: {
    atoms: [
      { el: "C", x: 0, y: 0 },
      { el: "H", x: 0, y: -16, r: 7 },
      { el: "H", x: -14, y: 10, r: 7 },
      { el: "H", x: 14, y: 10, r: 7 },
    ],
    bonds: [
      { a: 0, b: 1 },
      { a: 0, b: 2 },
      { a: 0, b: 3 },
    ],
  },
  ethanol: {
    atoms: [
      { el: "C", x: -12, y: 0 },
      { el: "C", x: 4, y: 0 },
      { el: "O", x: 18, y: -8 },
      { el: "H", x: 28, y: 0, r: 7 },
    ],
    bonds: [
      { a: 0, b: 1 },
      { a: 1, b: 2 },
      { a: 2, b: 3 },
    ],
  },
  acetic: {
    atoms: [
      { el: "C", x: -16, y: 4 },
      { el: "C", x: 0, y: 0 },
      { el: "O", x: 8, y: -14 },
      { el: "O", x: 14, y: 10 },
      { el: "H", x: 26, y: 6, r: 7 },
    ],
    bonds: [
      { a: 0, b: 1 },
      { a: 1, b: 2, order: 2 },
      { a: 1, b: 3 },
      { a: 3, b: 4 },
    ],
  },
  glucose,
  fructose: {
    atoms: [
      { el: "C", x: -8, y: -12 },
      { el: "C", x: 10, y: -4 },
      { el: "C", x: 6, y: 12 },
      { el: "C", x: -10, y: 10 },
      { el: "O", x: -16, y: -2 },
      { el: "O", x: 22, y: -12, r: 8 },
    ],
    bonds: [
      { a: 0, b: 1 },
      { a: 1, b: 2 },
      { a: 2, b: 3 },
      { a: 3, b: 4 },
      { a: 4, b: 0 },
      { a: 1, b: 5 },
    ],
  },
  sucrose: {
    atoms: [
      { el: "C", x: -20, y: -8 },
      { el: "C", x: -8, y: -14 },
      { el: "O", x: -4, y: 0 },
      { el: "C", x: -16, y: 8 },
      { el: "O", x: 8, y: 0 },
      { el: "C", x: 18, y: -10 },
      { el: "C", x: 24, y: 6 },
      { el: "O", x: 12, y: 12 },
    ],
    bonds: [
      { a: 0, b: 1 },
      { a: 1, b: 2 },
      { a: 2, b: 3 },
      { a: 3, b: 0 },
      { a: 2, b: 4 },
      { a: 4, b: 5 },
      { a: 5, b: 6 },
      { a: 6, b: 7 },
    ],
  },
  starch: glucose,
  hmf: {
    atoms: [
      { el: "C", x: -12, y: -8 },
      { el: "C", x: 2, y: -12 },
      { el: "C", x: 10, y: 0 },
      { el: "C", x: -2, y: 10 },
      { el: "O", x: -16, y: 4 },
      { el: "O", x: 22, y: -6, r: 8 },
    ],
    bonds: [
      { a: 0, b: 1, order: 2 },
      { a: 1, b: 2 },
      { a: 2, b: 3, order: 2 },
      { a: 3, b: 4 },
      { a: 4, b: 0 },
      { a: 2, b: 5 },
    ],
  },
  c: sphere("C", undefined, 11),
  n2: pair("N", 3, 16),
  no: {
    atoms: [
      { el: "N", x: -8, y: 0 },
      { el: "O", x: 8, y: 0 },
    ],
    bonds: [{ a: 0, b: 1, order: 2 }],
  },
  no2: {
    atoms: [
      { el: "O", x: -12, y: -8 },
      { el: "N", x: 0, y: 0 },
      { el: "O", x: -12, y: 10 },
    ],
    bonds: [
      { a: 0, b: 1, order: 2 },
      { a: 1, b: 2 },
    ],
  },
  nh3: {
    atoms: [
      { el: "N", x: 0, y: 2 },
      { el: "H", x: 0, y: -14, r: 7 },
      { el: "H", x: -12, y: 10, r: 7 },
      { el: "H", x: 12, y: 10, r: 7 },
    ],
    bonds: [
      { a: 0, b: 1 },
      { a: 0, b: 2 },
      { a: 0, b: 3 },
    ],
  },
  nh4: {
    atoms: [
      { el: "N", x: 0, y: 0 },
      { el: "H", x: 0, y: -14, r: 6 },
      { el: "H", x: 12, y: 6, r: 6 },
      { el: "H", x: -12, y: 6, r: 6 },
    ],
    bonds: [
      { a: 0, b: 1 },
      { a: 0, b: 2 },
      { a: 0, b: 3 },
    ],
    halo: "rgba(90, 140, 220, 0.35)",
  },
  h2s: {
    atoms: [
      { el: "S", x: 0, y: 2, r: 12 },
      { el: "H", x: -12, y: -8, r: 7 },
      { el: "H", x: 12, y: -8, r: 7 },
    ],
    bonds: [
      { a: 0, b: 1 },
      { a: 0, b: 2 },
    ],
  },
  cl2: pair("Cl", 1, 18),
  hocl: {
    atoms: [
      { el: "H", x: -16, y: 0, r: 7 },
      { el: "O", x: 0, y: 0 },
      { el: "Cl", x: 16, y: 0, r: 12 },
    ],
    bonds: [
      { a: 0, b: 1 },
      { a: 1, b: 2 },
    ],
  },
  ocl: {
    atoms: [
      { el: "O", x: -8, y: 0 },
      { el: "Cl", x: 10, y: 0, r: 12 },
    ],
    bonds: [{ a: 0, b: 1 }],
    halo: "rgba(80, 190, 140, 0.28)",
  },
  oh: {
    atoms: [
      { el: "O", x: -6, y: 0 },
      { el: "H", x: 10, y: 0, r: 7 },
    ],
    bonds: [{ a: 0, b: 1 }],
    halo: "rgba(225, 91, 74, 0.25)",
  },
  h: sphere("H", "rgba(255,255,255,0.2)", 8),
  na: sphere("Na", "rgba(141, 107, 184, 0.35)"),
  cl: sphere("Cl", "rgba(60, 186, 122, 0.28)"),
  ca: sphere("Ca", "rgba(213, 221, 212, 0.35)", 14),
  f: sphere("F", "rgba(143, 209, 138, 0.35)"),
  k: sphere("K", "rgba(122, 78, 154, 0.35)"),
  fe: sphere("Fe", undefined, 14),
  fe2: sphere("Fe", "rgba(196, 106, 69, 0.35)"),
  ag: sphere("Ag", undefined, 13),
  al: sphere("Al", undefined, 13),
  zn: sphere("Zn", "rgba(127, 147, 168, 0.35)"),
  s2: sphere("S", "rgba(226, 192, 68, 0.3)"),
  e: sphere("C", undefined, 5),
  photon: {
    atoms: [{ el: "C", x: 0, y: 0, r: 4 }],
    bonds: [],
    halo: "rgba(180, 140, 255, 0.45)",
  },
  nacl: {
    atoms: [
      { el: "Na", x: -8, y: -8, r: 10 },
      { el: "Cl", x: 8, y: -8, r: 11 },
      { el: "Cl", x: -8, y: 8, r: 11 },
      { el: "Na", x: 8, y: 8, r: 10 },
    ],
    bonds: [],
  },
  caco3: {
    atoms: [
      { el: "Ca", x: -12, y: 0, r: 12 },
      { el: "C", x: 8, y: 0, r: 9 },
      { el: "O", x: 20, y: -8, r: 8 },
      { el: "O", x: 20, y: 8, r: 8 },
    ],
    bonds: [
      { a: 1, b: 2, order: 2 },
      { a: 1, b: 3 },
    ],
  },
  ag2s: {
    atoms: [
      { el: "Ag", x: -12, y: -6, r: 11 },
      { el: "S", x: 0, y: 8, r: 11 },
      { el: "Ag", x: 12, y: -6, r: 11 },
    ],
    bonds: [
      { a: 0, b: 1 },
      { a: 2, b: 1 },
    ],
  },
  rust: {
    atoms: [
      { el: "Fe", x: -8, y: 0, r: 12 },
      { el: "O", x: 8, y: -8, r: 9 },
      { el: "O", x: 10, y: 8, r: 9 },
    ],
    bonds: [
      { a: 0, b: 1 },
      { a: 0, b: 2 },
    ],
  },
  zno: {
    atoms: [
      { el: "Zn", x: -8, y: 0, r: 12 },
      { el: "O", x: 10, y: 0, r: 10 },
    ],
    bonds: [{ a: 0, b: 1 }],
  },
  tio2: {
    atoms: [
      { el: "O", x: -14, y: 0, r: 9 },
      { el: "Ti", x: 0, y: 0, r: 12 },
      { el: "O", x: 14, y: 0, r: 9 },
    ],
    bonds: [
      { a: 0, b: 1, order: 2 },
      { a: 1, b: 2, order: 2 },
    ],
  },
  soap: {
    atoms: [
      { el: "C", x: -28, y: 6, r: 7 },
      { el: "C", x: -18, y: -4, r: 7 },
      { el: "C", x: -8, y: 6, r: 7 },
      { el: "C", x: 2, y: -4, r: 7 },
      { el: "C", x: 12, y: 6, r: 7 },
      { el: "O", x: 24, y: -2, r: 9 },
    ],
    bonds: [
      { a: 0, b: 1 },
      { a: 1, b: 2 },
      { a: 2, b: 3 },
      { a: 3, b: 4 },
      { a: 4, b: 5 },
    ],
    halo: "rgba(225, 91, 74, 0.18)",
  },
  oil: {
    atoms: [
      { el: "C", x: -24, y: 4, r: 7 },
      { el: "C", x: -12, y: -6, r: 7 },
      { el: "C", x: 0, y: 4, r: 7 },
      { el: "C", x: 12, y: -6, r: 7 },
      { el: "C", x: 24, y: 4, r: 7 },
    ],
    bonds: [
      { a: 0, b: 1 },
      { a: 1, b: 2 },
      { a: 2, b: 3 },
      { a: 3, b: 4 },
    ],
  },
  pet: {
    atoms: [
      { el: "C", x: -16, y: -8, r: 7 },
      { el: "C", x: 0, y: -12, r: 7 },
      { el: "C", x: 16, y: -8, r: 7 },
      { el: "C", x: 16, y: 8, r: 7 },
      { el: "C", x: 0, y: 12, r: 7 },
      { el: "C", x: -16, y: 8, r: 7 },
      { el: "O", x: 30, y: 0, r: 8 },
    ],
    bonds: [
      { a: 0, b: 1, order: 2 },
      { a: 1, b: 2 },
      { a: 2, b: 3, order: 2 },
      { a: 3, b: 4 },
      { a: 4, b: 5, order: 2 },
      { a: 5, b: 0 },
      { a: 2, b: 6 },
    ],
  },
  nylon: {
    atoms: [
      { el: "N", x: -24, y: 0, r: 9 },
      { el: "C", x: -10, y: 0, r: 8 },
      { el: "C", x: 4, y: 0, r: 8 },
      { el: "N", x: 18, y: 0, r: 9 },
      { el: "O", x: -10, y: -14, r: 8 },
    ],
    bonds: [
      { a: 0, b: 1 },
      { a: 1, b: 2 },
      { a: 2, b: 3 },
      { a: 1, b: 4, order: 2 },
    ],
  },
  dye: {
    atoms: [
      { el: "C", x: -18, y: 0, r: 8 },
      { el: "C", x: -8, y: -10, r: 8 },
      { el: "C", x: 6, y: -8, r: 8 },
      { el: "C", x: 14, y: 4, r: 8 },
      { el: "C", x: 4, y: 12, r: 8 },
      { el: "N", x: -10, y: 10, r: 8 },
    ],
    bonds: [
      { a: 0, b: 1, order: 2 },
      { a: 1, b: 2 },
      { a: 2, b: 3, order: 2 },
      { a: 3, b: 4 },
      { a: 4, b: 5, order: 2 },
      { a: 5, b: 0 },
    ],
    halo: "rgba(180, 80, 180, 0.25)",
  },
  melanin: {
    atoms: [
      { el: "C", x: -12, y: -8, r: 8 },
      { el: "C", x: 4, y: -10, r: 8 },
      { el: "N", x: 14, y: 2, r: 9 },
      { el: "C", x: 2, y: 10, r: 8 },
      { el: "C", x: -12, y: 8, r: 8 },
      { el: "O", x: -24, y: 0, r: 8 },
    ],
    bonds: [
      { a: 0, b: 1, order: 2 },
      { a: 1, b: 2 },
      { a: 2, b: 3, order: 2 },
      { a: 3, b: 4 },
      { a: 4, b: 0 },
      { a: 4, b: 5 },
    ],
  },
  hb: {
    atoms: [
      { el: "Fe", x: 0, y: 0, r: 12 },
      { el: "N", x: 0, y: -16, r: 8 },
      { el: "N", x: 16, y: 0, r: 8 },
      { el: "N", x: 0, y: 16, r: 8 },
      { el: "N", x: -16, y: 0, r: 8 },
    ],
    bonds: [
      { a: 0, b: 1 },
      { a: 0, b: 2 },
      { a: 0, b: 3 },
      { a: 0, b: 4 },
    ],
  },
} as const satisfies Record<string, Geom>;

export type MolId = keyof typeof MOLS;

const ELECTRON_OVERRIDE = new Set<MolId>(["e"]);

export function isElectron(id: MolId): boolean {
  return ELECTRON_OVERRIDE.has(id);
}
