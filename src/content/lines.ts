import {
  BOILING_EXAMPLE_C,
  EXAMPLE_MOLALITY,
  FREEZING_EXAMPLE_C,
  ICE_PACK_EXAMPLE_KJ,
  NACL_IDEAL_I,
  NH4NO3_SOLUTION_KJ,
  WATER_KB,
  WATER_KF,
  boilingPointRise,
  freezingPointDrop,
  solutionHeatKJ,
} from "../lib/colligative";
import { ELEMENTS, SPECIES, type ElementSymbol, type SpeciesId } from "./species";

export interface TermRef {
  id: SpeciesId;
  count?: number;
  label?: string;
}

interface LineBase {
  id: string;
  simplified?: boolean;
  reading: string;
  aside?: string;
}

export interface ReactionLine extends LineBase {
  kind: "reaction";
  left: TermRef[];
  right: TermRef[];
  reversible?: boolean;
  catalyst?: string;
  suffix?: string;
}

export interface SymbolInfo {
  label: string;
  plain: string;
}

export const SYMBOLS = {
  deltaTb: {
    label: "ΔT_b",
    plain: "How many degrees Celsius the boiling point goes up. For a teaspoon of salt in a liter of water, this is about a tenth of a degree.",
  },
  deltaTf: {
    label: "ΔT_f",
    plain: "How many degrees Celsius the freezing point goes down. A bigger number means the water has to get colder before it turns to ice.",
  },
  iFactor: {
    label: "i",
    plain: "The van ’t Hoff factor: how many pieces one formula unit splits into in water. Salt splits into two ions, so i is about 2. Sugar stays whole, so i is 1.",
  },
  kb: {
    label: "K_b",
    plain: "The boiling-point constant of the liquid. For water it is 0.512 °C per molal. It belongs to the water, not to the salt.",
  },
  kf: {
    label: "K_f",
    plain: "The freezing-point constant of the liquid. For water it is 1.86 °C per molal. Salt uses this same water property that raises the boiling point.",
  },
  molality: {
    label: "m",
    plain: "Molality: moles dissolved per kilogram of liquid. A tenth molal is about 5.8 grams of salt in one kilogram of water.",
  },
  heatQ: {
    label: "q",
    plain: "Heat taken in or given out, in kilojoules. A positive q here means the pack absorbs heat and feels cold.",
  },
  moles: {
    label: "n",
    plain: "Amount of the salt in moles. One mole of ammonium nitrate is about 80 grams. A small pack uses a fraction of a mole.",
  },
  deltaH: {
    label: "ΔH",
    plain: "Heat per mole for this dissolving, about +25.7 kilojoules. Positive means the mixture takes heat from your hand.",
  },
} as const satisfies Record<string, SymbolInfo>;

export type SymbolId = keyof typeof SYMBOLS;

export type RelationPart = { id: SymbolId } | { text: string };

export interface RelationLine extends LineBase {
  kind: "relation";
  parts: RelationPart[];
  example: string;
  check: () => string | null;
}

export type Line = ReactionLine | RelationLine;

function term(id: SpeciesId, count?: number, label?: string): TermRef {
  if (count === undefined && label === undefined) return { id };
  if (label === undefined) return { id, count };
  if (count === undefined) return { id, label };
  return { id, count, label };
}

interface RxOpts {
  reversible?: boolean;
  simplified?: boolean;
  catalyst?: string;
  suffix?: string;
  aside?: string;
}

function rx(left: TermRef[], right: TermRef[], reading: string, opts: RxOpts = {}): Omit<ReactionLine, "id"> {
  return { kind: "reaction", left, right, reading, ...opts };
}

function rel(
  parts: RelationPart[],
  reading: string,
  example: string,
  check: () => string | null,
  opts: { simplified?: boolean; aside?: string } = {},
): Omit<RelationLine, "id"> {
  return { kind: "relation", parts, reading, example, check, ...opts };
}

