import { drawMol, labelPill, roundRect } from "./draw";

export type MacroKind =
  | "beaker"
  | "loaf"
  | "skillet"
  | "saucepan"
  | "apple"
  | "egg"
  | "pot"
  | "kettle"
  | "basin"
  | "cloth"
  | "warning"
  | "pad"
  | "nail"
  | "spoon"
  | "tooth"
  | "duct"
  | "hair"
  | "skin"
  | "burner"
  | "alarm"
  | "battery"
  | "pouch"
  | "coldpack"
  | "tube"
  | "ice"
  | "fiber";

export interface MacroView {
  kind: MacroKind;
  step: number;
  progress: number;
  time: number;
  reduced: boolean;
  w: number;
  h: number;
}

export function drawMacro(ctx: CanvasRenderingContext2D, view: MacroView): void {
  const { w, h } = view;
  const top = h * 0.06;
  const bottom = h * 0.48;
  switch (view.kind) {
    case "beaker":
      glass(ctx, w, top, bottom, view, "#f4e2a8");
      break;
    case "loaf":
      loaf(ctx, w, top, bottom, view);
      break;
    case "skillet":
      skillet(ctx, w, top, bottom, view);
      break;
    case "saucepan":
      saucepan(ctx, w, top, bottom, view);
      break;
    case "apple":
      apple(ctx, w, top, bottom, view);
      break;
    case "egg":
      egg(ctx, w, top, bottom, view);
      break;
    case "pot":
      pot(ctx, w, top, bottom, view);
      break;
    case "kettle":
      kettle(ctx, w, top, bottom, view);
      break;
    case "basin":
      basin(ctx, w, top, bottom, view);
      break;
    case "cloth":
      cloth(ctx, w, top, bottom, view);
      break;
    case "warning":
      warning(ctx, w, h, view);
      break;
    case "pad":
      pad(ctx, w, top, bottom, view);
      break;
    case "nail":
      nail(ctx, w, top, bottom, view);
      break;
    case "spoon":
      spoon(ctx, w, top, bottom, view);
      break;
    case "tooth":
      tooth(ctx, w, top, bottom, view);
      break;
    case "duct":
      duct(ctx, w, top, bottom, view);
      break;
    case "hair":
      hair(ctx, w, top, bottom, view);
      break;
    case "skin":
      skin(ctx, w, top, bottom, view);
      break;
    case "burner":
      burner(ctx, w, top, bottom, view);
      break;
    case "alarm":
      alarm(ctx, w, top, bottom, view);
      break;
    case "battery":
      battery(ctx, w, top, bottom, view);
      break;
    case "pouch":
      pouch(ctx, w, top, bottom, view, false);
      break;
    case "coldpack":
      pouch(ctx, w, top, bottom, view, true);
      break;
    case "tube":
      tube(ctx, w, top, bottom, view);
      break;
    case "ice":
      ice(ctx, w, top, bottom, view);
      break;
    case "fiber":
      fiber(ctx, w, top, bottom, view);
      break;
    default:
      break;
  }
}

