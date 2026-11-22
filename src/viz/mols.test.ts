import { describe, expect, it } from "vitest";
import { ELEMENTS, type ElementSymbol } from "../content/species";
import { ART } from "./art";
import { MOL_FORMULAS, MOLS, countAtoms, isMark, simplifiedHydrogenLabels, type MolId } from "./mols";

function zeros(): Record<ElementSymbol, number> {
  return Object.fromEntries(ELEMENTS.map((element) => [element, 0])) as Record<ElementSymbol, number>;
}

describe("molecule drawings", () => {
  it("matches every sprite to its molecular formula, hydrogen included", () => {
    for (const id of Object.keys(MOL_FORMULAS) as (keyof typeof MOL_FORMULAS)[]) {
      const expected = zeros();
      for (const [element, count] of Object.entries(MOL_FORMULAS[id])) {
        expected[element as ElementSymbol] = count ?? 0;
      }
      expect(countAtoms(id), id).toEqual(expected);
    }
  });

  it("gives every hydrogen a home on a heavy atom, except a bare proton", () => {
    for (const id of Object.keys(MOLS) as (keyof typeof MOLS)[]) {
      const hydrogens = MOLS[id].atoms.filter((atom) => atom.el === "H");
      const labeled = simplifiedHydrogenLabels(id);
      const bare = hydrogens.filter((atom) => atom.parent === undefined).length;
      expect(labeled + bare, id).toBe(hydrogens.length);
      if (id !== "h") expect(bare, id).toBe(0);
      for (const atom of hydrogens) {
        if (atom.parent === undefined) continue;
        expect(MOLS[id].atoms[atom.parent]?.el, id).not.toBe("H");
      }
    }
  });

  it("shows the classroom counts people can check by eye", () => {
    expect(countAtoms("ch4").H).toBe(4);
    expect(countAtoms("ethanol").H).toBe(6);
    expect(countAtoms("glucose").H).toBe(12);
    expect(countAtoms("acetic").H).toBe(4);
    expect(countAtoms("sucrose").H).toBe(22);
    expect(countAtoms("soap").H).toBe(35);
    expect(countAtoms("citric").H).toBe(8);
    expect(countAtoms("lysine").H).toBe(14);
    expect(countAtoms("melanin").H).toBe(7);
    expect(countAtoms("oxy").H).toBe(12);
    expect(countAtoms("pet").H).toBe(8);
    expect(countAtoms("nylon").H).toBe(22);
  });

  it("only animates molecules that exist", () => {
    for (const art of Object.values(ART)) {
      for (const step of art.steps) {
        for (const id of [...step.mols, ...(step.morph ?? [])]) {
          expect(isMark(id as MolId) || id in MOLS, id).toBe(true);
        }
      }
    }
  });
});
