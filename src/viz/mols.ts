import { ELEMENTS, type ElementSymbol } from "../content/species";

export interface GeomAtom {
  el: ElementSymbol;
  x: number;
  y: number;
  r?: number;
  /** Heavy-atom index this hydrogen is bonded to. Simplified mode prints it there. */
  parent?: number;
}

export interface Geom {
  atoms: GeomAtom[];
  bonds: { a: number; b: number; order?: 1 | 2 | 3 }[];
  halo?: string;
  /** A chain continues past this picture. The stub is not an atom. */
  stubs?: { x1: number; y1: number; x2: number; y2: number }[];
}

export type Formula = Partial<Record<ElementSymbol, number>>;

interface Heavy {
  el: ElementSymbol;
  h?: number;
  x: number;
  y: number;
  r?: number;
  stub?: { x: number; y: number };
}

const HBOND = 11;

function place(heavies: Heavy[], links: { a: number; b: number; order?: 1 | 2 | 3 }[], halo?: string): Geom {
  const atoms: GeomAtom[] = heavies.map((heavy) => ({
    el: heavy.el,
    x: heavy.x,
    y: heavy.y,
    r: heavy.r ?? (heavy.el === "H" ? 7 : 10),
  }));
  const bonds: { a: number; b: number; order?: 1 | 2 | 3 }[] = links.map((link) => ({
    a: link.a,
    b: link.b,
    order: link.order,
  }));
  const stubs: Geom["stubs"] = [];

  heavies.forEach((heavy, index) => {
    if (heavy.stub) {
      stubs.push({ x1: heavy.x, y1: heavy.y, x2: heavy.stub.x, y2: heavy.stub.y });
    }
    const count = heavy.h ?? 0;
    if (count === 0) return;
    const neighbors = links
      .filter((link) => link.a === index || link.b === index)
      .map((link) => (link.a === index ? link.b : link.a));
    let ax = 0;
    let ay = 0;
    for (const neighbor of neighbors) {
      ax += heavies[neighbor].x - heavy.x;
      ay += heavies[neighbor].y - heavy.y;
    }
    if (heavy.stub) {
      ax += heavy.stub.x - heavy.x;
      ay += heavy.stub.y - heavy.y;
    }
    const span = Math.hypot(ax, ay);
    const angles: number[] = [];
    if (span < 0.5) {
      const start = count === 4 ? -Math.PI / 2 : -Math.PI / 2;
      for (let k = 0; k < count; k++) angles.push(start + (k * 2 * Math.PI) / count);
    } else {
      const away = Math.atan2(-ay, -ax);
      if (count === 1) angles.push(away);
      else if (count === 2) angles.push(away - 0.75, away + 0.75);
      else if (count === 3) angles.push(away - 0.9, away, away + 0.9);
      else {
        for (let k = 0; k < count; k++) angles.push(away - 1.15 + (k * 2.3) / (count - 1));
      }
    }
    for (let k = 0; k < count; k++) {
      let angle = angles[k];
      let hx = heavy.x + Math.cos(angle) * HBOND;
      let hy = heavy.y + Math.sin(angle) * HBOND;
      for (let nudge = 0; nudge < 8 && atoms.some((atom) => Math.hypot(atom.x - hx, atom.y - hy) < 7); nudge++) {
        angle += 0.45;
        hx = heavy.x + Math.cos(angle) * HBOND;
        hy = heavy.y + Math.sin(angle) * HBOND;
      }
      bonds.push({ a: index, b: atoms.length });
      atoms.push({ el: "H", x: hx, y: hy, r: 6.4, parent: index });
    }
  });

  return { atoms, bonds, halo, stubs: stubs.length ? stubs : undefined };
}

function ringPoints(cx: number, cy: number, radius: number, sides: number, turn = -Math.PI / 2): { x: number; y: number }[] {
  return Array.from({ length: sides }, (_, index) => {
    const angle = turn + (index * 2 * Math.PI) / sides;
    return { x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius };
  });
}

function outward(cx: number, cy: number, point: { x: number; y: number }, distance: number): { x: number; y: number } {
  const dx = point.x - cx;
  const dy = point.y - cy;
  const len = Math.hypot(dx, dy) || 1;
  return { x: point.x + (dx / len) * distance, y: point.y + (dy / len) * distance };
}

/** β-D-glucopyranose, C₆H₁₂O₆. Anomeric OH can be kept or used as a link. */
function glucoseParts(cx: number, cy: number, anomeric: "oh" | "bridge"): { heavies: Heavy[]; links: { a: number; b: number; order?: 1 | 2 | 3 }[] } {
  const pts = ringPoints(cx, cy, 18, 6);
  const oh = [0, 1, 2, 3].map((index) => outward(cx, cy, pts[index], 16));
  const c6 = outward(cx, cy, pts[4], 16);
  const c6oh = outward(cx, cy, c6, 14);
  const heavies: Heavy[] = [
    { el: "C", h: 1, ...pts[0] },
    { el: "C", h: 1, ...pts[1] },
    { el: "C", h: 1, ...pts[2] },
    { el: "C", h: 1, ...pts[3] },
    { el: "C", h: 1, ...pts[4] },
    { el: "O", h: 0, ...pts[5] },
    { el: "O", h: anomeric === "oh" ? 1 : 0, ...oh[0] },
    { el: "O", h: 1, ...oh[1] },
    { el: "O", h: 1, ...oh[2] },
    { el: "O", h: 1, ...oh[3] },
    { el: "C", h: 2, ...c6 },
    { el: "O", h: 1, ...c6oh },
  ];
  const links: { a: number; b: number; order?: 1 | 2 | 3 }[] = [
    { a: 0, b: 1 },
    { a: 1, b: 2 },
    { a: 2, b: 3 },
    { a: 3, b: 4 },
    { a: 4, b: 5 },
    { a: 5, b: 0 },
    { a: 0, b: 6 },
    { a: 1, b: 7 },
    { a: 2, b: 8 },
    { a: 3, b: 9 },
    { a: 4, b: 10 },
    { a: 10, b: 11 },
  ];
  return { heavies, links };
}

