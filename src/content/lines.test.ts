import { describe, expect, it } from "vitest";
import { LINES, lineProblems, tally } from "./lines";
import { SPECIES } from "./species";

const ALL = Object.values(LINES);

describe("every household line", () => {
  it("balances atoms and charge, or checks a physical formula", () => {
    expect(ALL.flatMap(lineProblems)).toEqual([]);
  });

  it("explains every term in plain language", () => {
    for (const line of ALL) {
      if (line.kind !== "reaction") continue;
      for (const term of [...line.left, ...line.right]) {
        const species = SPECIES[term.id];
        expect(species.plain.length).toBeGreaterThan(40);
        expect(species.label.length).toBeGreaterThan(0);
      }
    }
  });

  it("keeps the reactions this tour promises", () => {
    const fizz = LINES["fizz-overall"];
    expect(fizz.kind).toBe("reaction");
    if (fizz.kind === "reaction") {
      expect(tally(fizz.left).atoms).toEqual(tally(fizz.right).atoms);
      expect(tally(fizz.left).charge).toBe(0);
    }

    const ferment = LINES["bread-ferment"];
    if (ferment.kind === "reaction") {
      expect(tally(ferment.right).atoms.C).toBe(6);
      expect(tally(ferment.left).atoms.O).toBe(6);
    }

    const scale = LINES["scale-heat"];
    if (scale.kind === "reaction") {
      expect(tally(scale.left).charge).toBe(0);
      expect(tally(scale.left).atoms.Ca).toBe(1);
      expect(tally(scale.right).atoms.C).toBe(2);
    }

    const vinegar = LINES["scale-vinegar"];
    if (vinegar.kind === "reaction") {
      expect(tally(vinegar.left).atoms).toEqual(tally(vinegar.right).atoms);
    }

    const peroxide = LINES["per-fast"];
    if (peroxide.kind === "reaction") {
      expect(tally(peroxide.left).atoms.O).toBe(4);
      expect(tally(peroxide.right).atoms.O).toBe(4);
    }

    const silver = LINES["sil-redox"];
    if (silver.kind === "reaction") {
      expect(tally(silver.left).atoms.Ag).toBe(6);
      expect(tally(silver.right).atoms.S).toBe(3);
    }

    const flame = LINES["stove-burn"];
    if (flame.kind === "reaction") {
      expect(tally(flame.left).atoms.H).toBe(4);
      expect(tally(flame.right).atoms.O).toBe(4);
    }

    const chlorine = LINES["danger-acid"];
    if (chlorine.kind === "reaction") {
      expect(tally(chlorine.left).charge).toBe(0);
      expect(tally(chlorine.right).atoms.Cl).toBe(2);
    }

    const chloramine = LINES["danger-ammonia"];
    if (chloramine.kind === "reaction") {
      expect(tally(chloramine.left).charge).toBe(-1);
      expect(tally(chloramine.right).charge).toBe(-1);
    }

    const enamel = LINES["tooth-swap"];
    if (enamel.kind === "reaction") {
      expect(tally(enamel.left).atoms.F).toBe(2);
      expect(tally(enamel.left).atoms.Ca).toBe(10);
      expect(tally(enamel.left).charge).toBe(-2);
    }

    const micelle = LINES["soap-micelle"];
    if (micelle.kind === "reaction") {
      expect(tally(micelle.left).charge).toBe(-8);
      expect(tally(micelle.right).atoms.C).toBe(144);
    }

    const glow = LINES["glow-fuel"];
    if (glow.kind === "reaction") {
      expect(tally(glow.left).atoms).toEqual(tally(glow.right).atoms);
    }
  });
});
