export interface VizInput {
  step: number;
  time: number;
  dt: number;
  w: number;
  h: number;
  reduced: boolean;
  /** Skeleton with CH₃ / OH labels instead of a sphere for every hydrogen. */
  simplified: boolean;
}

export interface Viz<S> {
  create(w: number, h: number): S;
  resize(state: S, w: number, h: number): void;
  tick(state: S, input: VizInput): void;
  draw(ctx: CanvasRenderingContext2D, state: S, input: VizInput): void;
}

export interface Molecule {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  spin: number;
}

export function integrate(m: Molecule, dt: number, jitter = 70): void {
  m.vx += (Math.random() - 0.5) * jitter * dt;
  m.vy += (Math.random() - 0.5) * jitter * dt;
  const keep = Math.max(0, 1 - dt * 1.5);
  m.vx *= keep;
  m.vy *= keep;
  const speed = Math.hypot(m.vx, m.vy);
  const max = 32;
  if (speed > max) {
    m.vx = (m.vx / speed) * max;
    m.vy = (m.vy / speed) * max;
  }
  m.x += m.vx * dt;
  m.y += m.vy * dt;
  m.angle += m.spin * dt;
}

export function contain(m: Molecule, left: number, top: number, right: number, bottom: number, pad = 18): void {
  if (m.x < left + pad) {
    m.x = left + pad;
    m.vx = Math.abs(m.vx);
  }
  if (m.x > right - pad) {
    m.x = right - pad;
    m.vx = -Math.abs(m.vx);
  }
  if (m.y < top + pad) {
    m.y = top + pad;
    m.vy = Math.abs(m.vy);
  }
  if (m.y > bottom - pad) {
    m.y = bottom - pad;
    m.vy = -Math.abs(m.vy);
  }
}