function fructoseParts(cx: number, cy: number): { heavies: Heavy[]; links: { a: number; b: number; order?: 1 | 2 | 3 }[] } {
  const pts = ringPoints(cx, cy, 16, 5, -Math.PI / 2 + 0.3);
  const c2oh = outward(cx, cy, pts[1], 15);
  const c3oh = outward(cx, cy, pts[2], 15);
  const c4oh = outward(cx, cy, pts[3], 15);
  const c1 = outward(cx, cy, pts[1], -18);
  const c1oh = outward(cx, cy, c1, 14);
  const c6 = outward(cx, cy, pts[4], 16);
  const c6oh = outward(cx, cy, c6, 14);
  const heavies: Heavy[] = [
    { el: "O", h: 0, ...pts[0] },
    { el: "C", h: 0, ...pts[1] },
    { el: "C", h: 1, ...pts[2] },
    { el: "C", h: 1, ...pts[3] },
    { el: "C", h: 1, ...pts[4] },
    { el: "O", h: 1, ...c2oh },
    { el: "O", h: 1, ...c3oh },
    { el: "O", h: 1, ...c4oh },
    { el: "C", h: 2, ...c1 },
    { el: "O", h: 1, ...c1oh },
    { el: "C", h: 2, ...c6 },
    { el: "O", h: 1, ...c6oh },
  ];
  const links = [
    { a: 0, b: 1 },
    { a: 1, b: 2 },
    { a: 2, b: 3 },
    { a: 3, b: 4 },
    { a: 4, b: 0 },
    { a: 1, b: 5 },
    { a: 2, b: 6 },
    { a: 3, b: 7 },
    { a: 1, b: 8 },
    { a: 8, b: 9 },
    { a: 4, b: 10 },
    { a: 10, b: 11 },
  ];
  return { heavies, links };
}

function benzene(cx: number, cy: number, radius = 18): { x: number; y: number }[] {
  return ringPoints(cx, cy, radius, 6);
}

function carbonChain(length: number, x0: number, y0: number, step = 13): { x: number; y: number }[] {
  return Array.from({ length }, (_, index) => ({
    x: x0 + index * step,
    y: y0 + (index % 2 === 0 ? 0 : 8),
  }));
}

function sphere(el: ElementSymbol, halo?: string, r = 13): Geom {
  return { atoms: [{ el, x: 0, y: 0, r }], bonds: [], halo };
}

const water: Geom = {
  atoms: [
    { el: "O", x: 0, y: 2, r: 11 },
    { el: "H", x: -12, y: -8, r: 7, parent: 0 },
    { el: "H", x: 12, y: -8, r: 7, parent: 0 },
  ],
  bonds: [
    { a: 0, b: 1 },
    { a: 0, b: 2 },
  ],
};

const hydrogenSulfide: Geom = {
  atoms: [
    { el: "S", x: 0, y: 2, r: 12 },
    { el: "H", x: -12, y: -8, r: 7, parent: 0 },
    { el: "H", x: 12, y: -8, r: 7, parent: 0 },
  ],
  bonds: [
    { a: 0, b: 1 },
    { a: 0, b: 2 },
  ],
};

function ethanol(): Geom {
  return place(
    [
      { el: "C", h: 3, x: -16, y: 0 },
      { el: "C", h: 2, x: 0, y: 0 },
      { el: "O", h: 1, x: 16, y: 0 },
    ],
    [
      { a: 0, b: 1 },
      { a: 1, b: 2 },
    ],
  );
}

function acetic(): Geom {
  return place(
    [
      { el: "C", h: 3, x: -18, y: 4 },
      { el: "C", h: 0, x: 0, y: 0 },
      { el: "O", h: 0, x: 8, y: -14 },
      { el: "O", h: 1, x: 16, y: 10 },
    ],
    [
      { a: 0, b: 1 },
      { a: 1, b: 2, order: 2 },
      { a: 1, b: 3 },
    ],
  );
}

function methane(): Geom {
  return place([{ el: "C", h: 4, x: 0, y: 0 }], []);
}

function glucose(): Geom {
  const parts = glucoseParts(0, 0, "oh");
  return place(parts.heavies, parts.links);
}

function fructose(): Geom {
  const parts = fructoseParts(0, 0);
  return place(parts.heavies, parts.links);
}