function glass(ctx: CanvasRenderingContext2D, w: number, top: number, bottom: number, view: MacroView, liquid: string): void {
  const cx = w * 0.5;
  const bw = Math.min(w * 0.42, 180);
  const left = cx - bw / 2;
  const wave = view.reduced ? 0 : Math.sin(view.time * 3) * 2;
  ctx.fillStyle = "rgba(255,248,238,0.14)";
  roundRect(ctx, left, top + 10, bw, bottom - top - 16, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,248,238,0.8)";
  ctx.lineWidth = 3;
  ctx.stroke();
  const level = top + 28 + (bottom - top) * (0.35 - view.step * 0.02);
  ctx.save();
  ctx.beginPath();
  roundRect(ctx, left + 3, top + 12, bw - 6, bottom - top - 20, 6);
  ctx.clip();
  ctx.fillStyle = liquid;
  ctx.fillRect(left, level + wave, bw, bottom);
  if (view.step >= 2) {
    for (let i = 0; i < 5; i++) {
      const bx = left + 18 + i * (bw / 6);
      const by = level + 16 + ((view.time * 40 + i * 30) % (bottom - level - 20));
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255,255,255,0.7)";
      ctx.lineWidth = 1.5;
      ctx.arc(bx, by, 4 + (i % 3), 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  ctx.restore();
  labelPill(ctx, cx, top, view.step >= 2 ? "Carbon dioxide leaving" : "In the glass", { w, h: bottom });
}

function loaf(ctx: CanvasRenderingContext2D, w: number, top: number, bottom: number, view: MacroView): void {
  const cx = w * 0.5;
  const rise = view.step * 8 + view.progress * 6;
  ctx.fillStyle = "#c9864a";
  roundRect(ctx, cx - 90, bottom - 70 - rise, 180, 58 + rise, 28);
  ctx.fill();
  ctx.fillStyle = "#e7b07a";
  roundRect(ctx, cx - 70, bottom - 58 - rise, 140, 18, 10);
  ctx.fill();
  if (view.step >= 2) {
    ctx.fillStyle = "rgba(255,248,238,0.35)";
    for (let i = 0; i < 4; i++) ctx.fillRect(cx - 50 + i * 28, bottom - 48 - rise, 10, 8);
  }
  labelPill(ctx, cx, top, "Dough", { w, h: bottom });
}

function skillet(ctx: CanvasRenderingContext2D, w: number, top: number, bottom: number, view: MacroView): void {
  const cx = w * 0.46;
  const brown = view.step / 2;
  ctx.fillStyle = "#4a4038";
  roundRect(ctx, cx - 100, bottom - 54, 168, 28, 14);
  ctx.fill();
  ctx.fillStyle = "#2c241c";
  ctx.fillRect(cx + 68, bottom - 46, 70, 10);
  ctx.fillStyle = mixColor("#e6c8a4", "#6a3418", brown);
  roundRect(ctx, cx - 70, bottom - 78, 110, 28, 8);
  ctx.fill();
  labelPill(ctx, w * 0.5, top, brown > 0.4 ? "Browning crust" : "Hot pan", { w, h: bottom });
}

function saucepan(ctx: CanvasRenderingContext2D, w: number, top: number, bottom: number, view: MacroView): void {
  const cx = w * 0.5;
  const t = view.step / 3;
  ctx.strokeStyle = "#d7c3ae";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx - 70, top + 36);
  ctx.lineTo(cx - 78, bottom - 20);
  ctx.lineTo(cx + 78, bottom - 20);
  ctx.lineTo(cx + 70, top + 36);
  ctx.stroke();
  ctx.fillStyle = mixColor("#f6e7c4", "#2a2118", t);
  ctx.fillRect(cx - 70, bottom - 48, 140, 28);
  labelPill(ctx, cx, top, t > 0.8 ? "Burning" : "Sugar heating", { w, h: bottom });
}

function apple(ctx: CanvasRenderingContext2D, w: number, top: number, bottom: number, view: MacroView): void {
  const cx = w * 0.5;
  const cy = (top + bottom) / 2 + 6;
  const brown = view.step === 0 ? 0 : view.step === 3 || view.step === 4 ? 0.25 : Math.min(1, view.step * 0.35);
  ctx.fillStyle = mixColor("#d94b3a", "#7a4a32", brown);
  ctx.beginPath();
  ctx.arc(cx - 28, cy, 36, 0, Math.PI * 2);
  ctx.arc(cx + 28, cy, 36, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#c4a574";
  ctx.fillRect(cx - 3, cy - 52, 6, 16);
  if (view.step >= 3) {
    ctx.fillStyle = "#efe07a";
    ctx.beginPath();
    ctx.ellipse(cx + 34, cy + 8, 10, 14, 0.4, 0, Math.PI * 2);
    ctx.fill();
  }
  labelPill(ctx, cx, top, view.step >= 3 ? "Lemon on the cut" : "Cut face", { w, h: bottom });
}

function egg(ctx: CanvasRenderingContext2D, w: number, top: number, bottom: number, view: MacroView): void {
  const cx = w * 0.5;
  const cy = (top + bottom) / 2 + 8;
  ctx.fillStyle = "#f4efe6";
  ctx.beginPath();
  ctx.ellipse(cx, cy, 46, 58, 0, 0, Math.PI * 2);
  ctx.fill();
  if (view.step > 0) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, cy, 46, 58, 0, -0.2, Math.PI + 0.2);
    ctx.clip();
    ctx.fillStyle = view.step >= 2 ? "#f7f4ee" : "#f3e7c2";
    ctx.fillRect(cx - 50, cy, 100, 70);
    ctx.fillStyle = view.step >= 3 ? "#e2b13c" : "#f0c84a";
    ctx.beginPath();
    ctx.arc(cx, cy + 16, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  labelPill(ctx, cx, top, view.step === 0 ? "Raw" : "Cooked white", { w, h: bottom });
}

function pot(ctx: CanvasRenderingContext2D, w: number, top: number, bottom: number, view: MacroView): void {
  const cx = w * 0.5;
  ctx.fillStyle = "#5c6b73";
  roundRect(ctx, cx - 80, top + 40, 160, bottom - top - 52, 16);
  ctx.fill();
  ctx.fillStyle = "#9fd0ea";
  roundRect(ctx, cx - 68, top + 52, 136, 28, 8);
  ctx.fill();
  if (!view.reduced) {
    ctx.strokeStyle = "rgba(255,255,255,0.45)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      const y = top + 30 - ((view.time * 24 + i * 16) % 28);
      ctx.beginPath();
      ctx.arc(cx - 20 + i * 22, y, 8, Math.PI, 0);
      ctx.stroke();
    }
  }
  labelPill(ctx, cx, top, "Boiling water", { w, h: bottom });
}

function kettle(ctx: CanvasRenderingContext2D, w: number, top: number, bottom: number, view: MacroView): void {
  const cx = w * 0.48;
  ctx.fillStyle = "#d9dde2";
  roundRect(ctx, cx - 70, top + 36, 120, bottom - top - 48, 20);
  ctx.fill();
  ctx.fillStyle = "#eef2f4";
  ctx.fillRect(cx + 48, top + 58, 36, 12);
  const crust = view.step === 0 ? 0.15 : view.step === 1 ? 0.85 : 0.2;
  ctx.fillStyle = `rgba(232, 224, 206, ${crust})`;
  ctx.fillRect(cx - 50, bottom - 36, 80, 10);
  if (view.step >= 2 && !view.reduced) {
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = "rgba(255,255,255,0.7)";
      ctx.beginPath();
      ctx.arc(cx - 30 + i * 18, bottom - 50 - ((view.time * 30 + i * 10) % 24), 4, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  labelPill(ctx, w * 0.5, top, view.step >= 2 ? "Vinegar on scale" : "Scale", { w, h: bottom });
}

function basin(ctx: CanvasRenderingContext2D, w: number, top: number, bottom: number, view: MacroView): void {
  const cx = w * 0.5;
  ctx.strokeStyle = "#d7e4ea";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.ellipse(cx, bottom - 36, 100, 28, 0, 0, Math.PI);
  ctx.stroke();
  ctx.fillStyle = "rgba(160, 198, 214, 0.35)";
  ctx.beginPath();
  ctx.ellipse(cx, bottom - 36, 92, 22, 0, 0, Math.PI * 2);
  ctx.fill();
  if (view.step >= 2) {
    ctx.strokeStyle = "rgba(255,248,238,0.8)";
    ctx.beginPath();
    ctx.arc(cx, bottom - 70, 26, 0, Math.PI * 2);
    ctx.stroke();
    drawMol(ctx, "oil", cx, bottom - 70, 0, 0.55);
  } else {
    drawMol(ctx, "oil", cx, bottom - 64, view.time, 0.7);
  }
  labelPill(ctx, cx, top, view.step >= 2 ? "Micelle" : "Oil droplet", { w, h: bottom });
}

function cloth(ctx: CanvasRenderingContext2D, w: number, top: number, bottom: number, view: MacroView): void {
  const cx = w * 0.5;
  ctx.fillStyle = "#f7f1e6";
  roundRect(ctx, cx - 90, top + 28, 180, bottom - top - 40, 12);
  ctx.fill();
  const fade = Math.max(0.15, 1 - view.step * 0.28);
  ctx.fillStyle = `rgba(120, 40, 90, ${fade})`;
  ctx.beginPath();
  ctx.ellipse(cx, (top + bottom) / 2, 36, 22, -0.4, 0, Math.PI * 2);
  ctx.fill();
  labelPill(ctx, cx, top, view.step >= 2 ? "Color fading" : "A stain", { w, h: bottom });
}

function warning(ctx: CanvasRenderingContext2D, w: number, h: number, view: MacroView): void {
  const cx = w * 0.5;
  const y = h * 0.24;
  ctx.fillStyle = "rgba(255, 236, 232, 0.95)";
  roundRect(ctx, w * 0.12, h * 0.08, w * 0.76, h * 0.34, 18);
  ctx.fill();
  ctx.strokeStyle = "#9d1c2c";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "#9d1c2c";
  ctx.font = `700 ${Math.max(18, w * 0.06)}px Fraunces, Georgia, serif`;
  ctx.textAlign = "center";
  ctx.fillText("DO NOT MIX", cx, y);
  const names = ["BLEACH + ACID", "BLEACH + AMMONIA", "MORE CHLORAMINES", "GET OUT"];
  ctx.font = `700 14px "Atkinson Hyperlegible", sans-serif`;
  ctx.fillText(names[Math.min(view.step, names.length - 1)] ?? "", cx, y + 28);
  ctx.beginPath();
  ctx.arc(cx, y + 78, 22, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - 14, y + 92);
  ctx.lineTo(cx + 14, y + 64);
  ctx.stroke();
}

function pad(ctx: CanvasRenderingContext2D, w: number, top: number, bottom: number, view: MacroView): void {
  const cx = w * 0.5;
  ctx.fillStyle = "#f3d2c6";
  roundRect(ctx, cx - 100, top + 36, 200, bottom - top - 52, 40);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  roundRect(ctx, cx - 28, top + 48, 56, bottom - top - 80, 12);
  ctx.fill();
  if (view.step >= 1) {
    for (let i = 0; i < 6; i++) {
      const by = top + 60 + ((view.reduced ? 20 : view.time * 36 + i * 18) % 40);
      ctx.strokeStyle = "rgba(255,255,255,0.8)";
      ctx.beginPath();
      ctx.arc(cx - 16 + (i % 3) * 16, by, 4, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  labelPill(ctx, cx, top, "Peroxide fizz", { w, h: bottom });
}

function nail(ctx: CanvasRenderingContext2D, w: number, top: number, bottom: number, view: MacroView): void {
  const y = (top + bottom) / 2;
  ctx.strokeStyle = view.step >= 2 ? "#a85a3a" : "#c5ccd1";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(w * 0.22, y);
  ctx.lineTo(w * 0.72, y);
  ctx.stroke();
  ctx.fillStyle = view.step >= 2 ? "#8a3e28" : "#e7ecee";
  ctx.beginPath();
  ctx.arc(w * 0.22, y, 12, 0, Math.PI * 2);
  ctx.fill();
  const salt = view.step >= 3;
  labelPill(ctx, w * 0.5, top, salt ? "Salty water" : "Iron and air", { w, h: bottom });
}

function spoon(ctx: CanvasRenderingContext2D, w: number, top: number, bottom: number, view: MacroView): void {
  const cx = w * 0.42;
  const tarnish = view.step === 0 ? 0.85 : Math.max(0, 0.7 - view.step * 0.18);
  ctx.fillStyle = `rgb(${180 + tarnish * 20}, ${180 - tarnish * 80}, ${175 - tarnish * 70})`;
  ctx.beginPath();
  ctx.ellipse(cx, bottom - 70, 36, 46, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(cx - 6, bottom - 120, 12, 70);
  ctx.strokeStyle = "#d7dde2";
  ctx.lineWidth = 3;
  ctx.strokeRect(w * 0.62, bottom - 78, 70, 8);
  labelPill(ctx, w * 0.5, top, view.step >= 3 ? "Silver returning" : "Tarnish", { w, h: bottom });
}

function tooth(ctx: CanvasRenderingContext2D, w: number, top: number, bottom: number, view: MacroView): void {
  const cx = w * 0.5;
  ctx.fillStyle = view.step === 0 ? "#f4e7c8" : "#f7f4ee";
  ctx.beginPath();
  ctx.moveTo(cx - 40, bottom - 30);
  ctx.quadraticCurveTo(cx - 46, top + 30, cx, top + 24);
  ctx.quadraticCurveTo(cx + 46, top + 30, cx + 40, bottom - 30);
  ctx.closePath();
  ctx.fill();
  if (view.step === 0) {
    ctx.fillStyle = "#6a3418";
    ctx.fillRect(cx - 10, bottom - 48, 18, 12);
  }
  labelPill(ctx, cx, top, view.step >= 2 ? "Fluorapatite" : "Enamel", { w, h: bottom });
}

function duct(ctx: CanvasRenderingContext2D, w: number, top: number, bottom: number, view: MacroView): void {
  const cx = w * 0.5;
  ctx.fillStyle = "#e7b7b0";
  roundRect(ctx, cx - 70, top + 20, 140, bottom - top - 30, 30);
  ctx.fill();
  ctx.fillStyle = "#f6d2cc";
  roundRect(ctx, cx - 18, top + 28, 36, bottom - top - 70, 12);
  ctx.fill();
  if (view.step >= 2) {
    ctx.fillStyle = "rgba(196, 206, 214, 0.9)";
    ctx.beginPath();
    ctx.ellipse(cx, top + 48, 16, 10, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  labelPill(ctx, cx, top, view.step >= 2 ? "Gel plug" : "Sweat duct", { w, h: bottom });
}

function hair(ctx: CanvasRenderingContext2D, w: number, top: number, bottom: number, view: MacroView): void {
  const colors = ["#3a2418", "#a86a3a", "#e6c07a", "#c45a74"];
  ctx.strokeStyle = colors[Math.min(view.step, colors.length - 1)] ?? "#3a2418";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(w * 0.3 + i * 18, top + 16);
    ctx.bezierCurveTo(w * 0.34 + i * 16, top + 50, w * 0.28 + i * 20, bottom - 40, w * 0.36 + i * 14, bottom - 12);
    ctx.stroke();
  }
  labelPill(ctx, w * 0.5, top + 4, "Hair shaft", { w, h: bottom });
}

function skin(ctx: CanvasRenderingContext2D, w: number, top: number, bottom: number, view: MacroView): void {
  ctx.fillStyle = "#e7b39a";
  ctx.fillRect(0, top + 50, w, bottom - top);
  ctx.fillStyle = view.step >= 3 ? "rgba(236,236,236,0.55)" : "rgba(255, 214, 120, 0.35)";
  ctx.fillRect(0, top + 50, w, 16);
  if (!view.reduced) {
    ctx.strokeStyle = view.step >= 3 ? "rgba(255,255,255,0.7)" : "rgba(180, 120, 255, 0.8)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
      const x = w * 0.2 + i * w * 0.18;
      ctx.beginPath();
      ctx.moveTo(x, top + 18);
      ctx.lineTo(x - 8, top + 48);
      ctx.stroke();
    }
  }
  labelPill(ctx, w * 0.5, top, view.step >= 3 ? "Mineral filter" : "Ultraviolet", { w, h: bottom });
}

function burner(ctx: CanvasRenderingContext2D, w: number, top: number, bottom: number, view: MacroView): void {
  const cx = w * 0.5;
  ctx.strokeStyle = "#3a3430";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(cx, bottom - 28, 48, 0, Math.PI * 2);
  ctx.stroke();
  const yellow = view.step === 1;
  const weak = view.step >= 3;
  const color = yellow ? "#f0a202" : weak ? "#7eb0e0" : "#49a3e8";
  const hgt = weak ? 36 : 70;
  if (!view.reduced) {
    ctx.fillStyle = color;
    for (let i = -2; i <= 2; i++) {
      const flicker = Math.sin(view.time * 9 + i) * 6;
      ctx.beginPath();
      ctx.ellipse(cx + i * 14, bottom - 40 - hgt / 2 + flicker, 7, hgt / 2, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(cx, bottom - 40 - hgt / 2, 22, hgt / 2, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  labelPill(ctx, cx, top, yellow ? "Sooty flame" : weak ? "Starved flame" : "Blue flame", { w, h: bottom });
}

function alarm(ctx: CanvasRenderingContext2D, w: number, top: number, bottom: number, view: MacroView): void {
  const cx = w * 0.5;
  ctx.fillStyle = "#f4efe6";
  roundRect(ctx, cx - 70, top + 28, 140, 78, 16);
  ctx.fill();
  ctx.fillStyle = view.step >= 3 ? "#9d1c2c" : "#2f6a4a";
  ctx.beginPath();
  ctx.arc(cx, top + 62, 16, 0, Math.PI * 2);
  ctx.fill();
  labelPill(ctx, cx, top, view.step >= 3 ? "Alarm" : "No smell", { w, h: bottom });
}

function battery(ctx: CanvasRenderingContext2D, w: number, top: number, bottom: number, view: MacroView): void {
  const x = w * 0.28;
  const y = top + 24;
  const bw = Math.min(220, w * 0.5);
  const bh = bottom - y - 16;
  ctx.fillStyle = "#d9dde2";
  roundRect(ctx, x, y, bw, bh, 12);
  ctx.fill();
  ctx.fillStyle = "#8a939c";
  ctx.fillRect(x + bw * 0.4, y - 8, bw * 0.2, 10);
  ctx.fillStyle = view.step === 0 ? "#7f93a8" : "#6d5a4a";
  ctx.fillRect(x + 10, y + 10, bw * 0.28, bh - 20);
  ctx.fillStyle = "#3a3430";
  ctx.fillRect(x + bw * 0.62, y + 10, bw * 0.28, bh - 20);
  if (view.step < 3 && !view.reduced) {
    ctx.fillStyle = "#f0d078";
    const ex = x + bw + 16 + Math.sin(view.time * 4) * 6;
    ctx.beginPath();
    ctx.arc(ex, y + bh / 2, 4, 0, Math.PI * 2);
    ctx.fill();
  }
  labelPill(ctx, w * 0.72, top, "Alkaline cell", { w, h: bottom });
}

function pouch(ctx: CanvasRenderingContext2D, w: number, top: number, bottom: number, view: MacroView, cold: boolean): void {
  const cx = w * 0.5;
  const heat = view.kind === "pouch" && view.step >= 1;
  ctx.fillStyle = heat ? "#c46a45" : cold || view.kind !== "pouch" ? "#7aa0b8" : "#d7c3ae";
  roundRect(ctx, cx - 70, top + 30, 140, bottom - top - 46, 18);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.25)";
  roundRect(ctx, cx - 48, top + 46, 96, 22, 8);
  ctx.fill();
  labelPill(ctx, cx, top, heat ? "Giving off heat" : "Taking in heat", { w, h: bottom });
}

function tube(ctx: CanvasRenderingContext2D, w: number, top: number, bottom: number, view: MacroView): void {
  const cx = w * 0.5;
  const glow = view.step >= 2 ? 0.95 : 0.25;
  ctx.shadowColor = view.step >= 3 ? "#e2c044" : "#7ec8ff";
  ctx.shadowBlur = view.reduced ? 0 : 16 * glow;
  ctx.fillStyle = view.step >= 3 ? `rgba(226, 192, 68, ${glow})` : `rgba(126, 200, 255, ${glow})`;
  roundRect(ctx, cx - 16, top + 16, 32, bottom - top - 28, 16);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(255,255,255,0.8)";
  ctx.stroke();
  labelPill(ctx, cx, top, "Glow", { w, h: bottom });
}

function ice(ctx: CanvasRenderingContext2D, w: number, top: number, bottom: number, view: MacroView): void {
  const melt = view.step * 0.2;
  ctx.fillStyle = "#d5e7f2";
  roundRect(ctx, w * 0.3, top + 40 + melt * 20, 70, 48 - melt * 16, 8);
  ctx.fill();
  ctx.fillStyle = "#e7eef2";
  roundRect(ctx, w * 0.52, top + 52 + melt * 24, 58, 36 - melt * 14, 8);
  ctx.fill();
  if (view.step >= 1) {
    drawMol(ctx, "nacl", w * 0.62, top + 46, 0, 0.45);
  }
  labelPill(ctx, w * 0.5, top, "Ice", { w, h: bottom });
}

function fiber(ctx: CanvasRenderingContext2D, w: number, top: number, bottom: number, view: MacroView): void {
  ctx.strokeStyle = view.step === 1 ? "#d7c3ae" : "#7f93a8";
  ctx.lineWidth = 4;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(w * 0.25, top + 24 + i * 14);
    const snap = view.step >= 2 && i === 3;
    ctx.lineTo(snap ? w * 0.55 : w * 0.78, top + 30 + i * 12);
    ctx.stroke();
    if (snap) {
      ctx.beginPath();
      ctx.moveTo(w * 0.6, top + 36 + i * 12);
      ctx.lineTo(w * 0.78, top + 48);
      ctx.stroke();
    }
  }
  labelPill(ctx, w * 0.5, top, view.step >= 2 ? "A fiber breaks off" : "Polymer threads", { w, h: bottom });
}

function mixColor(a: string, b: string, t: number): string {
  const pa = hex(a);
  const pb = hex(b);
  const u = Math.max(0, Math.min(1, t));
  const r = Math.round(pa.r + (pb.r - pa.r) * u);
  const g = Math.round(pa.g + (pb.g - pa.g) * u);
  const bl = Math.round(pa.b + (pb.b - pa.b) * u);
  return `rgb(${r}, ${g}, ${bl})`;
}

function hex(value: string): { r: number; g: number; b: number } {
  const raw = value.replace("#", "");
  return { r: parseInt(raw.slice(0, 2), 16), g: parseInt(raw.slice(2, 4), 16), b: parseInt(raw.slice(4, 6), 16) };
}

export function drawMicelle(ctx: CanvasRenderingContext2D, x: number, y: number, filled: boolean): void {
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    ctx.save();
    ctx.translate(x + Math.cos(angle) * 42, y + Math.sin(angle) * 42);
    ctx.rotate(angle);
    drawMol(ctx, "soap", 0, 0, 0, 0.7);
    ctx.restore();
  }
  if (filled) drawMol(ctx, "oil", x, y, 0, 0.55);
}

export function drawChain(ctx: CanvasRenderingContext2D, x: number, y: number, folded: boolean, time: number): void {
  ctx.strokeStyle = "rgba(247,244,238,0.45)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  const n = 4;
  for (let i = 0; i < n; i++) {
    const px = folded ? x + Math.cos(i + time) * 28 : x - 70 + i * 36;
    const py = folded ? y + Math.sin(i * 1.3) * 22 : y + Math.sin(i) * 6;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();
  for (let i = 0; i < n; i++) {
    const px = folded ? x + Math.cos(i + time) * 28 : x - 70 + i * 36;
    const py = folded ? y + Math.sin(i * 1.3) * 22 : y + Math.sin(i) * 6;
    drawMol(ctx, i % 2 ? "h2o" : "glucose", px, py, 0, 0.55);
  }
}
