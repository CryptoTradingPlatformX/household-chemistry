import { ART } from "../art";
import { createTopicViz } from "../stage";
import type { Viz } from "../types";

const IDS = [
  "baking-soda-vinegar",
  "bread-rising",
  "maillard",
  "caramel",
  "fruit-browning",
  "boiling-egg",
  "boiling-point",
  "kettle-scale",
] as const;

export function getViz(id: string): Viz<unknown> {
  const art = ART[id];
  if (!art || !IDS.includes(id as (typeof IDS)[number])) throw new Error(`Missing kitchen scene ${id}`);
  return createTopicViz(art) as Viz<unknown>;
}