function sucrose(): Geom {
  const left = glucoseParts(-28, 0, "bridge");
  const right = fructoseParts(36, 4);
  const shift = left.heavies.length;
  const heavies = [...left.heavies, ...right.heavies];
  const links = [
    ...left.links,
    ...right.links.map((link) => ({ a: link.a + shift, b: link.b + shift, order: link.order })),
  ];
  // Fructose anomeric OH is heavy index 5 within the fructose parts. Drop it and its bond.
  const drop = shift + 5;
  const kept: Heavy[] = [];
  const map: number[] = [];
  heavies.forEach((heavy, index) => {
    if (index === drop) {
      map[index] = -1;
      return;
    }
    map[index] = kept.length;
    kept.push(heavy);
  });
  const nextLinks: { a: number; b: number; order?: 1 | 2 | 3 }[] = links
    .filter((link) => link.a !== drop && link.b !== drop)
    .map((link) => ({ a: map[link.a], b: map[link.b], order: link.order }));
  const bridge = map[6];
  const fructoseC2 = map[shift + 1];
  nextLinks.push({ a: bridge, b: fructoseC2 });
  return place(kept, nextLinks);
}

function starch(): Geom {
  const pts = ringPoints(0, 0, 18, 6);
  const oh = [1, 2].map((index) => outward(0, 0, pts[index], 16));
  const bridge = outward(0, 0, pts[0], 16);
  const c6 = outward(0, 0, pts[4], 16);
  const c6oh = outward(0, 0, c6, 14);
  const stub = outward(0, 0, pts[3], 18);
  return place(
    [
      { el: "C", h: 1, ...pts[0] },
      { el: "C", h: 1, ...pts[1] },
      { el: "C", h: 1, ...pts[2] },
      { el: "C", h: 1, ...pts[3], stub },
      { el: "C", h: 1, ...pts[4] },
      { el: "O", h: 0, ...pts[5] },
      { el: "O", h: 0, ...bridge },
      { el: "O", h: 1, ...oh[0] },
      { el: "O", h: 1, ...oh[1] },
      { el: "C", h: 2, ...c6 },
      { el: "O", h: 1, ...c6oh },
    ],
    [
      { a: 0, b: 1 },
      { a: 1, b: 2 },
      { a: 2, b: 3 },
      { a: 3, b: 4 },
      { a: 4, b: 5 },
      { a: 5, b: 0 },
      { a: 0, b: 6 },
      { a: 1, b: 7 },
      { a: 2, b: 8 },
      { a: 4, b: 9 },
      { a: 9, b: 10 },
    ],
  );
}

function hmf(): Geom {
  const pts = ringPoints(0, 0, 16, 5);
  const aldehydeC = outward(0, 0, pts[0], 16);
  const aldehydeO = outward(0, 0, aldehydeC, 14);
  const ch2 = outward(0, 0, pts[3], 16);
  const ch2oh = outward(0, 0, ch2, 14);
  return place(
    [
      { el: "C", h: 0, ...pts[0] },
      { el: "C", h: 1, ...pts[1] },
      { el: "C", h: 1, ...pts[2] },
      { el: "C", h: 0, ...pts[3] },
      { el: "O", h: 0, ...pts[4] },
      { el: "C", h: 1, ...aldehydeC },
      { el: "O", h: 0, ...aldehydeO },
      { el: "C", h: 2, ...ch2 },
      { el: "O", h: 1, ...ch2oh },
    ],
    [
      { a: 0, b: 1, order: 2 },
      { a: 1, b: 2 },
      { a: 2, b: 3, order: 2 },
      { a: 3, b: 4 },
      { a: 4, b: 0 },
      { a: 0, b: 5 },
      { a: 5, b: 6, order: 2 },
      { a: 3, b: 7 },
      { a: 7, b: 8 },
    ],
  );
}

function citric(): Geom {
  return place(
    [
      { el: "C", h: 0, x: -36, y: 0 },
      { el: "O", h: 0, x: -48, y: -12 },
      { el: "O", h: 1, x: -48, y: 12 },
      { el: "C", h: 2, x: -18, y: 0 },
      { el: "C", h: 0, x: 0, y: 0 },
      { el: "O", h: 1, x: 0, y: -18 },
      { el: "C", h: 0, x: 0, y: 18 },
      { el: "O", h: 0, x: -12, y: 30 },
      { el: "O", h: 1, x: 12, y: 30 },
      { el: "C", h: 2, x: 18, y: 0 },
      { el: "C", h: 0, x: 36, y: 0 },
      { el: "O", h: 0, x: 48, y: -12 },
      { el: "O", h: 1, x: 48, y: 12 },
    ],
    [
      { a: 0, b: 1, order: 2 },
      { a: 0, b: 2 },
      { a: 0, b: 3 },
      { a: 3, b: 4 },
      { a: 4, b: 5 },
      { a: 4, b: 6 },
      { a: 6, b: 7, order: 2 },
      { a: 6, b: 8 },
      { a: 4, b: 9 },
      { a: 9, b: 10 },
      { a: 10, b: 11, order: 2 },
      { a: 10, b: 12 },
    ],
  );
}

function lysine(): Geom {
  const chain = carbonChain(6, -40, 0, 14);
  return place(
    [
      { el: "C", h: 0, ...chain[0] },
      { el: "O", h: 0, x: chain[0].x - 8, y: chain[0].y - 14 },
      { el: "O", h: 1, x: chain[0].x - 8, y: chain[0].y + 14 },
      { el: "C", h: 1, ...chain[1] },
      { el: "N", h: 2, x: chain[1].x, y: chain[1].y - 16 },
      { el: "C", h: 2, ...chain[2] },
      { el: "C", h: 2, ...chain[3] },
      { el: "C", h: 2, ...chain[4] },
      { el: "C", h: 2, ...chain[5] },
      { el: "N", h: 2, x: chain[5].x + 14, y: chain[5].y },
    ],
    [
      { a: 0, b: 1, order: 2 },
      { a: 0, b: 2 },
      { a: 0, b: 3 },
      { a: 3, b: 4 },
      { a: 3, b: 5 },
      { a: 5, b: 6 },
      { a: 6, b: 7 },
      { a: 7, b: 8 },
      { a: 8, b: 9 },
    ],
  );
}

