import { describe, expect, it } from "vitest";
import { ART } from "../viz/art";
import { NACL_EUTECTIC_C, ironOxidationHeatKJ } from "../lib/colligative";
import { LINES, type LineId } from "./lines";
import { TOPICS } from "./topics";
import { DISCLAIMER, ROOMS } from "./types";

const LINE_IDS = new Set(Object.keys(LINES));

describe("topics", () => {
  it("covers four rooms and every promised subject", () => {
    expect(ROOMS.map((room) => room.id)).toEqual(["kitchen", "cleaning", "bathroom", "house"]);
    expect(TOPICS.map((topic) => topic.id)).toEqual([
      "baking-soda-vinegar",
      "bread-rising",
      "maillard",
      "caramel",
      "fruit-browning",
      "boiling-egg",
      "boiling-point",
      "kettle-scale",
      "soap",
      "bleach-stains",
      "never-mix-bleach",
      "peroxide",
      "rust",
      "silver-tarnish",
      "fluoride",
      "antiperspirant",
      "hair-color",
      "sunscreen",
      "gas-flame",
      "carbon-monoxide",
      "alkaline-battery",
      "hand-warmer",
      "ice-pack",
      "glow-stick",
      "road-salt",
      "microplastics",
    ]);
  });

  it("gives every step its own balanced line", () => {
    const used = new Set<string>();
    for (const topic of TOPICS) {
      expect(topic.steps.length).toBeGreaterThanOrEqual(2);
      expect(topic.steps.length).toBeLessThanOrEqual(5);
      expect(topic.sources.length).toBeGreaterThan(0);
      expect(topic.hook.length).toBeGreaterThan(40);
      for (const step of topic.steps) {
        expect(step.equations.length).toBeGreaterThan(0);
        expect(step.caption.length).toBeGreaterThan(80);
        for (const id of step.equations) {
          expect(LINE_IDS.has(id)).toBe(true);
          used.add(id);
          const line = LINES[id as LineId];
          expect(line.simplified === undefined || typeof line.simplified === "boolean").toBe(true);
        }
      }
    }
    expect([...LINE_IDS].filter((id) => !used.has(id))).toEqual([]);
    expect(Object.keys(ART).sort()).toEqual(TOPICS.map((topic) => topic.id).sort());
    for (const topic of TOPICS) {
      expect(ART[topic.id].steps.length).toBe(topic.steps.length);
    }
  });

  it("keeps the bleach page free of mixing instructions", () => {
    const danger = TOPICS.find((topic) => topic.id === "never-mix-bleach");
    expect(danger?.danger).toBe(true);
    expect(danger?.practice.safe).toBe(false);
    const text = JSON.stringify(danger).toLowerCase();
    for (const banned of ["tablespoon", "teaspoon", "equal parts", "add the bleach", "mix them together", "ppm"]) {
      expect(text).not.toContain(banned);
    }
    for (const required of ["chlorine", "chloramine", "ammonia", "vinegar", "never"]) {
      expect(text).toContain(required);
    }
    expect(DISCLAIMER.toLowerCase()).toContain("not medical");
  });

  it("does not turn carbon monoxide or batteries into projects", () => {
    const co = TOPICS.find((topic) => topic.id === "carbon-monoxide");
    const battery = TOPICS.find((topic) => topic.id === "alkaline-battery");
    const ice = TOPICS.find((topic) => topic.id === "ice-pack");
    expect(co?.practice.safe).toBe(false);
    expect(battery?.practice.safe).toBe(false);
    expect(ice?.practice.safe).toBe(false);
    expect(JSON.stringify(ice).toLowerCase()).not.toContain("fertilizer");
    expect(JSON.stringify(ice).toLowerCase()).not.toContain("explosive");
    expect(ironOxidationHeatKJ()).toBe(-1648);
    expect(NACL_EUTECTIC_C).toBeGreaterThan(-22);
    expect(NACL_EUTECTIC_C).toBeLessThan(-20);
  });
});
