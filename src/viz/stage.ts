import { backdrop, drawMol, labelPill, type Mood } from "./draw";
import { drawChain, drawMacro, drawMicelle, type MacroKind } from "./macros";
import type { MolId } from "./mols";
import { contain, integrate, type Molecule, type Viz } from "./types";

export interface CastStep {
  label: string;
  mols: MolId[];
  morph?: MolId[];
  bubbles?: boolean;
  mood?: Mood;
  well?: "mix" | "micelle" | "chain" | "warn";
  folded?: boolean;
}

export interface TopicArt {
  macro: MacroKind;
  steps: CastStep[];
}

interface Particle extends Molecule {
  mol: MolId;
  morph?: MolId;
}

interface Bubble {
  x: number;
  y: number;
  r: number;
  v: number;
}

interface Sim {
  particles: Particle[];
  bubbles: Bubble[];
  w: number;
  h: number;
  built: number;
}

function build(art: TopicArt, step: number, w: number, h: number): Sim {
  const cast = art.steps[Math.min(step, art.steps.length - 1)];
  const top = h * 0.54;
  const particles: Particle[] = [];
  const count = Math.max(cast.mols.length, 6);
  for (let i = 0; i < count; i++) {
    const mol = cast.mols[i % cast.mols.length];
    const col = i % 3;
    const row = Math.floor(i / 3);
    particles.push({
      mol,
      morph: cast.morph ? cast.morph[i % cast.morph.length] : undefined,
      x: w * (0.22 + col * 0.28),
      y: top + 28 + row * 48,
      vx: ((i * 17) % 9) - 4,
      vy: ((i * 13) % 7) - 3,
      angle: (i * 0.7) % (Math.PI * 2),
      spin: i % 2 === 0 ? 0.4 : -0.3,
    });
  }
  return { particles, bubbles: [], w, h, built: step };
}

export function createTopicViz(art: TopicArt): Viz<Sim> {
  return {
    create(w, h) {
      return build(art, 0, w, h);
    },
    resize(state, w, h) {
      const sx = w / state.w;
      const sy = h / state.h;
      for (const particle of state.particles) {
        particle.x *= sx;
        particle.y *= sy;
      }
      state.w = w;
      state.h = h;
    },
    tick(state, input) {
      if (state.built !== input.step) {
        const next = build(art, input.step, input.w, input.h);
        state.particles = next.particles;
        state.bubbles = [];
        state.built = input.step;
      }
      const cast = art.steps[Math.min(input.step, art.steps.length - 1)];
      const top = input.h * 0.52;
      for (const particle of state.particles) {
        integrate(particle, input.dt, 50);
        contain(particle, 8, top, input.w, input.h, 24);
      }
      if (cast.bubbles) {
        if (state.bubbles.length < 8 && Math.random() < 0.4) {
          state.bubbles.push({
            x: input.w * (0.3 + Math.random() * 0.4),
            y: input.h * 0.9,
            r: 3 + Math.random() * 4,
            v: 28 + Math.random() * 20,
          });
        }
        state.bubbles = state.bubbles.filter((bubble) => {
          bubble.y -= bubble.v * input.dt;
          return bubble.y > top;
        });
      } else {
        state.bubbles = [];
      }
    },
    draw(ctx, state, input) {
      const cast = art.steps[Math.min(input.step, art.steps.length - 1)];
      const progress = input.reduced ? 1 : Math.min(1, input.time / 5);
      backdrop(ctx, input.w, input.h, cast.mood ?? "neutral");
      drawMacro(ctx, {
        kind: art.macro,
        step: input.step,
        progress,
        time: input.time,
        reduced: input.reduced,
        w: input.w,
        h: input.h,
      });
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, input.h * 0.5, input.w, input.h * 0.5);
      if (cast.well === "micelle") {
        ctx.save();
        ctx.translate(input.w * 0.5, input.h * 0.74);
        ctx.rotate(input.reduced ? 0 : Math.sin(input.time * 0.8) * 0.12);
        drawMicelle(ctx, 0, 0, input.step >= 3 || progress > 0.45);
        ctx.restore();
      } else if (cast.well === "chain") {
        drawChain(ctx, input.w * 0.5, input.h * 0.74, cast.folded !== false && input.step === 0, input.time);
      } else {
        for (const particle of state.particles) {
          const mol = particle.morph && progress > 0.45 ? particle.morph : particle.mol;
          drawMol(ctx, mol, particle.x, particle.y, particle.angle, input.w < 420 ? 0.72 : 0.86);
        }
      }
      for (const bubble of state.bubbles) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255,255,255,0.75)";
        ctx.lineWidth = 1.5;
        ctx.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
        ctx.stroke();
      }
      labelPill(ctx, input.w * 0.5, input.h * 0.56, cast.label, { w: input.w, h: input.h });
    },
  };
}
