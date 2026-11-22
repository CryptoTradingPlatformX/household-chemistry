import type { Topic } from "./types";
import { NACL_EUTECTIC_C } from "../lib/colligative";

export const HOUSE: readonly Topic[] = [
  {
    id: "gas-flame",
    room: "house",
    title: "A gas flame",
    hook: "A blue flame is methane plus enough oxygen making carbon dioxide and water. Yellow, sooty, or lazy flames are a warning, not a mood.",
    signature: "CH₄ + 2 O₂ → CO₂ + 2 H₂O",
    steps: [
      {
        title: "The complete burn",
        caption:
          "Household natural gas is mostly methane, CH₄. Two oxygen molecules are enough to turn it into one carbon dioxide and two waters. The water leaves as vapor, which is why a cold pot can fog. A blue flame means this path is winning. The flame is hot because the products sit lower in chemical energy than methane plus oxygen. The heat is the point of the stove.",
        equations: ["stove-burn"],
      },
      {
        title: "Yellow often means soot",
        caption:
          "If air is short, carbon can be left behind as soot. The simplified line gives methane only one oxygen and writes the carbon as a solid. A yellow or orange flame, or black on the bottom of a pot, is that incomplete path showing itself. Real starved flames also make carbon monoxide and other fragments. Open the air shutter if the appliance is meant to be adjusted, or have it serviced. Do not “fix” a stove by blocking vents.",
        equations: ["stove-soot"],
      },
      {
        title: "A little of the air reacts too",
        caption:
          "Air is mostly nitrogen. At flame temperature a little N₂ and O₂ become nitric oxide, and that can oxidize further to nitrogen dioxide. These are minor products next to CO₂ and water, and they are still a reason to run a fan. The stove is not an outdoor grill. The room is small.",
        equations: ["stove-no", "stove-no2"],
      },
      {
        title: "Too little air makes CO",
        caption:
          "Give two methanes only three oxygens and the carbon can come out as carbon monoxide instead of carbon dioxide. CO is colorless and odorless. A blue flame is not a guarantee if the appliance is cracked, vented wrong, or used with a blocked flue. The next page is the danger. A stove is for cooking with the fan on, not for heating a closed room.",
        equations: ["stove-co"],
      },
    ],
    practice: {
      title: "Blue flame, moving air",
      safe: true,
      body: "Use burners with air, and use the range hood or a window. If flames are mostly yellow, the pilot smells like gas when it should not, or anyone gets headaches in a closed kitchen, stop using the appliance and have it checked. Do not seal a room to “keep the heat.”",
    },
    sources: [
      {
        title: "U.S. EPA, combustion pollutants",
        href: "https://www.epa.gov/indoor-air-quality-iaq/sources-combustion-products",
        detail: "Gas stoves emit nitrogen dioxide, carbon monoxide, and fine particles. Ventilation cuts the amount that stays in the room.",
      },
    ],
    related: { topicId: "carbon-monoxide", label: "Carbon monoxide, the gas you cannot smell" },
  },
  {
    id: "carbon-monoxide",
    room: "house",
    title: "Carbon monoxide",
    hook: "CO from a starved flame binds to hemoglobin far more tightly than oxygen. You cannot smell it. A detector can.",
    signature: "HbO₂ + CO ⇌ HbCO + O₂",
    danger: true,
    steps: [
      {
        title: "Incomplete combustion",
        caption:
          "When fuel gets too little oxygen, carbon monoxide forms along with water. Furnaces, water heaters, generators, charcoal grills, and car exhaust do this, not only stoves. The gas has no useful warning smell. Headache, dizziness, and nausea can be the symptoms, and they look like the flu. Do not wait for a dramatic clue.",
        equations: ["co-make"],
      },
      {
        title: "It can still burn",
        caption:
          "Two carbon monoxides plus one oxygen become two carbon dioxides. In an engine or a flare that reaction is wanted. In a bedroom it does not conveniently finish. CO can accumulate. Cracking a window is not a detector, and it is not a reason to run a generator indoors.",
        equations: ["co-burn"],
      },
      {
        title: "It takes oxygen’s seat",
        caption:
          "Hemoglobin carries oxygen on iron sites. The letters Hb here mean one site, not the formula of the whole protein. Oxygen binds reversibly, which is how tissues get it back. Carbon monoxide binds the same kind of site much more tightly, on the order of 200 times, and it also makes the remaining oxygen harder to unload. The line is the displacement. People get sick because blood is busy holding CO.",
        equations: ["co-carry", "co-bind"],
      },
      {
        title: "A detector is the nose you don’t have",
        caption:
          "Household CO alarms oxidize carbon monoxide on an electrode and make a current. The simplified anode line is CO plus water becoming CO₂, protons, and electrons. You still cannot smell that chemistry. If the alarm sounds, go outside and call for help from there. Do not look for the source in the house. This is not a drill to reproduce.",
        equations: ["co-sensor"],
      },
    ],
    practice: {
      title: "Do not make this gas",
      safe: false,
      body: "Install CO alarms outside sleeping areas, test them, and replace them when they expire. Never run a generator, grill, or car in a closed garage or inside a house. If an alarm sounds or several people feel sick at once, leave and get help. There is no home experiment on this page.",
    },
    sources: [
      {
        title: "CDC, about carbon monoxide",
        href: "https://www.cdc.gov/carbon-monoxide/about/index.html",
        detail: "CO is colorless and odorless. Sources include furnaces, generators, and vehicles. CDC’s advice is a detector and getting out if one alarms.",
      },
      {
        title: "U.S. EPA, carbon monoxide’s impact on indoor air",
        href: "https://www.epa.gov/indoor-air-quality-iaq/carbon-monoxides-impact-indoor-air-quality",
        detail: "CO binds hemoglobin and reduces oxygen delivery. Indoor combustion appliances are a main household source.",
      },
      {
        title: "CPSC, carbon monoxide information",
        href: "https://www.cpsc.gov/Safety-Education/Safety-Education-Centers/Carbon-Monoxide-Information-Center",
        detail: "The consumer-safety page on alarms, generators, and why CO incidents happen in homes.",
      },
    ],
  },
  {
    id: "alkaline-battery",
    room: "house",
    title: "An alkaline battery",
    hook: "Zinc metal and manganese dioxide trade electrons through a wire. Potassium hydroxide inside only carries charge. Do not open the can.",
    signature: "Zn + 2 MnO₂ → ZnO + Mn₂O₃",
    steps: [
      {
        title: "Zinc lets electrons go",
        caption:
          "At the anode, zinc metal gives up electrons. In the textbook line it becomes zinc oxide, using hydroxide from the electrolyte and releasing water. A real cell also makes dissolved zincate, Zn(OH)₄²⁻. The part that matters for the flashlight is the electrons leaving into the wire.",
        equations: ["bat-anode"],
      },
      {
        title: "Manganese dioxide takes them",
        caption:
          "At the cathode, manganese dioxide accepts the electrons, with water, and produces hydroxide. The hydroxide the anode used is put back, so the electrolyte is a courier. The manganese product is simplified here as Mn₂O₃. Used cathodes are a mixture, often including MnOOH.",
        equations: ["bat-cathode"],
      },
      {
        title: "The stored reaction",
        caption:
          "Add the halves. Hydroxide, water, and electrons cancel. Zinc plus two manganese dioxides become zinc oxide plus Mn₂O₃. When the zinc or the manganese dioxide is used up, the battery is dead. You cannot stir it back. Rechargeable chemistries are different cells, not this one run backward at home.",
        equations: ["bat-overall"],
      },
      {
        title: "The liquid is a base",
        caption:
          "Potassium hydroxide splits into K⁺ and OH⁻. Those ions move inside the steel can so charge does not pile up. KOH is corrosive. A swollen or leaking battery is a reason to stop touching it with bare hands, not a chance to see the crystals. Wipe a leak with a disposable towel, wash skin with water, and recycle the cell. Do not take it apart.",
        equations: ["bat-electrolyte"],
      },
    ],
    practice: {
      title: "Use it, then recycle it",
      safe: false,
      body: "There is nothing useful to open. The powder and the liquid burn eyes and skin. Tape the terminals of a dead 9-volt if you store it, and take spent batteries to a recycling drop-off. Do not burn them.",
    },
    sources: [
      {
        title: "OpenStax Chemistry 2e, batteries",
        href: "https://openstax.org/books/chemistry-2e/pages/17-5-batteries-and-fuel-cells",
        detail: "Alkaline cells are primary batteries. The text gives the zinc anode and manganese dioxide cathode chemistry.",
      },
    ],
  },
  {
    id: "hand-warmer",
    room: "house",
    title: "A hand warmer",
    hook: "The pouch is fast, salty rust. Iron plus oxygen gives off heat. The packet stays warm for hours because air seeps in slowly.",
    signature: "4 Fe + 3 O₂ → 2 Fe₂O₃",
    steps: [
      {
        title: "Air was the missing ingredient",
        caption:
          "Before you open the plastic, oxygen cannot reach the iron powder. After you open it, O₂ from the room fills the pores. The line is only oxygen changing places, from the room into the pouch. The iron is already in there, with salt, water, carbon, and a mineral that holds moisture.",
        equations: ["warm-air"],
      },
      {
        title: "The heat tally",
        caption:
          "Four irons plus three oxygens make two iron oxides. Iron and oxygen in their ordinary forms are the starting line of this tally, so the heat released is about twice the formation enthalpy of Fe₂O₃, roughly 1650 kilojoules for the equation as written. That is a lot of heat. You do not get it in one flash, because the oxygen arrives slowly through the pouch wall.",
        equations: ["warm-dry"],
      },
      {
        title: "It is moist rust",
        caption:
          "The pouch is damp on purpose. The wet equation is the same family as nail rust: iron, oxygen, and water become iron(III) hydroxide. Rust on a bridge is slow and annoying. Rust in a powder with a huge surface is a hand warmer. The chemistry is not a special fuel. It is iron, divided finely.",
        equations: ["warm-wet"],
      },
      {
        title: "Salt is there to speed it",
        caption:
          "Sodium chloride splits into ions. As in ordinary rust, the ions let charge move so the oxidation is fast. Activated carbon spreads oxygen. Vermiculite holds the water. None of those is the thing being oxidized for the heat. If you cut a pouch open you get a mess of iron dust, not a better warmer, and the dust is not something to breathe.",
        equations: ["warm-salt"],
      },
    ],
    practice: {
      title: "Follow the packet",
      safe: true,
      body: "Open the outer bag, shake, and let air in as the instructions say. Do not cut the inner pouch, microwave it unless that exact product says to, or put it against bare skin if it feels too hot. When it is spent, the iron is ordinary rust. Throw it out with household trash if the label says that.",
    },
    sources: [
      {
        title: "OpenStax Chemistry 2e, corrosion",
        href: "https://openstax.org/books/chemistry-2e/pages/17-6-corrosion",
        detail: "Iron oxidation by oxygen is exothermic. A hand warmer runs that reaction on purpose, with salt water and a large iron surface.",
      },
    ],
    related: { topicId: "rust", label: "The same iron chemistry, slower, on a nail" },
  },
  {
    id: "ice-pack",
    room: "house",
    title: "An instant ice pack",
    hook: "Squeezing the pack lets ammonium nitrate dissolve. Pulling the ions apart absorbs heat, so the pack gets cold.",
    signature: "NH₄NO₃(s) → NH₄⁺ + NO₃⁻",
    steps: [
      {
        title: "The barrier breaks",
        caption:
          "A typical instant cold pack has water in one compartment and solid ammonium nitrate in the other. Squeeze, the barrier breaks, and the salt dissolves. The products are ammonium ions and nitrate ions. No gas is supposed to appear. If a pack was damaged and dried salt spilled, that is a mess to wipe up, not a reagent to keep.",
        equations: ["ice-dissolve"],
      },
      {
        title: "Why it feels cold",
        caption:
          "Separating the ions and surrounding them with water takes more energy than the water gets back. The heat comes from your hand and the pack. ΔH for dissolving ammonium nitrate is about +25.7 kilojoules per mole. A quarter mole, about 20 grams, absorbs about 6.4 kilojoules. That is a small-pack amount of cold, not a freezer. The formula is q = n · ΔH.",
        equations: ["ice-heat"],
      },
      {
        title: "It stays dissolved",
        caption:
          "With enough water the equilibrium sits on the side of the ions. The cold is not a miniature refrigerator compressor and not the reverse of a hand warmer. When the pack warms back up, the salt is still dissolved. You cannot “recharge” it by freezing unless the product is the other kind, a gel you chill in a freezer. Read which one you have.",
        equations: ["ice-eq"],
      },
    ],
    practice: {
      title: "Use a sealed pack",
      safe: false,
      body: "Squeeze a commercial pack if you need cold, and keep it closed. Do not eat the liquid, do not mix the salt with anything, and do not try to build a pack from a bulk chemical. Ammonium nitrate has other, dangerous uses. This page is only the dissolving that makes a sealed pack cold. A bag of ice is the simpler cold.",
    },
    sources: [
      {
        title: "OpenStax Chemistry 2e, enthalpy of solution",
        href: "https://openstax.org/books/chemistry-2e/pages/5-3-enthalpy",
        detail: "Dissolving can be endothermic. Ammonium nitrate is the usual example: the solution gets cold because ΔH is positive.",
      },
    ],
  },
  {
    id: "glow-stick",
    room: "house",
    title: "A glow stick",
    hook: "Peroxide and an oxalate make a short-lived molecule that hands energy to a dye. The dye, not the peroxide, chooses the color.",
    signature: "C₁₄H₁₀O₄ + H₂O₂ → 2 C₆H₆O + C₂O₄",
    steps: [
      {
        title: "The snap mixes two liquids",
        caption:
          "A glow stick keeps hydrogen peroxide away from a diphenyl oxalate until you break the inner glass. A salicylate salt speeds the reaction and is not used up, so it sits over the arrow. The simplified products are phenol and a high-energy four-atom ring, C₂O₄. Real mixtures are a solvent plus this idea. The liquid irritates skin and eyes.",
        equations: ["glow-fuel"],
      },
      {
        title: "The energy finds a dye",
        caption:
          "C₂O₄ falls apart into two carbon dioxides and can pass the energy to a dye molecule. Here the dye is 9,10-diphenylanthracene, which can glow blue. The dye is not burned up. It is promoted to a higher electronic state. That is why one dye molecule can emit many times.",
        equations: ["glow-dye"],
      },
      {
        title: "Light comes back out",
        caption:
          "The excited dye returns to its starting form and emits a photon of visible light. A photon is a packet of light, not an atom. The color is the size of the energy gap in that dye. No atom was rearranged in this step. The stick does not contain a bulb or phosphorus.",
        equations: ["glow-light"],
      },
      {
        title: "Color is a choice of dye",
        caption:
          "Put rubrene in instead and the same oxalate reaction can excite a yellow-orange emitter. Manufacturers pick dyes and mixes to get the colors on the shelf. Warm the stick and the peroxide reaction runs faster: brighter, and finished sooner. Cool it and it lasts longer and looks dimmer. That is kinetics, not a different chemical.",
        equations: ["glow-color"],
      },
    ],
    practice: {
      title: "Snap it, don’t cut it",
      safe: true,
      body: "Bend the stick until the inner vial breaks, and shake. If it leaks on skin, wash with water. Do not cut it open, do not drink it, and do not point the liquid at anyone’s eyes. A cracked stick is trash, not a refill.",
    },
    sources: [
      {
        title: "Glow stick, overview of the accepted mechanism",
        href: "https://en.wikipedia.org/wiki/Glow_stick",
        detail: "A public summary of the peroxyoxalate reaction used in glow sticks: an oxalate ester, hydrogen peroxide, and a dye that emits the light. The equations on this page are the simplified version of that account.",
      },
    ],
  },
  {
    id: "road-salt",
    room: "house",
    title: "Salt on ice",
    hook: "Salt lowers the freezing point of water. A teaspoon in a liter barely matters. A salty sidewalk brine does, until the cold is too deep.",
    signature: "ΔT_f = i · K_f · m",
    steps: [
      {
        title: "Ice and water are already trading",
        caption:
          "At 0 °C, ice and liquid water exchange molecules. Melt a few, freeze a few. If something in the liquid makes it harder for molecules to lock back into the crystal, ice melts and the new balance sits at a lower temperature. That something, on a driveway, is dissolved salt.",
        equations: ["road-melt"],
      },
      {
        title: "Two ions per salt",
        caption:
          "Sodium chloride becomes Na⁺ and Cl⁻. Both get in the way of the growing ice crystal. i is about 2. The ions are the working pieces. Solid salt sitting dry on very cold ice does little until a film of water exists for it to dissolve into. Sun or a warmer tire track often starts that film.",
        equations: ["road-salt"],
      },
      {
        title: "The dilute formula, then real brine",
        caption:
          "ΔT_f = i · K_f · m, and K_f for water is 1.86 °C per molal. A tenth molal, about a teaspoon in a liter, drops the freezing point only 0.372 °C. Driveway brine is much saltier, and this dilute formula stops being accurate there. There is also a floor. The coldest a sodium-chloride and water mixture can stay liquid is the eutectic, about −21 °C. Below that, salt will not melt the ice.",
        note: `The eutectic used on this page is about ${NACL_EUTECTIC_C} °C. Real pavements are messy: sun, traffic, and thick ice all change what you see.`,
        equations: ["road-drop"],
      },
      {
        title: "Other salts, other costs",
        caption:
          "Calcium chloride splits into three ions, so i is about 3, and it releases heat as it dissolves. It is used when sodium chloride struggles. Chloride salts corrode metal and concrete, burn plants, sting paws, and wash into streams. “More salt” is not free. Use what the ice needs, and sweep up the extra.",
        equations: ["road-cacl"],
      },
    ],
    practice: {
      title: "A cube in a glass",
      safe: true,
      body: "Put an ice cube in a little cold water and another in cold water with a spoon of salt. The salty one shrinks faster. Do not eat the salty one. On a real driveway, follow the bag, keep salt off garden beds, and remember it stops helping when the weather is far below the eutectic.",
    },
    sources: [
      {
        title: "OpenStax Chemistry 2e, freezing-point depression",
        href: "https://openstax.org/books/chemistry-2e/pages/11-4-colligative-properties",
        detail: "ΔT_f = i K_f m. For water, K_f is 1.86 °C/m. The equation is the dilute-solution estimate.",
      },
      {
        title: "U.S. EPA, aquatic-life criteria table",
        href: "https://www.epa.gov/wqc/national-recommended-water-quality-criteria-aquatic-life-criteria-table",
        detail: "The national recommended criteria include chloride. Extra salt does not stay on the driveway. It can reach streams, where chloride is already a regulated concern.",
      },
    ],
  },
  {
    id: "microplastics",
    room: "house",
    title: "Microplastics from bottles and laundry",
    hook: "PET and nylon are long chains. Washing and wear break off tiny pieces of the same chain. What that means for health is still an open question.",
    signature: "PET unit C₁₀H₈O₄",
    steps: [
      {
        title: "A bottle is a repeating unit",
        caption:
          "Many drink bottles and many fleece fibers are PET, poly(ethylene terephthalate). The simplified line joins terephthalic acid and ethylene glycol and loses two waters, once per unit. A real chain is thousands of units. Factories often start from a dimethyl ester instead of the free acid. The unit in the finished plastic is the part to recognize: C₁₀H₈O₄.",
        equations: ["micro-pet"],
      },
      {
        title: "Nylon is a different chain",
        caption:
          "Nylon-6,6, used in some clothes and carpets, joins adipic acid and a six-carbon diamine, again losing water. The repeating unit is C₁₂H₂₂N₂O₂. A shed fiber is a short piece of that chain or of PET. It is not a mysterious new element. “Microplastic” means a small piece of plastic, often defined as under 5 millimeters, down to sizes you cannot see.",
        equations: ["micro-nylon"],
      },
      {
        title: "Shedding is mostly breaking",
        caption:
          "Agitation, abrasion, and opening a cap break pieces off. The line splits a two-unit fragment into two units. Nothing new was created. The wash water carries the fibers away, and a dryer vent or a lint trap catches some and not all. Bottles shed particles when they are squeezed, heated, or reused roughly. The evidence that particles are released is solid.",
        equations: ["micro-shed"],
      },
      {
        title: "Dissolving is the slow path",
        caption:
          "Water can cut the ester bonds and turn a PET unit back into the acid and the glycol. In cold water that reaction is extremely slow. Laundry microplastic is mainly fragments, not a bottle dissolving into juice. People do ingest and inhale microplastics. They have been measured in food, water, air, and human samples. Whether typical exposures cause specific diseases is not settled. Reducing shedding is reasonable. It is not a medical treatment, and this page will not invent one.",
        equations: ["micro-water"],
      },
    ],
    practice: {
      title: "Fewer fibers down the drain",
      safe: true,
      body: "Wash full loads, pick cold water when the clothes allow, and empty the lint trap. A wash-bag or a filter catches some fibers if you want one. None of that removes plastic already in the ocean, and none of it is a health cure. For bottles, don’t bake them or leave them in a hot car as a habit. Replacing every plastic in the house is not what the evidence currently demands.",
    },
    sources: [
      {
        title: "WHO, microplastics in drinking-water",
        href: "https://www.who.int/publications/i/item/9789241516198",
        detail: "The 2019 report found microplastics widely in water and judged the health risk from those exposures uncertain, calling for better data rather than a panic threshold.",
      },
      {
        title: "NOAA, what are microplastics?",
        href: "https://oceanservice.noaa.gov/facts/microplastics.html",
        detail: "Microplastics are small plastic pieces, including fibers from synthetic clothing and fragments from larger items.",
      },
    ],
  },
];
