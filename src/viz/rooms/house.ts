import { ART } from "../art";
import { createTopicViz } from "../stage";
import type { Viz } from "../types";

const IDS = [
  "gas-flame",
  "carbon-monoxide",
  "alkaline-battery",
  "hand-warmer",
  "ice-pack",
  "glow-stick",
  "road-salt",
  "microplastics",
] as const;

export function getViz(id: string): Viz<unknown> {
  const art = ART[id];
  if (!art || !IDS.includes(id as (typeof IDS)[number])) throw new Error(`Missing house scene ${id}`);
  return createTopicViz(art) as Viz<unknown>;
}
