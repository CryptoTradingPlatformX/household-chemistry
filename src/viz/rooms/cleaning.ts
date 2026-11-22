import { ART } from "../art";
import { createTopicViz } from "../stage";
import type { Viz } from "../types";

const IDS = ["soap", "bleach-stains", "never-mix-bleach", "peroxide", "rust", "silver-tarnish"] as const;

export function getViz(id: string): Viz<unknown> {
  const art = ART[id];
  if (!art || !IDS.includes(id as (typeof IDS)[number])) throw new Error(`Missing cleaning scene ${id}`);
  return createTopicViz(art) as Viz<unknown>;
}
