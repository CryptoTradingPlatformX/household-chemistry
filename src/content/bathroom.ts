import type { Topic } from "./types";

export const BATHROOM: readonly Topic[] = [
  {
    id: "fluoride",
    room: "bathroom",
    title: "Fluoride toothpaste",
    hook: "Enamel is a calcium phosphate mineral. Acid dissolves it. Fluoride helps a less soluble version form back.",
    signature: "Ca₁₀(PO₄)₆(OH)₂ + 2 F⁻ → Ca₁₀(PO₄)₆F₂ + 2 OH⁻",
    steps: [
      {
        title: "Acid takes enamel apart",
        caption:
          "The main mineral in enamel is hydroxyapatite: calcium, phosphate, and hydroxide in a crystal. Acids made by bacteria that eat sugar donate H⁺ and pull that crystal into dissolved ions. At the acidity of a plaque attack, the phosphate comes off mostly as H₂PO₄⁻. Fourteen protons balance this particular tally. Enamel is not a pure laboratory crystal, so the line is the mineral’s ideal formula.",
        equations: ["tooth-acid"],
      },
      {
        title: "The paste releases fluoride",
        caption:
          "Sodium fluoride is one salt used in toothpaste. In the wet paste it separates into sodium ions and fluoride ions. The fluoride dose on the brush is small on purpose. Fluoride that is swallowed in larger amounts, especially by children who eat toothpaste, is a poisoning problem, not a bonus.",
        equations: ["tooth-naf"],
      },
      {
        title: "New mineral can include fluoride",
        caption:
          "Saliva carries calcium and phosphate. With fluoride present, the crystal that grows back can be fluorapatite. The line adds the ions up to that formula. Real saliva has proteins and a changing pH, so this is the mineral tally, not a clock of how fast a white spot heals. Fluoride helps. It does not cancel a habit of constant sugar.",
        equations: ["tooth-rebuild"],
      },
      {
        title: "A simplified swap",
        caption:
          "Textbooks also write fluoride taking the hydroxide seats inside hydroxyapatite, with OH⁻ leaving. The atom count works. In a living mouth, a lot of the benefit is the rebuilding in the previous step, not a solid crystal quietly exchanging ions with no dissolving at all. Both pictures point at the same mineral: fluorapatite is less willing to dissolve in acid.",
        equations: ["tooth-swap"],
      },
    ],
    practice: {
      title: "Brush, and spit",
      safe: true,
      body: "Use a pea-sized amount of fluoride toothpaste, brush, and spit. Children need a smaller smear and an adult nearby so they do not swallow it. This is everyday hygiene, not a treatment for a toothache. A hurting tooth needs a dentist.",
    },
    sources: [
      {
        title: "CDC, about fluoride",
        href: "https://www.cdc.gov/oral-health/prevention/about-fluoride.html",
        detail: "Fluoride helps rebuild weakened enamel and reduces the ability of acids to dissolve it. Toothpaste is a main source for many people.",
      },
    ],
  },
  {
    id: "antiperspirant",
    room: "bathroom",
    title: "Antiperspirant",
    hook: "Aluminum salts form a gel that plugs the top of a sweat duct. The gland still makes sweat. Deodorant is a different idea.",
    signature: "Al³⁺ salts + water → Al(OH)₃ gel",
    steps: [
      {
        title: "The salt meets sweat",
        caption:
          "Many antiperspirants use aluminum chlorohydrate, a family of salts often written near Al₂(OH)₅Cl. The line lets that simplified formula release chloride. Real products are mixtures, often hydrated. The point of the step is that aluminum species and chloride part company in the wet duct.",
        equations: ["anti-split"],
      },
      {
        title: "Water pulls off protons",
        caption:
          "Picture a dissolved aluminum ion wrapped in six waters. It can hand H⁺ to the surroundings and keep a hydroxide. That equilibrium is how metal ions in water start toward an insoluble hydroxide. The hexaaqua ion is a teaching model for the same aluminum, not a second ingredient in the stick.",
        equations: ["anti-water"],
      },
      {
        title: "A gel plugs the duct",
        caption:
          "Enough hydroxide and the aluminum comes out of solution as aluminum hydroxide. With proteins in sweat, it forms a gel in the upper part of the duct. Sweat is still produced underneath. Less of it reaches the skin, so the skin feels drier. The plug is temporary. Skin sheds, and the effect fades.",
        equations: ["anti-gel"],
      },
      {
        title: "Why it wears off",
        caption:
          "Acid can dissolve aluminum hydroxide back into ions. Sweat is not a strong acid, but the gel is not a permanent cork, and washing removes product from the surface. Reapplying is the design. Antiperspirant is not deodorant: deodorant is mainly scent and ingredients meant to limit odor bacteria. Some products are both.",
        note: "Health agencies have not established that using antiperspirant aluminum causes cancer or Alzheimer’s disease. Irritation is a real, ordinary side effect for some people. This page is not medical advice.",
        equations: ["anti-wear"],
      },
    ],
    practice: {
      title: "Use the product you already bought",
      safe: true,
      body: "Follow the label, often on dry skin at night so the gel can form. Do not brew aluminum salts at home. If a product stings or rashes, stop it. Switching to a deodorant without aluminum is a preference, not a requirement this page can justify with a disease claim.",
    },
    sources: [
      {
        title: "U.S. FDA, OTC antiperspirant monograph history",
        href: "https://www.fda.gov/drugs/historical-status-otc-rulemakings/rulemaking-history-otc-antiperspirant-drug-products",
        detail: "Antiperspirants are over-the-counter drugs. The monograph lists aluminum chlorohydrate and related salts as the ingredients that reduce underarm sweat.",
      },
    ],
  },
  {
    id: "hair-color",
    room: "bathroom",
    title: "Hair bleach and dye",
    hook: "Peroxide lightens melanin. Permanent dye builds a new colored molecule inside the hair. The package is the procedure.",
    signature: "Melanin model + H₂O₂ → lighter pigment",
    steps: [
      {
        title: "Alkali opens the hair",
        caption:
          "Permanent color is alkaline, often with ammonia. Ammonia and water sit in equilibrium with ammonium and hydroxide. The hydroxide swells the hair shaft so small molecules can get past the cuticle. This is a reason those mixtures sting eyes and noses. It is also a reason not to improvise with household ammonia and laundry bleach. Those two make chloramines.",
        equations: ["hair-base"],
      },
      {
        title: "Peroxide fades melanin",
        caption:
          "Hair color from nature is melanin, a polymer. The line oxidizes one simplified building block, dihydroxyindole, with hydrogen peroxide. The product has fewer hydrogens and absorbs less visible light in this picture. On a head of hair the change is gradual: brown toward orange toward pale. Bleach does not reach into a single molecule and stop. Over-processing makes hair brittle because the fiber, not just the pigment, is oxidized.",
        equations: ["hair-melanin"],
      },
      {
        title: "A dye precursor is oxidized",
        caption:
          "Permanent dyes use small precursors such as p-phenylenediamine. Peroxide pulls two hydrogens off, in this simplified line, and leaves a reactive quinone diimine. That molecule is small enough to enter the swollen hair. p-Phenylenediamine is a well-known cause of allergic contact dermatitis. If the box says to patch-test, that instruction is the safety step.",
        equations: ["hair-ppd"],
      },
      {
        title: "Color is built inside",
        caption:
          "The oxidized precursor joins a coupler, here resorcinol, into a larger molecule. The larger molecule does not wash out easily, which is what “permanent” means. The product formula is a stand-in, and the two protons and two electrons are taken up by the rest of the mixture. Different couplers make different shades. None of this is a recipe for mixing raw chemicals. The box already balanced its own formula.",
        equations: ["hair-couple"],
      },
    ],
    practice: {
      title: "Follow the box, or don’t",
      safe: true,
      body: "Use a hair-color kit only as its own instructions say, in a ventilated room, with gloves. Do a patch test when the label asks. Do not dye eyebrows or eyelashes with scalp dye. Do not add laundry bleach, ammonia from a cleaning bottle, or a second developer “to make it stronger.”",
    },
    sources: [
      {
        title: "U.S. FDA, hair dyes",
        href: "https://www.fda.gov/cosmetics/cosmetic-products/hair-dyes",
        detail: "Permanent dyes can contain p-phenylenediamine and related molecules. FDA describes allergy risk and the patch test printed on many packages.",
      },
    ],
    related: { topicId: "never-mix-bleach", label: "Laundry bleach and ammonia are a different, dangerous reaction" },
  },
  {
    id: "sunscreen",
    room: "bathroom",
    title: "Sunscreen",
    hook: "Organic filters are molecules that absorb ultraviolet light and release it as heat. Zinc oxide and titanium dioxide are solids that absorb and scatter it.",
    signature: "Filter + UV photon → filter*",
    steps: [
      {
        title: "A molecule catches the photon",
        caption:
          "Oxybenzone is one organic filter, formula C₁₄H₁₂O₃. An ultraviolet photon promotes its electrons. The atoms do not rearrange in the absorption itself. “Organic” here means carbon-containing, the ordinary chemistry word. It does not mean the other kind is free of chemicals. Both kinds are chemicals.",
        equations: ["sun-absorb"],
      },
      {
        title: "The energy leaves as heat",
        caption:
          "The excited molecule drops back to the starting form and releases the energy mostly as heat. It can then absorb again. The heat of a single molecule is far too small to feel. A sunburn is energy the skin absorbed, not a failure of this little heat step. Filters reduce that dose. They do not make noon sun harmless if you stay out for hours.",
        equations: ["sun-heat"],
      },
      {
        title: "UVA needs its own attention",
        caption:
          "Ultraviolet includes UVB, which is the main sunburn band, and UVA, which goes deeper and ages skin. Avobenzone, C₂₀H₂₂O₃, is used especially for UVA. Sunlight can also break it down, so formulas add stabilizers. The line is the absorption, the job you want. SPF on a bottle is mainly a sunburn score from a lab test, not a complete measure of UVA protection. “Broad spectrum” is the extra claim to look for.",
        equations: ["sun-avo"],
      },
      {
        title: "Mineral particles stay solids",
        caption:
          "Zinc oxide barely dissolves. The equilibrium with zinc ions and hydroxide favors the solid, which is why the particle stays on the skin and can look white unless the particles are very small. Titanium dioxide catches a photon and is still titanium dioxide. These solids both absorb and scatter ultraviolet light. They are not a mirror that reflects all of it. People absorb some organic filters through the skin. Studies have measured that absorption. Harm from those measured levels is not established. Mineral filters are an alternative if you want to avoid that open question.",
        equations: ["sun-zno", "sun-tio2"],
      },
    ],
    practice: {
      title: "Put it on, and again later",
      safe: true,
      body: "Use a broad-spectrum sunscreen as the label describes, and put more on after swimming or a couple of hours. Shade, a hat, and clothes do work the sunscreen does not have to do. No formula on this page is a reason to skip a burn you already have. Sunburn treatment is ordinary first aid, not a chemistry project.",
    },
    sources: [
      {
        title: "U.S. FDA, sunscreen basics",
        href: "https://www.fda.gov/drugs/understanding-over-counter-medicines/sunscreen-how-help-protect-your-skin-sun",
        detail: "FDA explains SPF, broad spectrum, water resistance, and how to apply sunscreen. SPF is a measure of sunburn protection.",
      },
      {
        title: "Matta and colleagues, JAMA, 2019",
        href: "https://pubmed.ncbi.nlm.nih.gov/31058986/",
        detail: "Under maximal use, several organic sunscreen filters were measured in blood. The study shows absorption. It does not show that those levels cause disease.",
      },
      {
        title: "U.S. FDA, questions on OTC sunscreen actions",
        href: "https://www.fda.gov/drugs/understanding-over-counter-medicines/questions-and-answers-fdas-regulatory-actions-over-counter-sunscreen",
        detail: "FDA’s Q&A on sunscreen orders. Zinc oxide and titanium dioxide are the mineral filters discussed as GRASE, generally recognized as safe and effective, in that proposal.",
      },
    ],
  },
];
