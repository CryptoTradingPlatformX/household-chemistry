import { ELECTRON_COLOR, ELEMENT_COLORS } from "../content/colors";
import type { ElementSymbol } from "../content/species";
import { MOLS, isElectron, type Geom, type MolId } from "./mols";

const SUB = "₀₁₂₃₄₅₆₇₈₉";

let simplifiedDraw = false;

export function setSimplifiedDraw(value: boolean): void {
  simplifiedDraw = value;
}

function subscript(value: number): string {
  return String(value).replace(/\d/g, (digit) => SUB[Number(digit)] ?? digit);
}

function groupLabel(element: string, hydrogens: number): string {
  if (hydrogens <= 0) return element;
  if (hydrogens === 1) return `${element}H`;
  return `${element}H${subscript(hydrogens)}`;
}

const sprites = new Map<string, HTMLCanvasElement>();

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function mix(hex: string, other: string, t: number): string {
  const a = hexToRgb(hex);
  const b = hexToRgb(other);
  const r = Math.round(a.r + (b.r - a.r) * t);
  const g = Math.round(a.g + (b.g - a.g) * t);
  const bl = Math.round(a.b + (b.b - a.b) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

export function fitCanvas(canvas: HTMLCanvasElement): { w: number; h: number } {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = Math.max(1, Math.round(rect.width));
  const h = Math.max(1, Math.round(rect.height));
  const pw = Math.max(1, Math.round(w * dpr));
  const ph = Math.max(1, Math.round(h * dpr));
  if (canvas.width !== pw || canvas.height !== ph) {
    canvas.width = pw;
    canvas.height = ph;
  }
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
  }
  return { w, h };
}

export type Mood = "neutral" | "heat" | "cold" | "warn" | "glow" | "uv";

export function backdrop(ctx: CanvasRenderingContext2D, w: number, h: number, mood: Mood): void {
  const tint =
    mood === "heat" ? "#6a3a28" : mood === "cold" ? "#31485a" : mood === "warn" ? "#6a2430" : mood === "glow" ? "#1d4a3c" : mood === "uv" ? "#3a3260" : "#4a3428";
  const mid = mood === "cold" ? "#1c2c38" : mood === "warn" ? "#2a1418" : "#2a1d16";
  const g = ctx.createRadialGradient(w * 0.48, h * 0.32, 16, w * 0.5, h * 0.55, Math.max(w, h) * 0.78);
  g.addColorStop(0, tint);
  g.addColorStop(0.55, mid);
  g.addColorStop(1, "#120e0c");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

export function drawAtom(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string): void {
  const rad = Math.max(2, Math.round(r));
  const key = `${color}:${rad}`;
  let sprite = sprites.get(key);
  if (!sprite) {
    const pad = 2;
    const size = (rad + pad) * 2;
    sprite = document.createElement("canvas");
    sprite.width = size * 2;
    sprite.height = size * 2;
    const gtx = sprite.getContext("2d");
    if (!gtx) return;
    gtx.scale(2, 2);
    const cx = size / 2;
    const cy = size / 2;
    const fill = gtx.createRadialGradient(cx - rad * 0.34, cy - rad * 0.38, rad * 0.08, cx, cy, rad);
    fill.addColorStop(0, mix(color, "#ffffff", 0.62));
    fill.addColorStop(0.5, color);
    fill.addColorStop(1, mix(color, "#1a120c", 0.42));
    gtx.beginPath();
    gtx.arc(cx, cy, rad, 0, Math.PI * 2);
    gtx.fillStyle = fill;
    gtx.fill();
    sprites.set(key, sprite);
  }
  const dw = rad * 2 + 4;
  ctx.drawImage(sprite, x - dw / 2, y - dw / 2, dw, dw);
}

export function letter(ctx: CanvasRenderingContext2D, x: number, y: number, text: string, color: string, size: number): void {
  ctx.fillStyle = color;
  ctx.font = `700 ${Math.max(8, size)}px "Atkinson Hyperlegible", "Segoe UI", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y + 0.5);
}

function bond(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, width: number): void {
  ctx.strokeStyle = "rgba(247, 244, 238, 0.72)";
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

export function drawMol(ctx: CanvasRenderingContext2D, id: MolId, x: number, y: number, angle: number, scale = 1): void {
  if (isElectron(id)) {
    drawAtom(ctx, x, y, 5 * scale, ELECTRON_COLOR);
    return;
  }
  if (id === "photon") {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.strokeStyle = "rgba(214, 196, 255, 0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-10 * scale, 0);
    ctx.lineTo(10 * scale, 0);
    for (let i = -2; i <= 2; i++) {
      ctx.moveTo(i * 4 * scale, -3 * scale);
      ctx.lineTo(i * 4 * scale, 3 * scale);
    }
    ctx.stroke();
    ctx.restore();
    return;
  }
  const geom = MOLS[id as keyof typeof MOLS] as Geom;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const atom of geom.atoms) {
    minX = Math.min(minX, atom.x);
    minY = Math.min(minY, atom.y);
    maxX = Math.max(maxX, atom.x);
    maxY = Math.max(maxY, atom.y);
  }
  const span = Math.max(24, maxX - minX, maxY - minY);
  const fit = Math.min(1, 72 / span);
  const drawScale = scale * fit;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const pts = geom.atoms.map((atom) => ({
    ...atom,
    px: x + (atom.x * cos - atom.y * sin) * drawScale,
    py: y + (atom.x * sin + atom.y * cos) * drawScale,
  }));
  const hydrogensOn = new Map<number, number>();
  if (simplifiedDraw) {
    geom.atoms.forEach((atom) => {
      if (atom.el === "H" && atom.parent !== undefined) {
        hydrogensOn.set(atom.parent, (hydrogensOn.get(atom.parent) ?? 0) + 1);
      }
    });
  }
  if (geom.halo) {
    ctx.beginPath();
    ctx.fillStyle = geom.halo;
    ctx.arc(x, y, 22 * drawScale, 0, Math.PI * 2);
    ctx.fill();
  }
  for (const stub of geom.stubs ?? []) {
    const x1 = x + (stub.x1 * cos - stub.y1 * sin) * drawScale;
    const y1 = y + (stub.x1 * sin + stub.y1 * cos) * drawScale;
    const x2 = x + (stub.x2 * cos - stub.y2 * sin) * drawScale;
    const y2 = y + (stub.x2 * sin + stub.y2 * cos) * drawScale;
    bond(ctx, x1, y1, x2, y2, 2 * drawScale);
  }
  for (const link of geom.bonds) {
    if (simplifiedDraw && (pts[link.a].el === "H" || pts[link.b].el === "H")) continue;
    const a = pts[link.a];
    const b = pts[link.b];
    const order = link.order ?? 1;
    if (order === 1) bond(ctx, a.px, a.py, b.px, b.py, 2.4 * drawScale);
    else {
      const dx = b.px - a.px;
      const dy = b.py - a.py;
      const len = Math.hypot(dx, dy) || 1;
      const ox = (-dy / len) * 2.6 * drawScale;
      const oy = (dx / len) * 2.6 * drawScale;
      bond(ctx, a.px + ox, a.py + oy, b.px + ox, b.py + oy, 2 * drawScale);
      bond(ctx, a.px - ox, a.py - oy, b.px - ox, b.py - oy, 2 * drawScale);
      if (order === 3) bond(ctx, a.px, a.py, b.px, b.py, 2 * drawScale);
    }
  }
  pts.forEach((atom, index) => {
    if (simplifiedDraw && atom.el === "H" && atom.parent !== undefined) return;
    const style = ELEMENT_COLORS[atom.el];
    const radius = (atom.r ?? 10) * drawScale;
    drawAtom(ctx, atom.px, atom.py, Math.max(3.5, radius), style.color);
    const hydrogens = hydrogensOn.get(index) ?? 0;
    const text = simplifiedDraw ? groupLabel(atom.el, hydrogens) : atom.el;
    const fontSize = simplifiedDraw && hydrogens > 0 ? Math.max(8, Math.min(12, radius)) : Math.min(11, radius * 0.9);
    if (fontSize >= 7) {
      if (simplifiedDraw && hydrogens > 0) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = "rgba(18, 10, 8, 0.9)";
        ctx.font = `700 ${fontSize}px "Atkinson Hyperlegible", "Segoe UI", sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeText(text, atom.px, atom.py);
      }
      letter(ctx, atom.px, atom.py, text, simplifiedDraw && hydrogens > 0 ? "#fffaf4" : style.ink, fontSize);
    }
  });
}

export function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

export function labelPill(ctx: CanvasRenderingContext2D, x: number, y: number, text: string, bounds: { w: number; h: number }): void {
  const fontSize = bounds.w < 430 ? 12 : 13;
  ctx.font = `600 ${fontSize}px "Atkinson Hyperlegible", "Segoe UI", sans-serif`;
  const padX = 9;
  const width = Math.min(bounds.w - 16, ctx.measureText(text).width + padX * 2);
  const height = fontSize + 12;
  let left = x - width / 2;
  let top = y - height / 2;
  left = Math.max(8, Math.min(left, bounds.w - width - 8));
  top = Math.max(8, Math.min(top, bounds.h - height - 8));
  ctx.fillStyle = "rgba(255, 248, 238, 0.94)";
  roundRect(ctx, left, top, width, height, height / 2);
  ctx.fill();
  ctx.fillStyle = "#2c241c";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, left + width / 2, top + height / 2 + 0.5, width - 8);
}

export function elementOf(symbol: ElementSymbol): { color: string; ink: string } {
  return ELEMENT_COLORS[symbol];
}