const RAW_LINES = {
  "fizz-acid": rx(
    [term("acetic"), term("h2o", undefined, "H₂O(l)")],
    [term("acetate", undefined, "CH₃COO⁻(aq)"), term("h3o", undefined, "H₃O⁺(aq)")],
    "A little of the acetic acid in vinegar gives a proton to water.",
    { reversible: true },
  ),
  "fizz-dissolve": rx(
    [term("nahco3", undefined, "NaHCO₃(s)")],
    [term("na", undefined, "Na⁺(aq)"), term("hco3", undefined, "HCO₃⁻(aq)")],
    "Baking soda comes apart in water into a sodium ion and a bicarbonate ion.",
  ),
  "fizz-overall": rx(
    [term("nahco3"), term("acetic")],
    [term("sodiumAcetate"), term("h2o"), term("co2", undefined, "CO₂(g)")],
    "Baking soda and acetic acid make sodium acetate, water, and carbon dioxide gas.",
  ),
  "fizz-ionic": rx(
    [term("hco3"), term("acetic")],
    [term("acetate"), term("h2o"), term("co2", undefined, "CO₂(g)")],
    "The bicarbonate ion and the acid trade a proton and release carbon dioxide.",
  ),
  "fizz-gas": rx(
    [term("co2", undefined, "CO₂(aq)")],
    [term("co2", undefined, "CO₂(g)")],
    "Dissolved carbon dioxide leaves the water as the bubbles you see.",
  ),
  "bread-starch": rx(
    [term("starch"), term("h2o")],
    [term("glucose")],
    "A starch unit takes up water and becomes glucose, simplified to one link of the chain.",
    {
      simplified: true,
      aside: "Real starch is a long polymer. Enzymes in flour and yeast snip many links, not one.",
    },
  ),
  "bread-ferment": rx(
    [term("glucose")],
    [term("ethanol", 2), term("co2", 2)],
    "Yeast turns glucose into ethanol and carbon dioxide. The gas is what lifts the dough.",
    {
      simplified: true,
      catalyst: "yeast enzymes",
      aside: "This is the overall result. Inside the cell it takes many steps, and dough has other microbes too.",
    },
  ),
  "bread-bubble": rx(
    [term("co2", undefined, "CO₂(aq)")],
    [term("co2", undefined, "CO₂(g)")],
    "Carbon dioxide comes out of the dough liquids and inflates tiny bubbles.",
    { reversible: true },
  ),
  "bread-alcohol": rx(
    [term("ethanol", undefined, "C₂H₅OH(l)")],
    [term("ethanol", undefined, "C₂H₅OH(g)")],
    "In the oven most of the ethanol evaporates, and a little can remain in the crumb.",
  ),
  "mail-condense": rx(
    [term("glucose"), term("lysine")],
    [term("glycosylamine"), term("h2o")],
    "A sugar and an amino acid join and lose water. This starts the Maillard network.",
    {
      reversible: true,
      simplified: true,
      aside: "Free lysine stands in for lysine built into a protein. Wet surfaces push this arrow backward, which is why searing wants a dry crust.",
    },
  ),
  "mail-amadori": rx(
    [term("glycosylamine")],
    [term("amadori")],
    "The first product rearranges into the Amadori form. The atoms stay the same and the connections change.",
    {
      reversible: true,
      simplified: true,
      aside: "Same formula on both sides: this is a rearrangement, one step in a network, not the brown color by itself.",
    },
  ),
  "mail-strecker": rx(
    [term("alanine"), term("glyoxal")],
    [term("acetaldehyde"), term("co2"), term("aminoacetaldehyde")],
    "A small reactive piece breaks an amino acid into an aroma molecule and carbon dioxide.",
    {
      simplified: true,
      aside: "Simplified Strecker step. Browning foods make hundreds of products. The brown color is a mixture of large molecules, not this one.",
    },
  ),
  "car-invert": rx(
    [term("sucrose"), term("h2o")],
    [term("glucose"), term("fructose")],
    "Table sugar takes up water and splits into glucose and fructose.",
    { catalyst: "heat" },
  ),
  "car-hmf": rx(
    [term("glucose")],
    [term("hmf"), term("h2o", 3)],
    "Heat pulls three waters out of a sugar and leaves HMF, one molecule among many in caramel.",
    {
      simplified: true,
      aside: "Fructose does this too. Caramel is a mixture. HMF is one real product, not the whole flavor.",
    },
  ),
  "car-join": rx(
    [term("hmf", 2)],
    [term("caramelPiece"), term("h2o")],
    "Small caramel molecules join into larger ones, which is why the color deepens.",
    {
      simplified: true,
      aside: "The product here is a stand-in. Real caramel holds many sizes of molecule, not one formula.",
    },
  ),
  "car-burn": rx(
    [term("sucrose")],
    [term("c", 12), term("h2o", 11)],
    "If the sugar burns, it heads toward black carbon and water. That is past caramel.",
    {
      simplified: true,
      aside: "Real burning also makes carbon dioxide, carbon monoxide, and smoke. This line is the dehydration extreme.",
    },
  ),
  "fruit-air": rx(
    [term("o2", undefined, "O₂(g)")],
    [term("o2", undefined, "O₂(aq)")],
    "Browning needs oxygen from the air. Covering the cut slows the supply.",
    { reversible: true },
  ),
  "fruit-ppo": rx(
    [term("catechol", 2), term("o2")],
    [term("quinone", 2), term("h2o", 2)],
    "An enzyme uses oxygen to turn a polyphenol into a quinone, the start of the brown color.",
    {
      simplified: true,
      catalyst: "polyphenol oxidase",
      aside: "Catechol stands in for the larger polyphenols in apples and avocados. The enzyme is damaged by heat and slowed by acid.",
    },
  ),
  "fruit-brown": rx(
    [term("quinone", 2)],
    [term("quinoneDimer")],
    "Quinones link into larger brown pigments. The brown is those pigments, not rust.",
    {
      simplified: true,
      aside: "Two quinones joined is a teaching picture. Real pigments are a mixture of many sizes.",
    },
  ),
  "fruit-vitamin": rx(
    [term("ascorbic"), term("quinone")],
    [term("dha"), term("catechol")],
    "Vitamin C gives hydrogens back to the quinone, so the browning step runs backward for a while.",
    {
      simplified: true,
      aside: "When the vitamin C is used up, browning can return. Lemon helps. It does not stop the chemistry forever.",
    },
  ),
  "fruit-citric": rx(
    [term("citric")],
    [term("citrate"), term("h")],
    "Citric acid lets go of H⁺. The lower pH makes the browning enzyme work poorly.",
    {
      reversible: true,
      simplified: true,
      aside: "Citric acid can lose three protons. This is the first. The enzyme slowdown is the practical effect.",
    },
  ),
  "egg-peptide": rx(
    [term("glycine"), term("alanine")],
    [term("dipeptide"), term("h2o")],
    "Amino acids join by losing water. That link is a peptide bond, the chain in egg white.",
    {
      simplified: true,
      aside: "A real egg-white protein has hundreds of links. This pair stands in so the bond is visible.",
    },
  ),
  "egg-unfold": rx(
    [term("dipeptide", undefined, "folded peptide")],
    [term("dipeptide", undefined, "unfolded peptide")],
    "Heat unfolds the chain. The formula does not change. The shape does.",
    {
      reversible: true,
      simplified: true,
      aside: "Simplified stand-in. Denaturation is a change of shape. Ordinary boiling does not cut the peptide bonds.",
    },
  ),
  "egg-disulfide": rx(
    [term("cysteine", 2)],
    [term("cystine"), term("h", 2), term("e", 2)],
    "Two sulfur-containing links can clip together. This half-reaction is one part of a set white.",
    {
      simplified: true,
      aside: "The electrons go to other partners, not into the pan. Most of the firming is chains tangling, not only this clip.",
    },
  ),
  "egg-intact": rx(
    [term("dipeptide"), term("h2o")],
    [term("glycine"), term("alanine")],
    "Cutting the chain back into amino acids is a different, harsher reaction. Boiling an egg does not do it.",
    {
      simplified: true,
      aside: "Full hydrolysis needs strong acid or special enzymes and a long time. A ten-minute egg is still protein.",
    },
  ),
  "boil-salt": rx(
    [term("nacl", undefined, "NaCl(s)")],
    [term("na", undefined, "Na⁺(aq)"), term("cl", undefined, "Cl⁻(aq)")],
    "Salt crystals come apart into two ions. Those ions are what change the boiling point, a little.",
  ),
  "boil-rise": rel(
    [{ id: "deltaTb" }, { text: "=" }, { id: "iFactor" }, { text: "·" }, { id: "kb" }, { text: "·" }, { id: "molality" }],
    "The boiling-point rise equals the ion count, times water’s constant, times how much is dissolved.",
    `${NACL_IDEAL_I} × ${WATER_KB} × ${EXAMPLE_MOLALITY} = ${BOILING_EXAMPLE_C.toFixed(3)} °C`,
    () => {
      const rise = boilingPointRise(NACL_IDEAL_I, WATER_KB, EXAMPLE_MOLALITY);
      if (Math.abs(rise - 0.1024) > 1e-9) return `boiling example ${rise}`;
      if (WATER_KB !== 0.512) return "Kb";
      return null;
    },
    {
      aside: "For 0.10 mol of salt in 1 kg of water, about one teaspoon in a liter, the ideal rise is 0.102 °C. Pasta water does not boil “hotter” in any way you can cook by.",
    },
  ),
  "boil-sugar": rx(
    [term("sucrose", undefined, "C₁₂H₂₂O₁₁(s)")],
    [term("sucrose", undefined, "C₁₂H₂₂O₁₁(aq)")],
    "Sugar dissolves without splitting, so its i is 1 and the boiling change is even smaller.",
  ),
  "boil-water": rx(
    [term("h2o", undefined, "H₂O(l)")],
    [term("h2o", undefined, "H₂O(g)")],
    "Boiling is water molecules leaving the liquid. Salt barely changes the temperature where this happens.",
    { reversible: true },
  ),
  "scale-ions": rx(
    [term("caco3", undefined, "CaCO₃(s)"), term("co2", undefined, "CO₂(aq)"), term("h2o")],
    [term("ca", undefined, "Ca²⁺(aq)"), term("hco3", 2, "HCO₃⁻(aq)")],
    "Limestone, carbon dioxide, and water put calcium and bicarbonate ions into hard water.",
    { reversible: true },
  ),
  "scale-heat": rx(
    [term("ca"), term("hco3", 2)],
    [term("caco3", undefined, "CaCO₃(s)"), term("h2o"), term("co2", undefined, "CO₂(g)")],
    "Heating drives those ions back into solid calcium carbonate, the scale in the kettle.",
  ),
  "scale-vinegar": rx(
    [term("caco3"), term("acetic", 2)],
    [term("calciumAcetate"), term("h2o"), term("co2", undefined, "CO₂(g)")],
    "Acetic acid dissolves the scale into soluble calcium acetate, water, and carbon dioxide.",
  ),
  "scale-rinse": rx(
    [term("calciumAcetate", undefined, "Ca(CH₃COO)₂(aq)")],
    [term("ca"), term("acetate", 2)],
    "Calcium acetate stays dissolved as ions, so rinsing carries the old scale away.",
  ),
  "soap-dissolve": rx(
    [term("stearateSalt", undefined, "CH₃(CH₂)₁₆COO⁻Na⁺")],
    [term("stearate", undefined, "CH₃(CH₂)₁₆COO⁻"), term("na")],
    "Soap releases a long ion with a greasy tail and a charged head, plus a sodium ion.",
    {
      simplified: true,
      aside: "Bar soap is a mixture of chain lengths. Stearate, the 18-carbon ion, stands in for the family.",
    },
  ),
  "soap-oil": rx(
    [term("hexadecane", undefined, "C₁₆H₃₄(l)")],
    [term("hexadecane", undefined, "C₁₆H₃₄(aq)")],
    "Oil and water barely mix. Almost all of this chain stays in the droplet, not dissolved.",
    {
      reversible: true,
      simplified: true,
      aside: "Hexadecane stands in for cooking oil and skin oil. The arrow is honest about the two places a molecule could be. The droplet wins.",
    },
  ),
  "soap-micelle": rx(
    [term("stearate", 8)],
    [term("micelle")],
    "Above a small concentration, soap ions cluster into a micelle with tails in and heads out.",
    {
      reversible: true,
      simplified: true,
      aside: "Eight ions is a drawing size. Real micelles are larger, and the number is not fixed.",
    },
  ),
  "soap-trap": rx(
    [term("micelle"), term("hexadecane")],
    [term("loadedMicelle")],
    "An oil molecule can sit in the greasy center and rinse away with the micelle.",
    {
      simplified: true,
      aside: "The oil is trapped, not turned into a new substance. Rinsing works because the whole package is water-friendly on the outside.",
    },
  ),
  "bleach-ions": rx(
    [term("naocl", undefined, "NaOCl(aq)")],
    [term("na"), term("ocl", undefined, "OCl⁻(aq)")],
    "Chlorine bleach releases hypochlorite ions. Those ions are not chlorine gas.",
  ),
  "bleach-hocl": rx(
    [term("ocl"), term("h2o")],
    [term("hocl"), term("oh")],
    "Hypochlorite and water trade a proton. Hypochlorous acid is the form that attacks many stains.",
    { reversible: true },
  ),
  "bleach-dye": rx(
    [term("ethene"), term("hocl")],
    [term("chloroethanol")],
    "Hypochlorous acid adds across a double bond and breaks the pattern that made the stain colored.",
    {
      simplified: true,
      aside: "Ethene stands in for a color-making bond in a dye. Real dyes are larger, and bleach can react in more than one way.",
    },
  ),
  "bleach-spent": rx(
    [term("ocl", 2)],
    [term("cl", 2), term("o2")],
    "Hypochlorite can slowly fall apart into chloride and oxygen. It does not become harmless by being mixed with other cleaners.",
    {
      simplified: true,
      aside: "This is one decomposition path. Follow the bottle. Never mix bleach with ammonia, vinegar, or other acids.",
    },
  ),
  "danger-acid": rx(
    [term("ocl"), term("cl"), term("h", 2)],
    [term("cl2", undefined, "Cl₂(g)"), term("h2o")],
    "Acid plus hypochlorite and chloride makes chlorine gas. Never mix bleach with vinegar or other acids.",
    {
      aside: "Bleach already contains chloride. Acids include vinegar, some toilet cleaners, and some drain openers. No amount is safe to mix.",
    },
  ),
  "danger-ammonia": rx(
    [term("nh3"), term("ocl")],
    [term("nh2cl", undefined, "NH₂Cl(g)"), term("oh")],
    "Ammonia plus hypochlorite makes monochloramine, a toxic gas. Never mix bleach with ammonia.",
    {
      aside: "Some glass cleaners contain ammonia even when the word is easy to miss. Do not combine bottles.",
    },
  ),
  "danger-di": rx(
    [term("nh2cl"), term("ocl")],
    [term("nhcl2"), term("oh")],
    "Monochloramine can react further with hypochlorite to make dichloramine, also a dangerous gas.",
  ),
  "danger-tri": rx(
    [term("nhcl2"), term("ocl")],
    [term("ncl3"), term("oh")],
    "A further step makes nitrogen trichloride, another dangerous gas. Do not mix the bottles.",
  ),
  "danger-lung": rx(
    [term("cl2"), term("h2o")],
    [term("hocl"), term("h"), term("cl")],
    "Chlorine reacts with water, including the water in eyes and airways. Leave the room and get help.",
    {
      reversible: true,
      aside: "If a sharp gas appears, get out and into fresh air. Do not stay to find the source, and do not add another chemical to “neutralize” it.",
    },
  ),
  "per-mix": rx(
    [term("h2o2", undefined, "H₂O₂(l)")],
    [term("h2o2", undefined, "H₂O₂(aq)")],
    "The brown bottle holds a little hydrogen peroxide dissolved in a lot of water.",
  ),
  "per-fast": rx(
    [term("h2o2", 2)],
    [term("h2o", 2), term("o2", undefined, "O₂(g)")],
    "Catalase turns hydrogen peroxide into water and oxygen. The oxygen is the fizz.",
    {
      catalyst: "catalase",
      aside: "Your tissue has catalase, and so do many microbes. Fizz does not, by itself, mean the cut was dirty.",
    },
  ),
  "per-slow": rx(
    [term("h2o2", 2)],
    [term("h2o", 2), term("o2")],
    "Without the enzyme the same reaction is slow, which is why old peroxide has less fizz left.",
    { aside: "The bottle is vented or loosely capped because oxygen can build up over a long time." },
  ),
  "per-bubble": rx(
    [term("o2", undefined, "O₂(aq)")],
    [term("o2", undefined, "O₂(g)")],
    "The oxygen leaves as bubbles. The other product, water, just mixes in.",
  ),
  "rust-first": rx(
    [term("fe", 2, "Fe(s)"), term("o2"), term("h2o", 2)],
    [term("feoh2", 2)],
    "Iron, oxygen, and water make iron(II) hydroxide, a pale first product of wet rust.",
  ),
  "rust-anode": rx(
    [term("fe", undefined, "Fe(s)")],
    [term("fe2", undefined, "Fe²⁺(aq)"), term("e", 2)],
    "Each iron atom gives up two electrons. This half happens twice to feed the oxygen side.",
    { suffix: "twice" },
  ),
  "rust-cathode": rx(
    [term("o2"), term("h2o", 2), term("e", 4)],
    [term("oh", 4)],
    "Dissolved oxygen takes four electrons and four protons’ worth of water and becomes hydroxide.",
  ),
  "rust-orange": rx(
    [term("feoh2", 4), term("o2"), term("h2o", 2)],
    [term("feoh3", 4)],
    "More oxygen turns the pale hydroxide into orange-brown iron(III) hydroxide.",
  ),
  "rust-salt": rx(
    [term("nacl")],
    [term("na"), term("cl")],
    "Salt splits into ions that carry charge through the water, so the same rust reaction runs faster.",
    { aside: "Salt is not in the rust formula. It is an electrolyte. Wet salty air is why winter cars rust." },
  ),
  "rust-crust": rx(
    [term("feoh3", 2)],
    [term("rustHydrate"), term("h2o", 2)],
    "The hydroxide can dry toward hydrated iron oxide, the red crust you call rust.",
    { simplified: true, aside: "Real rust is a mixture of oxides and hydroxides. This is one common way to write it." },
  ),
  "sil-tarnish": rx(
    [term("ag", 4, "Ag(s)"), term("h2s", 2), term("o2")],
    [term("ag2s", 2, "Ag₂S(s)"), term("h2o", 2)],
    "Silver, traces of sulfur gas, and oxygen make black silver sulfide, the tarnish.",
  ),
  "sil-soda": rx(
    [term("nahco3")],
    [term("na"), term("hco3")],
    "Baking soda dissolves and makes the hot water a mild base, which helps the foil work.",
  ),
  "sil-base": rx(
    [term("hco3"), term("h2o")],
    [term("h2co3"), term("oh")],
    "Bicarbonate takes a proton from water and leaves a little hydroxide, so the bath is slightly basic.",
    { reversible: true },
  ),
  "sil-oxide": rx(
    [term("al2o3"), term("oh", 2), term("h2o", 3)],
    [term("aloh4", 2)],
    "Base helps dissolve the oxide skin on the foil so bare aluminum can touch the tarnish.",
    {
      simplified: true,
      aside: "This is the strong-base form of the dissolving. A baking-soda bath is only mildly basic, and hot water plus salt also helps the contact.",
    },
  ),
  "sil-redox": rx(
    [term("ag2s", 3), term("al", 2, "Al(s)")],
    [term("ag", 6, "Ag(s)"), term("al2s3")],
    "Aluminum gives electrons to silver sulfide. Silver metal returns, and the sulfur goes with aluminum.",
    {
      simplified: true,
      aside: "Simplified. In the pan, aluminum sulfide reacts further with water. You may notice a sulfur smell. Open a window.",
    },
  ),
  "sil-ag-half": rx(
    [term("ag2s", 3), term("e", 6)],
    [term("ag", 6), term("s2", 3)],
    "Silver sulfide takes electrons and lets go of sulfide. The silver atoms are metal again.",
  ),
  "sil-al-half": rx(
    [term("al", 2)],
    [term("al3", 2), term("e", 6)],
    "Aluminum metal supplies those six electrons and becomes aluminum ions.",
  ),
  "sil-combine": rx(
    [term("al3", 2), term("s2", 3)],
    [term("al2s3")],
    "The aluminum ions and the sulfide ions form aluminum sulfide in this simplified tally.",
    { simplified: true },
  ),
  "tooth-acid": rx(
    [term("hap"), term("h", 14)],
    [term("ca", 10), term("h2po4", 6), term("h2o", 2)],
    "Acid from plaque bacteria dissolves hydroxyapatite, which is how a cavity starts.",
    {
      simplified: true,
      aside: "Enamel is mostly this mineral, with some carbonate and other ions. At cavity acidity the phosphate is mostly H₂PO₄⁻.",
    },
  ),
  "tooth-naf": rx(
    [term("naf")],
    [term("na"), term("f", undefined, "F⁻(aq)")],
    "Fluoride toothpaste releases a low dose of fluoride ions onto the tooth surface.",
  ),
  "tooth-rebuild": rx(
    [term("ca", 10), term("po4", 6), term("f", 2)],
    [term("fap")],
    "Calcium, phosphate, and fluoride can build fluorapatite, a less soluble enamel mineral.",
    {
      simplified: true,
      aside: "Saliva is more complicated than these three ions. Fluoride helps repair. It does not make teeth immune to sugar and acid.",
    },
  ),
  "tooth-swap": rx(
    [term("hap"), term("f", 2)],
    [term("fap"), term("oh", 2)],
    "Fluoride can also take the hydroxide seats in the crystal. This solid swap is a simplified picture.",
    {
      simplified: true,
      aside: "In the mouth, much of the benefit is new mineral forming from saliva, not only a swap inside a finished crystal.",
    },
  ),
  "anti-split": rx(
    [term("al2oh5cl")],
    [term("al2oh5"), term("cl")],
    "An antiperspirant aluminum salt lets go of chloride in sweat. The real mixture is more complicated.",
    {
      simplified: true,
      aside: "Products use aluminum chlorohydrates, often written near Al₂(OH)₅Cl, not a single pure crystal.",
    },
  ),
  "anti-water": rx(
    [term("alHex")],
    [term("alHydroxo"), term("h")],
    "A dissolved aluminum ion gives up H⁺ to water and starts toward a hydroxide.",
    { reversible: true, simplified: true },
  ),
  "anti-gel": rx(
    [term("alHex"), term("oh", 3)],
    [term("aloh3", undefined, "Al(OH)₃(s)"), term("h2o", 6)],
    "Aluminum hydroxide forms a gel that, with proteins, plugs the upper sweat duct.",
    {
      simplified: true,
      aside: "The gland still makes sweat. The plug slows it from reaching the skin. The effect wears off as the duct lining sheds.",
    },
  ),
  "anti-wear": rx(
    [term("aloh3"), term("h", 3)],
    [term("al3"), term("h2o", 3)],
    "Acid can dissolve the hydroxide again, which is one reason you reapply.",
    { simplified: true },
  ),
  "hair-base": rx(
    [term("nh3"), term("h2o")],
    [term("nh4"), term("oh")],
    "Ammonia makes the mixture alkaline, which swells the hair so small dye molecules can enter.",
    {
      reversible: true,
      aside: "Follow the package. Ammonia irritates eyes and lungs. Do not mix a hair-color kit with bleach from the laundry.",
    },
  ),
  "hair-melanin": rx(
    [term("dhi"), term("h2o2")],
    [term("iq"), term("h2o", 2)],
    "Peroxide oxidizes a melanin building block so it absorbs less visible light. Hair looks lighter.",
    {
      simplified: true,
      aside: "Real melanin is a polymer. Bleach lightens it. It does not delete a single neat molecule and stop.",
    },
  ),
  "hair-ppd": rx(
    [term("ppd"), term("h2o2")],
    [term("qdi"), term("h2o", 2)],
    "Peroxide oxidizes a small dye precursor so it can join with a coupler inside the hair.",
    {
      simplified: true,
      aside: "p-Phenylenediamine is a common allergen. Do a patch test if the package says to, and do not use hair dye on brows or lashes.",
    },
  ),
  "hair-couple": rx(
    [term("qdi"), term("resorcinol")],
    [term("dyeJoin"), term("h", 2), term("e", 2)],
    "The oxidized precursor and a coupler join into a larger colored molecule that stays in the hair.",
    {
      simplified: true,
      aside: "The product formula is a stand-in. The protons and electrons are taken up by the rest of the mixture. Shades use different couplers.",
    },
  ),
  "sun-absorb": rx(
    [term("oxy"), term("photon")],
    [term("oxyStar")],
    "An organic filter absorbs an ultraviolet photon. The atoms do not rearrange.",
  ),
  "sun-heat": rx(
    [term("oxyStar")],
    [term("oxy")],
    "The molecule drops back down and releases that energy mostly as heat, then it can absorb again.",
    { aside: "The heat from one molecule is tiny. What you feel as warmth in the sun is mostly the light the skin itself absorbs." },
  ),
  "sun-avo": rx(
    [term("avo"), term("photon")],
    [term("avoStar")],
    "Avobenzone does the same job especially for UVA, the longer ultraviolet wavelengths.",
    {
      aside: "UV can also break avobenzone down. Formulas add stabilizers. This line is the absorption you want, not the breakdown.",
    },
  ),
  "sun-zno": rx(
    [term("zno", undefined, "ZnO(s)"), term("h2o")],
    [term("zn"), term("oh", 2)],
    "Zinc oxide mostly stays a solid. A little can dissolve, but the equilibrium favors the particle on the skin.",
    {
      reversible: true,
      aside: "The particle absorbs and scatters ultraviolet light. “Mineral” means a solid compound, not that it is free of chemistry.",
    },
  ),
  "sun-tio2": rx(
    [term("tio2", undefined, "TiO₂(s)"), term("photon")],
    [term("tio2Star")],
    "Titanium dioxide also catches ultraviolet light and stays titanium dioxide.",
  ),
  "stove-burn": rx(
    [term("ch4"), term("o2", 2)],
    [term("co2"), term("h2o", 2, "H₂O(g)")],
    "Methane and oxygen make carbon dioxide and water vapor. A blue flame is this complete burn.",
  ),
  "stove-soot": rx(
    [term("ch4"), term("o2")],
    [term("c", undefined, "C(s)"), term("h2o", 2)],
    "With too little air, carbon can be left as soot. A yellow flame often means this incomplete path.",
    {
      simplified: true,
      aside: "Real starved flames make a mixture of soot, carbon monoxide, hydrogen, and carbon dioxide. This line is the soot extreme.",
    },
  ),
  "stove-no": rx(
    [term("n2"), term("o2")],
    [term("no", 2)],
    "At flame temperature a little nitrogen from air combines with oxygen.",
    { reversible: true, aside: "This is a minor side reaction, not the fuel. It still adds a bit of nitrogen oxide to indoor air." },
  ),
  "stove-no2": rx(
    [term("no", 2), term("o2")],
    [term("no2", 2)],
    "Nitric oxide can pick up more oxygen and become nitrogen dioxide.",
  ),
  "stove-co": rx(
    [term("ch4", 2), term("o2", 3)],
    [term("co", 2), term("h2o", 4)],
    "With less oxygen, methane can make carbon monoxide instead of carbon dioxide.",
  ),
  "co-make": rx(
    [term("ch4", 2), term("o2", 3)],
    [term("co", 2, "CO(g)"), term("h2o", 4)],
    "A starved flame makes carbon monoxide, which you cannot see or smell.",
  ),
  "co-burn": rx(
    [term("co", 2), term("o2")],
    [term("co2", 2)],
    "Carbon monoxide can still burn to carbon dioxide. In a room it may not. It can build up instead.",
  ),
  "co-carry": rx(
    [term("hb"), term("o2")],
    [term("hbo2")],
    "Hemoglobin’s iron site binds oxygen. That is how blood carries it.",
    {
      reversible: true,
      simplified: true,
      aside: "Hb here is one binding site, not the formula of the whole protein. A hemoglobin molecule has four sites.",
    },
  ),
  "co-bind": rx(
    [term("hbo2"), term("co")],
    [term("hbco"), term("o2")],
    "Carbon monoxide takes that seat and holds it far more tightly than oxygen does.",
    {
      reversible: true,
      simplified: true,
      aside: "The affinity is on the order of 200 times that of oxygen. The equilibrium lies toward HbCO. This is why a detector matters more than your nose.",
    },
  ),
  "co-sensor": rx(
    [term("co"), term("h2o")],
    [term("co2"), term("h", 2), term("e", 2)],
    "An electrochemical detector oxidizes carbon monoxide and sounds an alarm. You still cannot smell the gas.",
    {
      simplified: true,
      aside: "This is the sensor’s anode reaction, simplified. If it alarms, go outside and call for help. Do not hunt the source indoors.",
    },
  ),
  "bat-anode": rx(
    [term("znMetal", undefined, "Zn(s)"), term("oh", 2)],
    [term("znoSolid"), term("h2o"), term("e", 2)],
    "Zinc metal gives up electrons at the anode and becomes zinc oxide in this textbook line.",
    {
      simplified: true,
      aside: "Real alkaline cells also make dissolved zincate ions, Zn(OH)₄²⁻. The electron count is the part that powers the device.",
    },
  ),
  "bat-cathode": rx(
    [term("mno2", 2), term("h2o"), term("e", 2)],
    [term("mn2o3"), term("oh", 2)],
    "Manganese dioxide takes those electrons at the cathode and produces the hydroxide the anode uses.",
    {
      simplified: true,
      aside: "The manganese product in a real cell is a mixture, often written with MnOOH as well as Mn₂O₃.",
    },
  ),
  "bat-overall": rx(
    [term("znMetal"), term("mno2", 2)],
    [term("znoSolid"), term("mn2o3")],
    "Add the halves and the hydroxide cancels. Zinc and manganese dioxide are the stored reactants.",
    { simplified: true },
  ),
  "bat-electrolyte": rx(
    [term("koh")],
    [term("k"), term("oh")],
    "Potassium hydroxide supplies the ions that carry charge inside the can. It is not the fuel.",
    { aside: "Do not open a battery. Potassium hydroxide burns skin and eyes. Recycle spent cells." },
  ),
  "warm-air": rx(
    [term("o2", undefined, "O₂(g)")],
    [term("o2", undefined, "O₂ in the pouch")],
    "Opening the pouch lets oxygen reach the iron powder. Until then the reaction waits.",
  ),
  "warm-dry": rx(
    [term("fe", 4), term("o2", 3)],
    [term("fe2o3", 2)],
    "Iron and oxygen make iron oxide and give off heat. This dry equation is the simplified energy tally.",
    {
      simplified: true,
      aside: "From the elements, this equation releases about 1650 kJ as written, because each mole of Fe₂O₃ is about 824 kJ downhill. A pouch releases that slowly.",
    },
  ),
  "warm-wet": rx(
    [term("fe", 4), term("o2", 3), term("h2o", 6)],
    [term("feoh3", 4)],
    "The pouch is moist, so the chemistry is close to fast rust: iron, oxygen, and water.",
  ),
  "warm-salt": rx(
    [term("nacl")],
    [term("na"), term("cl")],
    "Salt in the pouch lets ions move, so the iron oxidizes faster than a dry nail would.",
    { aside: "Carbon spreads the oxygen. Vermiculite holds water. The fuel is the iron, not the salt." },
  ),
  "ice-dissolve": rx(
    [term("nh4no3", undefined, "NH₄NO₃(s)")],
    [term("nh4", undefined, "NH₄⁺(aq)"), term("no3", undefined, "NO₃⁻(aq)")],
    "When the pack breaks, ammonium nitrate dissolves into ammonium and nitrate ions.",
  ),
  "ice-heat": rel(
    [{ id: "heatQ" }, { text: "=" }, { id: "moles" }, { text: "·" }, { id: "deltaH" }],
    "Heat absorbed equals the amount dissolved times the heat per mole. Positive means the pack gets cold.",
    `0.25 × ${NH4NO3_SOLUTION_KJ} = ${ICE_PACK_EXAMPLE_KJ.toFixed(2)} kJ`,
    () => {
      const q = solutionHeatKJ(0.25, NH4NO3_SOLUTION_KJ);
      if (Math.abs(q - 6.425) > 1e-9) return `ice pack heat ${q}`;
      if (NH4NO3_SOLUTION_KJ !== 25.7) return "ΔH";
      return null;
    },
    {
      aside: "About 0.25 mole, near 20 grams, absorbs about 6.4 kJ. That is enough to chill a small pack. Use a sealed commercial pack. Do not mix this salt yourself.",
    },
  ),
  "ice-eq": rx(
    [term("nh4no3", undefined, "NH₄NO₃(s)")],
    [term("nh4"), term("no3")],
    "With enough water the ions stay dissolved. The cold is the dissolving, not a freezer reaction.",
    {
      reversible: true,
      aside: "This is not a medical device beyond what the package says. Do not eat the contents. Do not combine the salt with fuels.",
    },
  ),
  "glow-fuel": rx(
    [term("dpo"), term("h2o2")],
    [term("phenol", 2), term("diox")],
    "After you snap the stick, peroxide reacts with the oxalate and makes a short-lived high-energy molecule.",
    {
      simplified: true,
      catalyst: "salicylate",
      aside: "Simplified. The catalyst speeds this and is not used up. The liquid can irritate skin. Do not cut the stick open.",
    },
  ),
  "glow-dye": rx(
    [term("diox"), term("dpa")],
    [term("co2", 2), term("dpaStar")],
    "That molecule falls apart into carbon dioxide and hands the energy to the dye.",
    { simplified: true },
  ),
  "glow-light": rx(
    [term("dpaStar")],
    [term("dpa"), term("photon")],
    "The dye releases the energy as visible light and is ready to be excited again.",
  ),
  "glow-color": rx(
    [term("diox"), term("rubrene")],
    [term("co2", 2), term("rubreneStar")],
    "Swap the dye and the light changes color. The peroxide reaction is still the power source.",
    { simplified: true, aside: "Rubrene can glow yellow-orange. Manufacturers pick the dye. Warmer sticks glow brighter and die sooner." },
  ),
  "road-melt": rx(
    [term("h2o", undefined, "H₂O(s)")],
    [term("h2o", undefined, "H₂O(l)")],
    "Ice and liquid water trade molecules. Salt in the liquid makes it harder for ice to grow back.",
    { reversible: true },
  ),
  "road-salt": rx(
    [term("nacl")],
    [term("na"), term("cl")],
    "Road salt dissolves into two ions. Those ions are what depress the freezing point.",
  ),
  "road-drop": rel(
    [{ id: "deltaTf" }, { text: "=" }, { id: "iFactor" }, { text: "·" }, { id: "kf" }, { text: "·" }, { id: "molality" }],
    "The freezing-point drop equals the ion count, times water’s constant, times the molality.",
    `${NACL_IDEAL_I} × ${WATER_KF} × ${EXAMPLE_MOLALITY} = ${FREEZING_EXAMPLE_C.toFixed(3)} °C`,
    () => {
      const drop = freezingPointDrop(NACL_IDEAL_I, WATER_KF, EXAMPLE_MOLALITY);
      if (Math.abs(drop - 0.372) > 1e-9) return `freezing example ${drop}`;
      if (WATER_KF !== 1.86) return "Kf";
      return null;
    },
    {
      aside: "That example is only 0.372 °C for a teaspoon in a liter. A sidewalk uses saltier brine, where this dilute formula is only a start. The coldest sodium-chloride brine can stay liquid is about −21 °C.",
    },
  ),
  "road-cacl": rx(
    [term("cacl2")],
    [term("ca"), term("cl", 2)],
    "Calcium chloride splits into three ions, so each formula unit counts more than table salt.",
    { aside: "It also gives off heat as it dissolves. Chloride salts can hurt plants, paws, concrete, and waterways." },
  ),
  "micro-pet": rx(
    [term("tpa"), term("eg")],
    [term("pet"), term("h2o", 2)],
    "PET, the plastic in many bottles and fleeces, is a chain of this repeating unit.",
    {
      simplified: true,
      aside: "One unit is shown. Industrial PET is often made from a dimethyl ester rather than the free acid. The chain is the same idea.",
    },
  ),
  "micro-nylon": rx(
    [term("adipic"), term("hmda")],
    [term("nylon"), term("h2o", 2)],
    "Nylon-6,6 is a different chain, built from an acid and a diamine, and it sheds fibers too.",
    { simplified: true },
  ),
  "micro-shed": rx(
    [term("petDimer")],
    [term("pet", 2)],
    "Flexing and washing break fibers into smaller pieces. The repeating unit does not change.",
    {
      simplified: true,
      aside: "A dimer stands in for a long chain. Shedding is mostly physical breakage, not the plastic dissolving.",
    },
  ),
  "micro-water": rx(
    [term("pet"), term("h2o", 2)],
    [term("tpa"), term("eg")],
    "Water can slowly cut the ester links. In a cold wash or the ocean this is extremely slow.",
    {
      simplified: true,
      aside: "This is the reverse of the simplified making reaction. Most laundry microplastic is fiber fragments, not dissolved monomers.",
    },
  ),
};