function glycine(): Geom {
  return place(
    [
      { el: "N", h: 2, x: -28, y: 0 },
      { el: "C", h: 2, x: -12, y: 0 },
      { el: "C", h: 0, x: 6, y: 0 },
      { el: "O", h: 0, x: 16, y: -12 },
      { el: "O", h: 1, x: 16, y: 12 },
    ],
    [
      { a: 0, b: 1 },
      { a: 1, b: 2 },
      { a: 2, b: 3, order: 2 },
      { a: 2, b: 4 },
    ],
  );
}

function alanine(): Geom {
  return place(
    [
      { el: "N", h: 2, x: -28, y: 0 },
      { el: "C", h: 1, x: -12, y: 0 },
      { el: "C", h: 3, x: -12, y: -18 },
      { el: "C", h: 0, x: 6, y: 0 },
      { el: "O", h: 0, x: 16, y: -12 },
      { el: "O", h: 1, x: 16, y: 12 },
    ],
    [
      { a: 0, b: 1 },
      { a: 1, b: 2 },
      { a: 1, b: 3 },
      { a: 3, b: 4, order: 2 },
      { a: 3, b: 5 },
    ],
  );
}

function catechol(): Geom {
  const pts = benzene(0, 0);
  const o1 = outward(0, 0, pts[0], 16);
  const o2 = outward(0, 0, pts[1], 16);
  return place(
    [
      { el: "C", h: 0, ...pts[0] },
      { el: "C", h: 0, ...pts[1] },
      { el: "C", h: 1, ...pts[2] },
      { el: "C", h: 1, ...pts[3] },
      { el: "C", h: 1, ...pts[4] },
      { el: "C", h: 1, ...pts[5] },
      { el: "O", h: 1, ...o1 },
      { el: "O", h: 1, ...o2 },
    ],
    [
      { a: 0, b: 1, order: 2 },
      { a: 1, b: 2 },
      { a: 2, b: 3, order: 2 },
      { a: 3, b: 4 },
      { a: 4, b: 5, order: 2 },
      { a: 5, b: 0 },
      { a: 0, b: 6 },
      { a: 1, b: 7 },
    ],
  );
}

function quinone(): Geom {
  const pts = benzene(0, 0);
  const o1 = outward(0, 0, pts[0], 16);
  const o2 = outward(0, 0, pts[1], 16);
  return place(
    [
      { el: "C", h: 0, ...pts[0] },
      { el: "C", h: 0, ...pts[1] },
      { el: "C", h: 1, ...pts[2] },
      { el: "C", h: 1, ...pts[3] },
      { el: "C", h: 1, ...pts[4] },
      { el: "C", h: 1, ...pts[5] },
      { el: "O", h: 0, ...o1 },
      { el: "O", h: 0, ...o2 },
    ],
    [
      { a: 0, b: 1 },
      { a: 1, b: 2, order: 2 },
      { a: 2, b: 3 },
      { a: 3, b: 4, order: 2 },
      { a: 4, b: 5 },
      { a: 5, b: 0, order: 2 },
      { a: 0, b: 6, order: 2 },
      { a: 1, b: 7, order: 2 },
    ],
  );
}

function ascorbic(): Geom {
  const pts = ringPoints(0, 0, 16, 5);
  return place(
    [
      { el: "O", h: 0, ...pts[0] },
      { el: "C", h: 0, ...pts[1] },
      { el: "C", h: 0, ...pts[2] },
      { el: "C", h: 1, ...pts[3] },
      { el: "C", h: 0, ...pts[4] },
      { el: "O", h: 1, ...outward(0, 0, pts[1], 16) },
      { el: "O", h: 1, ...outward(0, 0, pts[2], 16) },
      { el: "O", h: 1, ...outward(0, 0, pts[3], 16) },
      { el: "C", h: 0, ...outward(0, 0, pts[4], 16) },
      { el: "O", h: 1, ...outward(0, 0, outward(0, 0, pts[4], 16), 14) },
      { el: "C", h: 2, x: pts[4].x + 8, y: pts[4].y + 20 },
      { el: "O", h: 1, x: pts[4].x + 22, y: pts[4].y + 20 },
    ],
    [
      { a: 0, b: 1 },
      { a: 1, b: 2, order: 2 },
      { a: 2, b: 3 },
      { a: 3, b: 4 },
      { a: 4, b: 0 },
      { a: 1, b: 5 },
      { a: 2, b: 6 },
      { a: 3, b: 7 },
      { a: 4, b: 8 },
      { a: 8, b: 9 },
      { a: 8, b: 10 },
      { a: 10, b: 11 },
    ],
  );
}

