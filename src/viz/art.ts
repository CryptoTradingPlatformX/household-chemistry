import type { TopicArt } from "./stage";

export const ART: Record<string, TopicArt> = {
  "baking-soda-vinegar": {
    macro: "beaker",
    steps: [
      { label: "Vinegar", mols: ["acetic", "h2o", "h2o", "acetic"], mood: "neutral" },
      { label: "Baking soda dissolves", mols: ["nacl", "na", "co2", "h2o"], morph: ["na", "co2", "h2o", "h2o"] },
      { label: "The fizz reaction", mols: ["acetic", "co2", "h2o", "na"], bubbles: true, mood: "heat" },
      { label: "Gas leaving", mols: ["co2", "co2", "h2o", "na"], bubbles: true },
    ],
  },
  "bread-rising": {
    macro: "loaf",
    steps: [
      { label: "Starch to sugar", mols: ["starch", "h2o", "glucose"], morph: ["glucose", "h2o", "glucose"] },
      { label: "Fermentation", mols: ["glucose", "ethanol", "co2"], morph: ["ethanol", "co2", "co2"], bubbles: true },
      { label: "Bubbles in dough", mols: ["co2", "co2", "h2o"], bubbles: true },
      { label: "Alcohol evaporates", mols: ["ethanol", "co2", "h2o"], mood: "heat" },
    ],
  },
  maillard: {
    macro: "skillet",
    steps: [
      { label: "Sugar meets amino acid", mols: ["glucose", "lysine", "h2o"], morph: ["glycosyl", "h2o"], mood: "heat" },
      { label: "Rearrangement", mols: ["glycosyl", "h2o"], mood: "heat" },
      { label: "Aroma and brown mix", mols: ["acetaldehyde", "co2", "alanine"], morph: ["acetaldehyde", "co2"], mood: "heat" },
    ],
  },
  caramel: {
    macro: "saucepan",
    steps: [
      { label: "Sugar splits", mols: ["sucrose", "h2o", "glucose", "fructose"], mood: "heat" },
      { label: "Water leaves", mols: ["glucose", "hmf", "h2o"], morph: ["hmf", "h2o", "h2o"], mood: "heat" },
      { label: "Color deepens", mols: ["hmf", "dye", "h2o"], mood: "heat" },
      { label: "Burned sugar", mols: ["c", "c", "h2o", "co2"], mood: "heat" },
    ],
  },
  "fruit-browning": {
    macro: "apple",
    steps: [
      { label: "Oxygen arrives", mols: ["o2", "h2o", "o2"] },
      { label: "Enzyme at work", mols: ["o2", "catechol"], morph: ["quinone", "h2o"] },
      { label: "Brown pigments", mols: ["quinone", "quinone"] },
      { label: "Vitamin C", mols: ["ascorbic", "quinone"], morph: ["catechol", "h2o"] },
      { label: "Citric acid", mols: ["citric", "h", "h2o"] },
    ],
  },
  "boiling-egg": {
    macro: "egg",
    steps: [
      { label: "Peptide chain", mols: ["h2o", "n2", "h2o"], well: "chain", folded: true },
      { label: "Unfolding", mols: ["h2o", "h2o"], well: "chain", folded: false, mood: "heat" },
      { label: "Sulfur clips", mols: ["h2s", "s2", "h"], mood: "heat" },
      { label: "Chain stays intact", mols: ["h2o", "n2", "h2o"], well: "chain", folded: false },
    ],
  },
  "boiling-point": {
    macro: "pot",
    steps: [
      { label: "Salt splits", mols: ["nacl", "na", "cl"], morph: ["na", "cl", "h2o"] },
      { label: "A tenth of a degree", mols: ["na", "cl", "h2o", "h2o"], mood: "heat" },
      { label: "Sugar stays whole", mols: ["sucrose", "h2o", "sucrose"] },
      { label: "Water boiling", mols: ["h2o", "h2o", "h2o"], bubbles: true, mood: "heat" },
    ],
  },
  "kettle-scale": {
    macro: "kettle",
    steps: [
      { label: "Hard-water ions", mols: ["ca", "co2", "h2o"] },
      { label: "Scale forms", mols: ["caco3", "co2", "h2o"], morph: ["caco3", "co2", "caco3"], mood: "heat" },
      { label: "Vinegar dissolves it", mols: ["acetic", "caco3", "co2"], bubbles: true },
      { label: "Rinse the ions", mols: ["ca", "acetic", "h2o"] },
    ],
  },
  soap: {
    macro: "basin",
    steps: [
      { label: "Soap ion", mols: ["soap", "na", "h2o"] },
      { label: "Oil stays a droplet", mols: ["oil", "h2o", "h2o", "oil"] },
      { label: "Micelle", mols: ["soap", "h2o"], well: "micelle" },
      { label: "Oil inside", mols: ["oil", "soap"], well: "micelle" },
    ],
  },
  "bleach-stains": {
    macro: "cloth",
    steps: [
      { label: "Hypochlorite", mols: ["ocl", "na", "h2o"] },
      { label: "Hypochlorous acid", mols: ["hocl", "oh", "h2o"] },
      { label: "Color bond changes", mols: ["dye", "hocl"], morph: ["hocl", "cl", "h2o"] },
      { label: "Do not mix cleaners", mols: ["ocl", "cl", "o2"], mood: "warn" },
    ],
  },
  "never-mix-bleach": {
    macro: "warning",
    steps: [
      { label: "Chlorine gas", mols: ["cl2", "hocl", "h"], mood: "warn", well: "warn" },
      { label: "Chloramine", mols: ["nh3", "cl2"], mood: "warn", well: "warn" },
      { label: "Further chloramines", mols: ["cl2", "n2"], mood: "warn", well: "warn" },
      { label: "Leave the room", mols: ["cl2", "h2o"], mood: "warn", well: "warn" },
    ],
  },
  peroxide: {
    macro: "pad",
    steps: [
      { label: "H₂O₂ in water", mols: ["h2o2", "h2o", "h2o"] },
      { label: "Catalase", mols: ["h2o2", "o2", "h2o"], morph: ["o2", "h2o", "h2o"], bubbles: true },
      { label: "The slow version", mols: ["h2o2", "o2", "h2o"], bubbles: true },
      { label: "Oxygen bubbles", mols: ["o2", "h2o", "o2"], bubbles: true },
    ],
  },
  rust: {
    macro: "nail",
    steps: [
      { label: "First hydroxide", mols: ["fe", "o2", "h2o"], morph: ["rust", "h2o", "fe"] },
      { label: "Electrons move", mols: ["fe", "e", "o2", "oh"], morph: ["fe2", "oh", "e", "h2o"] },
      { label: "Orange rust", mols: ["rust", "o2", "h2o"], mood: "heat" },
      { label: "Salt carries charge", mols: ["nacl", "na", "cl", "fe"] },
      { label: "The crust", mols: ["rust", "rust", "h2o"] },
    ],
  },
  "silver-tarnish": {
    macro: "spoon",
    steps: [
      { label: "Silver sulfide", mols: ["ag2s", "h2s", "o2"] },
      { label: "Baking soda bath", mols: ["nacl", "oh", "h2o"], mood: "heat" },
      { label: "Oxide on the foil", mols: ["al", "o2", "oh"] },
      { label: "Silver returns", mols: ["ag2s", "al"], morph: ["ag", "ag", "s2"] },
      { label: "Electrons through the touch", mols: ["e", "ag", "al", "s2"] },
    ],
  },
  fluoride: {
    macro: "tooth",
    steps: [
      { label: "Acid on enamel", mols: ["ca", "h", "h2o"] },
      { label: "Fluoride ions", mols: ["f", "na", "h2o"] },
      { label: "Fluorapatite", mols: ["ca", "f", "o2"] },
      { label: "A hydroxide swap", mols: ["oh", "f", "ca"] },
    ],
  },
  antiperspirant: {
    macro: "duct",
    steps: [
      { label: "Aluminum salt", mols: ["al", "cl", "h2o"] },
      { label: "Water and protons", mols: ["al", "h2o", "h"] },
      { label: "Hydroxide gel", mols: ["al", "oh", "h2o"], well: "micelle" },
      { label: "The plug can dissolve", mols: ["al", "h", "h2o"] },
    ],
  },
  "hair-color": {
    macro: "hair",
    steps: [
      { label: "Alkaline swell", mols: ["nh3", "oh", "h2o"] },
      { label: "Melanin lightens", mols: ["dhi", "h2o2"], morph: ["melanin", "h2o", "o2"] },
      { label: "Dye precursor", mols: ["dye", "h2o2", "n2"] },
      { label: "Color built inside", mols: ["dye", "dye", "h2o"], mood: "glow" },
    ],
  },
  sunscreen: {
    macro: "skin",
    steps: [
      { label: "Absorbing UV", mols: ["oxy", "photon"], mood: "uv" },
      { label: "Energy as heat", mols: ["oxy", "photon"], morph: ["oxy"], mood: "heat" },
      { label: "UVA filter", mols: ["oxy", "photon"], mood: "uv" },
      { label: "Mineral particles", mols: ["zno", "tio2", "photon"], mood: "uv" },
    ],
  },
  "gas-flame": {
    macro: "burner",
    steps: [
      { label: "Complete burn", mols: ["ch4", "o2", "co2", "h2o"], morph: ["co2", "h2o", "h2o", "co2"], mood: "heat" },
      { label: "Soot", mols: ["ch4", "c", "h2o"], mood: "heat" },
      { label: "A little NOx", mols: ["n2", "o2", "no", "no2"] },
      { label: "Carbon monoxide", mols: ["ch4", "co", "h2o"], mood: "warn" },
    ],
  },
  "carbon-monoxide": {
    macro: "alarm",
    steps: [
      { label: "CO forming", mols: ["ch4", "co", "h2o"], mood: "warn" },
      { label: "CO can still burn", mols: ["co", "o2", "co2"] },
      { label: "Hemoglobin", mols: ["hb", "o2", "co"], morph: ["hb", "co", "o2"], mood: "warn" },
      { label: "Detector", mols: ["co", "co2", "e"], mood: "warn" },
    ],
  },
  "alkaline-battery": {
    macro: "battery",
    steps: [
      { label: "Zinc anode", mols: ["zn", "e", "oh", "zno"] },
      { label: "Manganese cathode", mols: ["rust", "e", "oh", "h2o"] },
      { label: "Overall", mols: ["zn", "zno", "rust"] },
      { label: "Electrolyte", mols: ["k", "oh", "h2o"], mood: "warn" },
    ],
  },
  "hand-warmer": {
    macro: "pouch",
    steps: [
      { label: "Oxygen in", mols: ["o2", "fe", "o2"] },
      { label: "Heat from iron", mols: ["fe", "o2", "rust"], morph: ["rust", "rust", "o2"], mood: "heat" },
      { label: "Moist rust", mols: ["fe", "h2o", "o2", "rust"], mood: "heat" },
      { label: "Salt speeds it", mols: ["nacl", "na", "cl", "fe"], mood: "heat" },
    ],
  },
  "ice-pack": {
    macro: "coldpack",
    steps: [
      { label: "Salt dissolving", mols: ["nh4", "h2o", "n2"], morph: ["nh4", "h2o", "no"], mood: "cold" },
      { label: "Heat goes in", mols: ["nh4", "h2o", "no"], mood: "cold" },
      { label: "Ions stay dissolved", mols: ["nh4", "h2o", "no", "h2o"], mood: "cold" },
    ],
  },
  "glow-stick": {
    macro: "tube",
    steps: [
      { label: "Peroxide meets oxalate", mols: ["h2o2", "dye", "co2"], mood: "glow" },
      { label: "Dye takes the energy", mols: ["dye", "co2", "photon"], mood: "glow" },
      { label: "Light out", mols: ["photon", "dye", "photon"], mood: "glow" },
      { label: "Color is the dye", mols: ["dye", "photon", "co2"], mood: "glow" },
    ],
  },
  "road-salt": {
    macro: "ice",
    steps: [
      { label: "Ice and water", mols: ["h2o", "h2o", "h2o"], mood: "cold" },
      { label: "Salt ions", mols: ["nacl", "na", "cl"], morph: ["na", "cl", "h2o"], mood: "cold" },
      { label: "Freezing point", mols: ["na", "cl", "h2o"], mood: "cold" },
      { label: "Calcium chloride", mols: ["ca", "cl", "cl"], mood: "cold" },
    ],
  },
  microplastics: {
    macro: "fiber",
    steps: [
      { label: "PET unit", mols: ["pet", "h2o", "pet"] },
      { label: "Nylon unit", mols: ["nylon", "h2o", "n2"] },
      { label: "A piece breaks off", mols: ["pet", "pet", "nylon"] },
      { label: "Very slow hydrolysis", mols: ["pet", "h2o", "acetic"] },
    ],
  },
};
