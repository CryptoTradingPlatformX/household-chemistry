import type { Topic } from "./types";

export const KITCHEN: readonly Topic[] = [
  {
    id: "baking-soda-vinegar",
    room: "kitchen",
    title: "Baking soda and vinegar",
    hook: "The volcano fizz is an acid meeting bicarbonate. The bubbles are carbon dioxide, not the salt left behind.",
    signature: "NaHCO₃ + CH₃COOH → CH₃COONa + H₂O + CO₂",
    steps: [
      {
        title: "Vinegar is mostly water",
        caption:
          "Kitchen vinegar is about 5% acetic acid in water. A few of those acid molecules hand a proton, H⁺, to water. What sits in the water is then H₃O⁺, hydronium. Most of the acetic acid has not done this yet. Vinegar is a weak acid, which means that handoff is incomplete.",
        equations: ["fizz-acid"],
      },
      {
        title: "Baking soda comes apart",
        caption:
          "Baking soda is a solid of sodium ions and bicarbonate ions. In water the crystal lets go. You now have free bicarbonate, HCO₃⁻, which is ready to meet the acid. The sodium ion comes along and does not make the bubbles.",
        equations: ["fizz-dissolve"],
      },
      {
        title: "The trade that fizzes",
        caption:
          "Bicarbonate takes the acid’s proton and falls apart into water and carbon dioxide. The sodium and acetate ions stay dissolved as sodium acetate. The line with sodium is the full recipe tally. The line without it is the same trade, written with only the ions that change.",
        equations: ["fizz-overall", "fizz-ionic"],
      },
      {
        title: "The bubbles leave",
        caption:
          "Carbon dioxide is a gas. At first some of it is dissolved. Then it gathers into bubbles and escapes. The fizz ends when the bicarbonate or the acid runs out, not when the water is “full of energy.” What remains is salty water.",
        equations: ["fizz-gas"],
      },
    ],
    practice: {
      title: "Try it in a glass",
      safe: true,
      body: "A spoon of baking soda and a splash of vinegar in a glass is enough. It can splash, and vinegar stings eyes. Do not cap the container. The gas needs somewhere to go.",
    },
    sources: [
      {
        title: "OpenStax Chemistry 2e, acid-base reactions",
        href: "https://openstax.org/books/chemistry-2e/pages/4-2-classifying-chemical-reactions",
        detail: "Acid plus carbonate or bicarbonate is a standard class of reaction that releases CO₂.",
      },
      {
        title: "OpenStax Chemistry 2e, weak acids",
        href: "https://openstax.org/books/chemistry-2e/pages/14-3-relative-strengths-of-acids-and-bases",
        detail: "Acetic acid only partly donates H⁺. Vinegar is a dilute solution of that weak acid.",
      },
    ],
  },
  {
    id: "bread-rising",
    room: "kitchen",
    title: "Bread rising",
    hook: "Yeast eats sugar and breathes out carbon dioxide. The bubbles set in the dough. Most of the alcohol bakes off.",
    signature: "C₆H₁₂O₆ → 2 C₂H₅OH + 2 CO₂",
    steps: [
      {
        title: "Starch becomes sugar",
        caption:
          "Flour is mostly starch, a long chain of glucose units. Enzymes snip that chain and add water at each cut. The picture uses one unit so the atoms are easy to count. The yeast does not eat the intact chain. It uses the sugars.",
        equations: ["bread-starch"],
      },
      {
        title: "The overall fermentation",
        caption:
          "Inside yeast, many enzymes turn one glucose into two ethanol molecules and two carbon dioxide molecules. No oxygen is required for this path. The cell uses it to keep its energy chemistry going. The equation hides those inner steps. The count of atoms is the result.",
        equations: ["bread-ferment"],
      },
      {
        title: "Gas becomes the crumb",
        caption:
          "Carbon dioxide dissolved in the dough comes out as bubbles. Gluten, the stretchy protein network, holds the bubbles in. That is why a kneaded wheat dough rises instead of foaming away like the vinegar glass.",
        equations: ["bread-bubble"],
      },
      {
        title: "The alcohol mostly leaves",
        caption:
          "Ethanol is a liquid in the raw dough and a vapor in a hot oven. Most of it evaporates as the loaf bakes. A trace can remain. The lift you see is the carbon dioxide, not the alcohol expanding by itself.",
        note: "Sourdough also has bacteria that make acids. The yeast equation is still the main source of the gas.",
        equations: ["bread-alcohol"],
      },
    ],
    practice: {
      title: "Watch a dough, or a jar",
      safe: true,
      body: "Any yeasted dough will do. For a smaller look, stir a pinch of yeast and a pinch of sugar into warm water in a glass. Bubbles are CO₂. It is food, not a cleaning mixture.",
    },
    sources: [
      {
        title: "OpenStax Microbiology, fermentation",
        href: "https://openstax.org/books/microbiology/pages/8-4-fermentation",
        detail: "Alcohol fermentation of glucose yields ethanol and CO₂. The pathway inside the cell is longer than the net line.",
      },
    ],
  },
  {
    id: "maillard",
    room: "kitchen",
    title: "Searing and browning",
    hook: "The brown crust on meat, toast, and onions is a network of reactions between sugars and amino acids. One line cannot name it.",
    signature: "Sugar + amino acid → browning network",
    steps: [
      {
        title: "Sugar meets an amino group",
        caption:
          "A reducing sugar such as glucose can click onto an amino acid and lose water. In meat and bread the amino acid is usually part of a protein. Lysine is a common participant, so the line uses free lysine as a stand-in. A wet surface pushes the arrow back toward the starting pieces. A dry, hot surface lets the network run. That is searing.",
        equations: ["mail-condense"],
      },
      {
        title: "The atoms rearrange",
        caption:
          "The first product rearranges into what cooks call an Amadori compound. Count the atoms and nothing was added or lost. The connections changed. This is still an early, colorless step. The brown and the smell come later.",
        equations: ["mail-amadori"],
      },
      {
        title: "Small molecules, and a brown mixture",
        caption:
          "Later steps break some pieces into small aroma molecules and carbon dioxide, and build others into large brown pigments called melanoidins. The line here is one simplified Strecker step: alanine plus a small dicarbonyl becomes acetaldehyde, a sharp smell, plus CO₂. The brown crust is not acetaldehyde. It is the mixture of large products. Caramel is different: caramel is sugar alone.",
        equations: ["mail-strecker"],
      },
    ],
    practice: {
      title: "Sear, and ventilate",
      safe: true,
      body: "Pat meat or mushrooms dry and use a hot pan. Browning starts when the surface is hot and not stewing in water. Smoke is a sign to turn on a fan. This is ordinary cooking, not a reason to char food on purpose.",
    },
    sources: [
      {
        title: "Nursten, The Maillard Reaction, overview in the food-science literature",
        href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4745522/",
        detail: "A review of Maillard products in cooked food: the reaction network that makes them, and the limits of what is known about health. This page does not treat browning as a treatment or a toxin.",
      },
    ],
    related: { topicId: "caramel", label: "Caramel is the sugar-only path" },
  },
  {
    id: "caramel",
    room: "kitchen",
    title: "Caramelizing sugar",
    hook: "Heat pulls water out of sugar and builds amber molecules. Burn it further and you are making carbon, which is a different ending.",
    signature: "C₁₂H₂₂O₁₁ + H₂O → 2 C₆H₁₂O₆",
    steps: [
      {
        title: "Table sugar splits",
        caption:
          "Sucrose is glucose and fructose clicked together. Heat and a little water, or a little acid, break that click. Both products have the formula C₆H₁₂O₆. They are not the same molecule. The atoms are arranged differently, which is why one is not a substitute name for the other.",
        equations: ["car-invert"],
      },
      {
        title: "Water leaves the sugar",
        caption:
          "Push the heat higher and a sugar loses water. One real product is HMF, a ring that shows up in caramel and also in overheated honey and juice. It is one molecule in the pot, not the definition of caramel. The smell you want is a crowd of fragments.",
        equations: ["car-hmf"],
      },
      {
        title: "The color deepens",
        caption:
          "Those fragments join into larger ones. The line shows two HMF molecules becoming a bigger piece and losing water. Treat the product as a placeholder. Real caramel is a mixture, which is why the color moves from pale gold to deep brown instead of switching all at once.",
        equations: ["car-join"],
      },
      {
        title: "Burning is past caramel",
        caption:
          "If the pot goes black and smokes, sugar is heading toward carbon. The simplified line pulls all the hydrogen and oxygen off as water and leaves twelve carbon atoms. Real smoke also contains carbon dioxide and carbon monoxide. Caramel still has hydrogen and oxygen in it. Black carbon is the end you did not want.",
        equations: ["car-burn"],
      },
    ],
    practice: {
      title: "Hot sugar burns badly",
      safe: true,
      body: "If you caramelize sugar, an adult should do it, and no one should taste it from the spoon while it is hot. Molten sugar sticks and keeps burning. A pinch of sugar in a dry pan, watched the whole time, is enough to see the color change. Have a fan if it smokes.",
    },
    sources: [
      {
        title: "OpenStax Chemistry 2e, carbohydrates",
        href: "https://openstax.org/books/chemistry-2e/pages/20-3-aldehydes-ketones-carboxylic-acids-and-esters",
        detail: "Sugar chemistry sits with the carbonyl compounds. Heating sugars is a dehydration and fragmentation network.",
      },
    ],
    related: { topicId: "maillard", label: "Browning with protein is the Maillard path" },
  },
  {
    id: "fruit-browning",
    room: "kitchen",
    title: "Why cut fruit turns brown",
    hook: "An enzyme in the fruit uses oxygen to start a brown pigment. Lemon slows it with vitamin C and with acid.",
    signature: "Polyphenol + O₂ → brown pigments",
    steps: [
      {
        title: "The cut meets air",
        caption:
          "The inside of an apple or avocado was not open to air. Once you cut it, oxygen dissolves at the wet surface. No oxygen, no enzymatic browning. A cover or a water bath slows the supply. It does not delete the enzyme.",
        equations: ["fruit-air"],
      },
      {
        title: "The enzyme starts the color",
        caption:
          "Polyphenol oxidase uses that oxygen on polyphenols, the fruit’s own defensive molecules. The line uses catechol, a small stand-in, so the atoms balance. The enzyme pulls hydrogens off and leaves a quinone. Quinones are the reactive pieces that become brown. The enzyme is a protein. Heat, as in cooked apples, wrecks it.",
        equations: ["fruit-ppo"],
      },
      {
        title: "Quinones link up",
        caption:
          "Quinones join into larger pigments. The brown you see is that mixture, related in a loose way to melanin, not a single dye and not rust. The line joins two quinones and stops. Real pigments keep going.",
        equations: ["fruit-brown"],
      },
      {
        title: "Vitamin C runs it backward",
        caption:
          "Ascorbic acid, vitamin C, can give hydrogens back to the quinone and restore the polyphenol. Lemon juice has vitamin C, so a squeeze delays browning. When the vitamin C is used up, the enzyme is still there and the color returns. This is a delay, not a permanent shield.",
        equations: ["fruit-vitamin"],
      },
      {
        title: "Acid slows the enzyme",
        caption:
          "Lemon also contains citric acid. Letting go of H⁺ lowers the pH. Polyphenol oxidase works poorly in that sour range. The line shows only the first proton. Citric acid can lose three. The practical point is the pH, not a new pigment.",
        equations: ["fruit-citric"],
      },
    ],
    practice: {
      title: "One apple, two halves",
      safe: true,
      body: "Leave one cut face bare and brush the other with lemon juice. Check them after half an hour. The lemon side should be paler. Eat them or compost them. It is a snack, not a lab waste.",
    },
    sources: [
      {
        title: "OpenStax Biology 2e, enzymes",
        href: "https://openstax.org/books/biology-2e/pages/6-5-enzymes",
        detail: "An enzyme speeds one reaction and is not used up. Polyphenol oxidase is the fruit enzyme in this story. The OpenStax section is the general idea of that kind of catalyst.",
      },
    ],
  },
  {
    id: "boiling-egg",
    room: "kitchen",
    title: "Boiling an egg",
    hook: "The white turns solid because proteins unfold and tangle. The chains themselves are not chopped into amino acids.",
    signature: "Folded protein ⇌ unfolded protein",
    steps: [
      {
        title: "A protein is a chain",
        caption:
          "Egg white is mostly water and protein. A protein is a chain of amino acids joined by peptide bonds. Making a peptide bond loses water. The line joins glycine and alanine, the smallest illustration that still balances. A real ovalbumin chain is hundreds of units long.",
        equations: ["egg-peptide"],
      },
      {
        title: "Heat changes the shape",
        caption:
          "Those chains are folded into compact shapes, held by weak attractions. Heat shakes the folds open. The formula of the chain does not change. “Denaturation” means this loss of shape. Unfolded chains tangle and trap water, so the clear white becomes an opaque gel. That is cooking, not burning.",
        equations: ["egg-unfold"],
      },
      {
        title: "A few sulfur clips",
        caption:
          "Cysteine units carry sulfur. Two of them can link as a disulfide. The line is a half-reaction: the electrons have to go somewhere else, and in the egg they do. This clip helps the gel stay set. It is not the whole story. Most of the firming is the tangling from the previous step. The gray-green ring on an overcooked yolk is an iron–sulfur color, a separate small reaction.",
        equations: ["egg-disulfide"],
      },
      {
        title: "The chain is still a chain",
        caption:
          "Breaking peptide bonds back into free amino acids is hydrolysis. A boiled egg does not do that. Your digestion does, later, with enzymes and a much longer time. The cooked white is still protein. It is just unfolded protein.",
        equations: ["egg-intact"],
      },
    ],
    practice: {
      title: "Boil an egg, then stop",
      safe: true,
      body: "Cover eggs with water, simmer about 10 minutes, and cool them. Longer heat makes the yolk chalky and can add that green ring. It does not make the egg more “denatured” in a way that matters for dinner.",
    },
    sources: [
      {
        title: "OpenStax Biology 2e, protein structure",
        href: "https://openstax.org/books/biology-2e/pages/3-4-proteins",
        detail: "Heat and pH denature proteins by disrupting shape. The primary sequence, the chain itself, stays intact.",
      },
    ],
  },
  {
    id: "boiling-point",
    room: "kitchen",
    title: "Salt and boiling water",
    hook: "Salt does raise the boiling point. At the amount you cook with, the change is about a tenth of a degree.",
    signature: "ΔT_b = i · K_b · m",
    steps: [
      {
        title: "Salt splits in two",
        caption:
          "Table salt is a lattice of Na⁺ and Cl⁻. Water pulls the ions apart. Each formula unit becomes two dissolved particles. That number, about 2, is the i in the boiling-point formula. Sugar does not split, so a sugar molecule counts as one.",
        equations: ["boil-salt"],
      },
      {
        title: "The rise is real and tiny",
        caption:
          "The formula says the rise equals i times K_b times m. K_b for water is 0.512 °C per molal. A tenth molal is about 5.8 grams of salt, close to one teaspoon, in one kilogram of water. Then ΔT_b is 2 × 0.512 × 0.10 = 0.102 °C. Your pot does not cook faster because of that. High heat, a lid, and starting with hot water matter more.",
        note: "i is a little under 2 in real water because some ions briefly pair. The direction of the error makes the rise even smaller.",
        equations: ["boil-rise"],
      },
      {
        title: "Sugar is a smaller effect",
        caption:
          "A dissolved sugar molecule stays whole, so i is 1. The same molality would raise the boiling point about half as much as salt. Sweet cooking liquids can boil differently for other reasons, including dissolved solids that are far more concentrated than a pinch of salt. The dilute formula is the honest starting point, not a rule for candy temperatures.",
        equations: ["boil-sugar"],
      },
      {
        title: "Boiling is still water leaving",
        caption:
          "At the boil, liquid water and water vapor are in balance at the surface. Salt makes it a little harder for water molecules to escape, so you need a slightly higher temperature. The equation of boiling itself does not contain salt. Salt only shifts the temperature where this balance sits.",
        equations: ["boil-water"],
      },
    ],
    practice: {
      title: "Do not salt the pot to “make it hotter”",
      safe: true,
      body: "Salt pasta water for taste. If you want a measurement, it belongs in a kitchen thermometer and a notebook, not in a pot you plan to eat if you dumped in cups of salt. A cup of salt would ruin the food long before it made a dramatic boil.",
    },
    sources: [
      {
        title: "OpenStax Chemistry 2e, colligative properties",
        href: "https://openstax.org/books/chemistry-2e/pages/11-4-colligative-properties",
        detail: "Boiling-point elevation is ΔT_b = i K_b m. For water, K_b is 0.512 °C/m. The formula is for dilute solutions.",
      },
    ],
  },
  {
    id: "kettle-scale",
    room: "kitchen",
    title: "Kettle scale and vinegar",
    hook: "Hard water lays down calcium carbonate when you boil it. Vinegar dissolves that chalk. Do not chase it with bleach.",
    signature: "CaCO₃ + 2 CH₃COOH → Ca(CH₃COO)₂ + H₂O + CO₂",
    steps: [
      {
        title: "Where the hardness came from",
        caption:
          "Rainwater with dissolved carbon dioxide can dissolve a little limestone. The result in the pipes is calcium ions and bicarbonate ions. “Hard water” means those ions are there. Softened water has had much of the calcium swapped for sodium. This line is the dissolving of the rock, written as an equilibrium.",
        equations: ["scale-ions"],
      },
      {
        title: "Heat builds the crust",
        caption:
          "In a hot kettle the equilibrium runs backward. Calcium and two bicarbonates become solid calcium carbonate, water, and carbon dioxide. The solid sticks to the metal. That white crust is scale. It is the same mineral as chalk and limestone, not a mold and not aluminum from the kettle.",
        equations: ["scale-heat"],
      },
      {
        title: "Vinegar dissolves it",
        caption:
          "Acetic acid gives protons to the carbonate and pulls it back into solution. The products are calcium acetate, which dissolves, plus water and bubbles of CO₂. Two acetic acids are required for each carbonate. One would not balance. You may see a little fizz on a heavy crust.",
        equations: ["scale-vinegar"],
      },
      {
        title: "Rinse the acetate away",
        caption:
          "Calcium acetate does not become a new crust. It stays as calcium ions and acetate ions until you pour the liquid out. Rinse the kettle with water before you boil drinking water again. Vinegar flavor is the acetate, not leftover acid you cannot remove.",
        note: "Never add bleach to a kettle you are cleaning with vinegar. Acid plus bleach makes chlorine gas. That reaction has its own page.",
        equations: ["scale-rinse"],
      },
    ],
    practice: {
      title: "A cool kettle, then vinegar",
      safe: true,
      body: "Unplug the kettle and let it cool. Cover the crust with vinegar or half vinegar and half water, wait, and rinse well. Do not mix in bleach, ammonia, or a toilet cleaner. If the kettle is for drinking, several plain-water rinses are the finish.",
    },
    sources: [
      {
        title: "USGS, hardness of water",
        href: "https://www.usgs.gov/special-topics/water-science-school/science/hardness-water",
        detail: "Hardness is mostly dissolved calcium and magnesium. Heating bicarbonate-rich water precipitates carbonate scale.",
      },
      {
        title: "CDC, never mix bleach with other cleaners",
        href: "https://www.cdc.gov/hygiene/about/cleaning-and-disinfecting-with-bleach.html",
        detail: "Bleach mixed with acids or other cleaners can release dangerous gases. Vinegar is an acid.",
      },
    ],
    related: { topicId: "never-mix-bleach", label: "Why vinegar and bleach must not meet" },
  },
];