function dhi(): Geom {
  const six = benzene(-8, 0, 16);
  const fiveTip = { x: 22, y: 0 };
  return place(
    [
      { el: "C", h: 1, ...six[0] },
      { el: "C", h: 1, ...six[1] },
      { el: "C", h: 0, ...six[2] },
      { el: "C", h: 0, ...six[3] },
      { el: "C", h: 0, ...six[4] },
      { el: "C", h: 0, ...six[5] },
      { el: "C", h: 1, x: fiveTip.x, y: fiveTip.y - 12 },
      { el: "C", h: 1, x: fiveTip.x, y: fiveTip.y + 12 },
      { el: "N", h: 1, x: six[3].x + 8, y: six[3].y },
      { el: "O", h: 1, ...outward(-8, 0, six[0], 16) },
      { el: "O", h: 1, ...outward(-8, 0, six[1], 16) },
    ],
    [
      { a: 0, b: 1, order: 2 },
      { a: 1, b: 2 },
      { a: 2, b: 3, order: 2 },
      { a: 3, b: 4 },
      { a: 4, b: 5, order: 2 },
      { a: 5, b: 0 },
      { a: 2, b: 6 },
      { a: 6, b: 8 },
      { a: 8, b: 7 },
      { a: 7, b: 3 },
      { a: 0, b: 9 },
      { a: 1, b: 10 },
    ],
  );
}

function oxybenzone(): Geom {
  const left = benzene(-28, 0, 16);
  const right = benzene(36, 0, 16);
  const carbonyl = { x: 4, y: 0 };
  const methoxyO = outward(-28, 0, left[2], 16);
  const methoxyC = outward(-28, 0, methoxyO, 14);
  const phenol = outward(-28, 0, left[0], 16);
  return place(
    [
      ...left.map((point, index) => ({ el: "C" as const, h: index === 0 || index === 2 || index === 4 ? 0 : 1, ...point })),
      ...right.map((point, index) => ({ el: "C" as const, h: index === 0 ? 0 : 1, ...point })),
      { el: "C", h: 0, ...carbonyl },
      { el: "O", h: 0, x: carbonyl.x, y: carbonyl.y - 16 },
      { el: "O", h: 1, ...phenol },
      { el: "O", h: 0, ...methoxyO },
      { el: "C", h: 3, ...methoxyC },
    ],
    [
      { a: 0, b: 1, order: 2 },
      { a: 1, b: 2 },
      { a: 2, b: 3, order: 2 },
      { a: 3, b: 4 },
      { a: 4, b: 5, order: 2 },
      { a: 5, b: 0 },
      { a: 6, b: 7, order: 2 },
      { a: 7, b: 8 },
      { a: 8, b: 9, order: 2 },
      { a: 9, b: 10 },
      { a: 10, b: 11, order: 2 },
      { a: 11, b: 6 },
      { a: 4, b: 12 },
      { a: 12, b: 6 },
      { a: 12, b: 13, order: 2 },
      { a: 0, b: 14 },
      { a: 2, b: 15 },
      { a: 15, b: 16 },
    ],
  );
}

function soap(): Geom {
  const chain = carbonChain(18, -120, 0, 12);
  return place(
    [
      ...chain.map((point, index) => ({
        el: "C" as const,
        h: index === 0 ? 3 : index === chain.length - 1 ? 0 : 2,
        ...point,
      })),
      { el: "O", h: 0, x: chain[17].x + 10, y: chain[17].y - 12 },
      { el: "O", h: 0, x: chain[17].x + 10, y: chain[17].y + 12 },
    ],
    [
      ...Array.from({ length: 17 }, (_, index) => ({ a: index, b: index + 1 })),
      { a: 17, b: 18, order: 2 as const },
      { a: 17, b: 19 },
    ],
    "rgba(225, 91, 74, 0.18)",
  );
}

function oil(): Geom {
  const chain = carbonChain(16, -100, 0, 12);
  return place(
    chain.map((point, index) => ({
      el: "C" as const,
      h: index === 0 || index === chain.length - 1 ? 3 : 2,
      ...point,
    })),
    Array.from({ length: 15 }, (_, index) => ({ a: index, b: index + 1 })),
  );
}

function pet(): Geom {
  const ring = benzene(0, 0, 16);
  return place(
    [
      { el: "C", h: 0, ...ring[0] },
      { el: "C", h: 1, ...ring[1] },
      { el: "C", h: 1, ...ring[2] },
      { el: "C", h: 0, ...ring[3] },
      { el: "C", h: 1, ...ring[4] },
      { el: "C", h: 1, ...ring[5] },
      { el: "C", h: 0, x: ring[0].x - 18, y: ring[0].y },
      { el: "O", h: 0, x: ring[0].x - 18, y: ring[0].y - 14 },
      { el: "O", h: 0, x: ring[0].x - 34, y: ring[0].y },
      { el: "C", h: 2, x: ring[0].x - 48, y: ring[0].y },
      { el: "C", h: 2, x: ring[0].x - 62, y: ring[0].y + 8 },
      { el: "C", h: 0, x: ring[3].x + 18, y: ring[3].y },
      { el: "O", h: 0, x: ring[3].x + 18, y: ring[3].y + 14 },
      { el: "O", h: 0, x: ring[3].x + 34, y: ring[3].y },
    ],
    [
      { a: 0, b: 1, order: 2 },
      { a: 1, b: 2 },
      { a: 2, b: 3, order: 2 },
      { a: 3, b: 4 },
      { a: 4, b: 5, order: 2 },
      { a: 5, b: 0 },
      { a: 0, b: 6 },
      { a: 6, b: 7, order: 2 },
      { a: 6, b: 8 },
      { a: 8, b: 9 },
      { a: 9, b: 10 },
      { a: 3, b: 11 },
      { a: 11, b: 12, order: 2 },
      { a: 11, b: 13 },
    ],
  );
}