function defineLines<T extends Record<string, Omit<ReactionLine, "id"> | Omit<RelationLine, "id">>>(lines: T) {
  const out = {} as { [K in keyof T]: Line };
  for (const key of Object.keys(lines) as (keyof T)[]) {
    out[key] = { ...lines[key], id: String(key) } as Line;
  }
  return out;
}

export const LINES = defineLines(RAW_LINES);
export type LineId = keyof typeof LINES;

export function lineById(id: LineId): Line {
  return LINES[id];
}

export interface Tally {
  atoms: Record<ElementSymbol, number>;
  charge: number;
}

export function tally(terms: TermRef[]): Tally {
  const atoms = Object.fromEntries(ELEMENTS.map((element) => [element, 0])) as Record<ElementSymbol, number>;
  let charge = 0;
  for (const termRef of terms) {
    const species = SPECIES[termRef.id];
    const count = termRef.count ?? 1;
    if (!Number.isInteger(count) || count < 1) {
      throw new Error(`Bad count for ${termRef.id}`);
    }
    for (const element of ELEMENTS) {
      atoms[element] += (species.atoms[element] ?? 0) * count;
    }
    charge += species.charge * count;
  }
  return { atoms, charge };
}

export function lineProblems(line: Line): string[] {
  const problems: string[] = [];
  if (!line.reading.trim() || line.reading.includes("\n") || !line.reading.endsWith(".")) {
    problems.push(`${line.id} needs a one-sentence reading`);
  }
  if (line.reading.length > 180) problems.push(`${line.id} reading is too long`);
  if (line.kind === "relation") {
    const issue = line.check();
    if (issue) problems.push(`${line.id} ${issue}`);
    if (!line.example.includes("=")) problems.push(`${line.id} example`);
    return problems;
  }
  let left: Tally;
  let right: Tally;
  try {
    left = tally(line.left);
    right = tally(line.right);
  } catch (error) {
    return [`${line.id}: ${error instanceof Error ? error.message : "tally failed"}`];
  }
  for (const element of ELEMENTS) {
    if (left.atoms[element] !== right.atoms[element]) {
      problems.push(`${line.id} ${element}: ${left.atoms[element]} ≠ ${right.atoms[element]}`);
    }
  }
  if (left.charge !== right.charge) {
    problems.push(`${line.id} charge: ${left.charge} ≠ ${right.charge}`);
  }
  return problems;
}

export function explainTerm(id: string): { label: string; plain: string } | undefined {
  if (Object.prototype.hasOwnProperty.call(SPECIES, id)) {
    const species = SPECIES[id as SpeciesId];
    return { label: species.label, plain: species.plain };
  }
  if (Object.prototype.hasOwnProperty.call(SYMBOLS, id)) {
    const symbol = SYMBOLS[id as SymbolId];
    return symbol;
  }
  return undefined;
}
