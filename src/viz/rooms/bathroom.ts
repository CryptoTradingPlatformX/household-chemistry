import { ART } from "../art";
import { createTopicViz } from "../stage";
import type { Viz } from "../types";

const IDS = ["fluoride", "antiperspirant", "hair-color", "sunscreen"] as const;

export function getViz(id: string): Viz<unknown> {
  const art = ART[id];
  if (!art || !IDS.includes(id as (typeof IDS)[number])) throw new Error(`Missing bathroom scene ${id}`);
  return createTopicViz(art) as Viz<unknown>;
}