function nylon(): Geom {
  const left = carbonChain(6, -70, 0, 13);
  const carbonyl1 = { x: left[5].x + 16, y: left[5].y };
  const carbonyl2 = { x: carbonyl1.x + 16, y: carbonyl1.y + 8 };
  const right = carbonChain(4, carbonyl2.x + 16, carbonyl2.y, 13);
  return place(
    [
      { el: "N", h: 1, x: left[0].x - 16, y: left[0].y },
      ...left.map((point) => ({ el: "C" as const, h: 2, ...point })),
      { el: "N", h: 1, x: left[5].x + 16, y: left[5].y - 16 },
      { el: "C", h: 0, ...carbonyl1 },
      { el: "O", h: 0, x: carbonyl1.x, y: carbonyl1.y + 14 },
      { el: "C", h: 0, ...carbonyl2 },
      { el: "O", h: 0, x: carbonyl2.x, y: carbonyl2.y - 14 },
      ...right.map((point) => ({ el: "C" as const, h: 2, ...point })),
    ],
    [
      { a: 0, b: 1 },
      { a: 1, b: 2 },
      { a: 2, b: 3 },
      { a: 3, b: 4 },
      { a: 4, b: 5 },
      { a: 5, b: 6 },
      { a: 6, b: 7 },
      { a: 7, b: 8 },
      { a: 8, b: 9, order: 2 },
      { a: 8, b: 10 },
      { a: 10, b: 11, order: 2 },
      { a: 10, b: 12 },
      { a: 12, b: 13 },
      { a: 13, b: 14 },
      { a: 14, b: 15 },
    ],
  );
}

function acetaldehyde(): Geom {
  return place(
    [
      { el: "C", h: 3, x: -14, y: 0 },
      { el: "C", h: 1, x: 4, y: 0 },
      { el: "O", h: 0, x: 18, y: 0 },
    ],
    [
      { a: 0, b: 1 },
      { a: 1, b: 2, order: 2 },
    ],
  );
}

function benzeneMol(): Geom {
  const pts = benzene(0, 0);
  return place(
    pts.map((point) => ({ el: "C" as const, h: 1, ...point })),
    [
      { a: 0, b: 1, order: 2 },
      { a: 1, b: 2 },
      { a: 2, b: 3, order: 2 },
      { a: 3, b: 4 },
      { a: 4, b: 5, order: 2 },
      { a: 5, b: 0 },
    ],
    "rgba(180, 80, 180, 0.25)",
  );
}

function glycosyl(): Geom {
  const sugar = glucoseParts(-40, -10, "oh");
  const chain = carbonChain(5, 20, 12, 14);
  const drop = 6;
  const heavies: Heavy[] = [];
  const map: number[] = [];
  sugar.heavies.forEach((heavy, index) => {
    if (index === drop) {
      map[index] = -1;
      return;
    }
    map[index] = heavies.length;
    heavies.push(heavy);
  });
  const amino = heavies.length;
  heavies.push(
    { el: "N", h: 1, x: 4, y: 16 },
    { el: "C", h: 1, ...chain[0] },
    { el: "C", h: 0, x: chain[0].x, y: chain[0].y + 16 },
    { el: "O", h: 0, x: chain[0].x - 12, y: chain[0].y + 26 },
    { el: "O", h: 1, x: chain[0].x + 12, y: chain[0].y + 26 },
    ...chain.slice(1).map((point) => ({ el: "C" as const, h: 2, ...point })),
    { el: "N", h: 2, x: chain[4].x + 14, y: chain[4].y },
  );
  const links: { a: number; b: number; order?: 1 | 2 | 3 }[] = sugar.links
    .filter((link) => link.a !== drop && link.b !== drop)
    .map((link) => ({ a: map[link.a], b: map[link.b], order: link.order }));
  const alpha = amino + 1;
  const carboxyl = amino + 2;
  const firstMethylene = amino + 5;
  links.push(
    { a: map[0], b: amino },
    { a: amino, b: alpha },
    { a: alpha, b: carboxyl },
    { a: carboxyl, b: amino + 3, order: 2 },
    { a: carboxyl, b: amino + 4 },
    { a: alpha, b: firstMethylene },
    { a: firstMethylene, b: firstMethylene + 1 },
    { a: firstMethylene + 1, b: firstMethylene + 2 },
    { a: firstMethylene + 2, b: firstMethylene + 3 },
    { a: firstMethylene + 3, b: amino + 9 },
  );
  return place(heavies, links);
}

function carbonate(): Geom {
  return place(
    [
      { el: "Ca", h: 0, x: -18, y: 0, r: 13 },
      { el: "C", h: 0, x: 6, y: 0 },
      { el: "O", h: 0, x: 20, y: -12 },
      { el: "O", h: 0, x: 20, y: 12 },
      { el: "O", h: 0, x: 6, y: 16 },
    ],
    [
      { a: 1, b: 2, order: 2 },
      { a: 1, b: 3 },
      { a: 1, b: 4 },
    ],
  );
}

function rust(): Geom {
  return place(
    [
      { el: "Fe", h: 0, x: 0, y: 0, r: 13 },
      { el: "O", h: 1, x: 0, y: -18 },
      { el: "O", h: 1, x: -16, y: 12 },
      { el: "O", h: 1, x: 16, y: 12 },
    ],
    [
      { a: 0, b: 1 },
      { a: 0, b: 2 },
      { a: 0, b: 3 },
    ],
  );
}

const MODELS: Record<string, { formula: Formula; geom: Geom }> = {
  h2o: { formula: { H: 2, O: 1 }, geom: water },
  o2: { formula: { O: 2 }, geom: place([{ el: "O", x: -8, y: 0 }, { el: "O", x: 8, y: 0 }], [{ a: 0, b: 1, order: 2 }]) },
  co2: {
    formula: { C: 1, O: 2 },
    geom: place(
      [
        { el: "O", x: -18, y: 0 },
        { el: "C", x: 0, y: 0 },
        { el: "O", x: 18, y: 0 },
      ],
      [
        { a: 0, b: 1, order: 2 },
        { a: 1, b: 2, order: 2 },
      ],
    ),
  },
  co: {
    formula: { C: 1, O: 1 },
    geom: place(
      [
        { el: "C", x: -9, y: 0 },
        { el: "O", x: 9, y: 0 },
      ],
      [{ a: 0, b: 1, order: 3 }],
    ),
  },
  h2o2: {
    formula: { H: 2, O: 2 },
    geom: place(
      [
        { el: "O", h: 1, x: -8, y: 2 },
        { el: "O", h: 1, x: 8, y: -2 },
      ],
      [{ a: 0, b: 1 }],
    ),
  },
  ch4: { formula: { C: 1, H: 4 }, geom: methane() },
  ethanol: { formula: { C: 2, H: 6, O: 1 }, geom: ethanol() },
  acetic: { formula: { C: 2, H: 4, O: 2 }, geom: acetic() },
  glucose: { formula: { C: 6, H: 12, O: 6 }, geom: glucose() },
  fructose: { formula: { C: 6, H: 12, O: 6 }, geom: fructose() },
  sucrose: { formula: { C: 12, H: 22, O: 11 }, geom: sucrose() },
  starch: { formula: { C: 6, H: 10, O: 5 }, geom: starch() },
  hmf: { formula: { C: 6, H: 6, O: 3 }, geom: hmf() },
  c: { formula: { C: 1 }, geom: sphere("C", undefined, 11) },
  n2: {
    formula: { N: 2 },
    geom: place(
      [
        { el: "N", x: -8, y: 0 },
        { el: "N", x: 8, y: 0 },
      ],
      [{ a: 0, b: 1, order: 3 }],
    ),
  },
  no: {
    formula: { N: 1, O: 1 },
    geom: place(
      [
        { el: "N", x: -8, y: 0 },
        { el: "O", x: 8, y: 0 },
      ],
      [{ a: 0, b: 1, order: 2 }],
    ),
  },
  no2: {
    formula: { N: 1, O: 2 },
    geom: place(
      [
        { el: "O", x: -12, y: -10 },
        { el: "N", x: 0, y: 0 },
        { el: "O", x: -12, y: 10 },
      ],
      [
        { a: 0, b: 1, order: 2 },
        { a: 1, b: 2 },
      ],
    ),
  },
  nh3: { formula: { N: 1, H: 3 }, geom: place([{ el: "N", h: 3, x: 0, y: 0 }], []) },
  nh4: { formula: { N: 1, H: 4 }, geom: place([{ el: "N", h: 4, x: 0, y: 0 }], [], "rgba(90, 140, 220, 0.35)") },
  h2s: { formula: { H: 2, S: 1 }, geom: hydrogenSulfide },
  cl2: {
    formula: { Cl: 2 },
    geom: place(
      [
        { el: "Cl", x: -10, y: 0, r: 12 },
        { el: "Cl", x: 10, y: 0, r: 12 },
      ],
      [{ a: 0, b: 1 }],
    ),
  },
  hocl: {
    formula: { H: 1, O: 1, Cl: 1 },
    geom: place(
      [
        { el: "O", h: 1, x: -8, y: 0 },
        { el: "Cl", h: 0, x: 10, y: 0, r: 12 },
      ],
      [{ a: 0, b: 1 }],
    ),
  },
  ocl: {
    formula: { O: 1, Cl: 1 },
    geom: place(
      [
        { el: "O", x: -8, y: 0 },
        { el: "Cl", x: 10, y: 0, r: 12 },
      ],
      [{ a: 0, b: 1 }],
      "rgba(80, 190, 140, 0.28)",
    ),
  },
  oh: {
    formula: { H: 1, O: 1 },
    geom: place([{ el: "O", h: 1, x: 0, y: 0 }], [], "rgba(225, 91, 74, 0.25)"),
  },
  h: { formula: { H: 1 }, geom: sphere("H", "rgba(255,255,255,0.2)", 8) },
  na: { formula: { Na: 1 }, geom: sphere("Na", "rgba(141, 107, 184, 0.35)") },
  cl: { formula: { Cl: 1 }, geom: sphere("Cl", "rgba(60, 186, 122, 0.28)") },
  ca: { formula: { Ca: 1 }, geom: sphere("Ca", "rgba(213, 221, 212, 0.35)", 14) },
  f: { formula: { F: 1 }, geom: sphere("F", "rgba(143, 209, 138, 0.35)") },
  k: { formula: { K: 1 }, geom: sphere("K", "rgba(122, 78, 154, 0.35)") },
  fe: { formula: { Fe: 1 }, geom: sphere("Fe", undefined, 14) },
  fe2: { formula: { Fe: 1 }, geom: sphere("Fe", "rgba(196, 106, 69, 0.35)") },
  ag: { formula: { Ag: 1 }, geom: sphere("Ag", undefined, 13) },
  al: { formula: { Al: 1 }, geom: sphere("Al", undefined, 13) },
  zn: { formula: { Zn: 1 }, geom: sphere("Zn", "rgba(127, 147, 168, 0.35)") },
  s2: { formula: { S: 1 }, geom: sphere("S", "rgba(226, 192, 68, 0.3)") },
  nacl: {
    formula: { Na: 1, Cl: 1 },
    geom: {
      atoms: [
        { el: "Na", x: -10, y: 0, r: 12 },
        { el: "Cl", x: 10, y: 0, r: 12 },
      ],
      bonds: [],
    },
  },
  caco3: { formula: { Ca: 1, C: 1, O: 3 }, geom: carbonate() },
  ag2s: {
    formula: { Ag: 2, S: 1 },
    geom: {
      atoms: [
        { el: "Ag", x: -14, y: -6, r: 11 },
        { el: "S", x: 0, y: 8, r: 11 },
        { el: "Ag", x: 14, y: -6, r: 11 },
      ],
      bonds: [
        { a: 0, b: 1 },
        { a: 2, b: 1 },
      ],
    },
  },
  rust: { formula: { Fe: 1, O: 3, H: 3 }, geom: rust() },
  zno: {
    formula: { Zn: 1, O: 1 },
    geom: place(
      [
        { el: "Zn", x: -8, y: 0, r: 12 },
        { el: "O", x: 10, y: 0 },
      ],
      [{ a: 0, b: 1 }],
    ),
  },
  tio2: {
    formula: { Ti: 1, O: 2 },
    geom: place(
      [
        { el: "O", x: -16, y: 0 },
        { el: "Ti", x: 0, y: 0, r: 12 },
        { el: "O", x: 16, y: 0 },
      ],
      [
        { a: 0, b: 1, order: 2 },
        { a: 1, b: 2, order: 2 },
      ],
    ),
  },
  soap: { formula: { C: 18, H: 35, O: 2 }, geom: soap() },
  oil: { formula: { C: 16, H: 34 }, geom: oil() },
  pet: { formula: { C: 10, H: 8, O: 4 }, geom: pet() },
  nylon: { formula: { C: 12, H: 22, N: 2, O: 2 }, geom: nylon() },
  dye: { formula: { C: 6, H: 6 }, geom: benzeneMol() },
  melanin: { formula: { C: 8, H: 7, N: 1, O: 2 }, geom: dhi() },
  dhi: { formula: { C: 8, H: 7, N: 1, O: 2 }, geom: dhi() },
  hb: {
    formula: { Fe: 1, N: 4 },
    geom: {
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
  },
  citric: { formula: { C: 6, H: 8, O: 7 }, geom: citric() },
  lysine: { formula: { C: 6, H: 14, N: 2, O: 2 }, geom: lysine() },
  glycine: { formula: { C: 2, H: 5, N: 1, O: 2 }, geom: glycine() },
  alanine: { formula: { C: 3, H: 7, N: 1, O: 2 }, geom: alanine() },
  catechol: { formula: { C: 6, H: 6, O: 2 }, geom: catechol() },
  quinone: { formula: { C: 6, H: 4, O: 2 }, geom: quinone() },
  ascorbic: { formula: { C: 6, H: 8, O: 6 }, geom: ascorbic() },
  oxy: { formula: { C: 14, H: 12, O: 3 }, geom: oxybenzone() },
  acetaldehyde: { formula: { C: 2, H: 4, O: 1 }, geom: acetaldehyde() },
  glycosyl: { formula: { C: 12, H: 24, N: 2, O: 7 }, geom: glycosyl() },
};

export const MOLS = Object.fromEntries(Object.entries(MODELS).map(([id, model]) => [id, model.geom])) as {
  [K in keyof typeof MODELS]: Geom;
};

export type MolId = keyof typeof MOLS | "e" | "photon";

export const MOL_FORMULAS: { [K in keyof typeof MOLS]: Formula } = Object.fromEntries(
  Object.entries(MODELS).map(([id, model]) => [id, model.formula]),
) as { [K in keyof typeof MOLS]: Formula };

export function isElectron(id: MolId): boolean {
  return id === "e";
}

export function isMark(id: MolId): boolean {
  return id === "e" || id === "photon";
}

export function countAtoms(id: MolId): Record<ElementSymbol, number> {
  const tally = Object.fromEntries(ELEMENTS.map((element) => [element, 0])) as Record<ElementSymbol, number>;
  if (isMark(id)) return tally;
  for (const atom of MOLS[id as keyof typeof MOLS].atoms) tally[atom.el] += 1;
  return tally;
}

export function totalAtoms(id: MolId): number {
  if (isMark(id)) return 1;
  return MOLS[id as keyof typeof MOLS].atoms.length;
}

export function simplifiedHydrogenLabels(id: MolId): number {
  if (isMark(id)) return 0;
  return MOLS[id as keyof typeof MOLS].atoms.filter((atom) => atom.el === "H" && atom.parent !== undefined).length;
}
