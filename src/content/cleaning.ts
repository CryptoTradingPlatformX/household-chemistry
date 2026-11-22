import { COPPER_SITE, type Topic } from "./types";

export const CLEANING: readonly Topic[] = [
  {
    id: "soap",
    room: "cleaning",
    title: "How soap lifts oil",
    hook: "A soap ion has a greasy tail and a charged head. In water the tails hide together and can hold an oil droplet inside.",
    signature: "CH₃(CH₂)₁₆COO⁻Na⁺",
    steps: [
      {
        title: "One ion, two personalities",
        caption:
          "A typical soap molecule is a long chain of carbon and hydrogen with a charged carboxylate at one end, paired with sodium. In water it separates into the stearate ion and Na⁺. The tail is happier in oil. The head is happier in water. Bar soap is a mixture of chain lengths. Stearate, with sixteen CH₂ groups after the CH₃, is the stand-in.",
        equations: ["soap-dissolve"],
      },
      {
        title: "Oil does not dissolve",
        caption:
          "Cooking oil and skin oil are mostly long hydrocarbon chains. The line uses hexadecane. It can sit as a droplet or as a lone dissolved molecule. The droplet wins by a huge margin. Rinsing with plain water slides the droplet around. It does not pull it into the water.",
        equations: ["soap-oil"],
      },
      {
        title: "Micelles",
        caption:
          "Past a small concentration, soap ions cluster. Tails point inward, away from water. Heads point out, toward water. That cluster is a micelle. The line builds one from eight ions so the charge is easy to check: 8 × (−1) = −8. Real micelles are larger, and they constantly swap ions with the water.",
        equations: ["soap-micelle"],
      },
      {
        title: "Oil rides in the middle",
        caption:
          "An oil molecule can slip into the greasy center. It is trapped, not chemically changed. The outside of the package is charged, so water will carry it down the drain. That is the wash. Detergents used in machines are a related idea with different heads, often made to work in hard water where soap would form a scum with calcium.",
        equations: ["soap-trap"],
      },
    ],
    practice: {
      title: "Oily hands, then soap",
      safe: true,
      body: "Rub a drop of cooking oil on a fingertip, rinse with water, then wash with soap. The first rinse beads. The soap rinse takes the film. Any hand soap is enough. You do not need a special chemical.",
    },
    sources: [
      {
        title: "OpenStax Chemistry 2e, colloids, soaps and detergents",
        href: "https://openstax.org/books/chemistry-2e/pages/11-5-colloids",
        detail: "Sodium stearate is the usual example of soap: a long nonpolar tail and a charged carboxylate head. The section describes how that structure lifts oil.",
      },
    ],
  },
  {
    id: "bleach-stains",
    room: "cleaning",
    title: "Bleach and stains",
    hook: "Chlorine bleach fades some stains by changing the bonds that make them colored. It is not a mixer for other cleaners.",
    signature: "OCl⁻ + H₂O ⇌ HOCl + OH⁻",
    steps: [
      {
        title: "What is in the bottle",
        caption:
          "Household chlorine bleach is a solution of sodium hypochlorite. In water it is sodium ions and hypochlorite ions, OCl⁻. Chloride ions are in there too, left from how bleach is made. Hypochlorite is not chlorine gas. The gas appears only if you give the solution an acid, which is the next page, not this one.",
        equations: ["bleach-ions"],
      },
      {
        title: "The form that does the work",
        caption:
          "Hypochlorite and water trade a proton. The products are hypochlorous acid, HOCl, and hydroxide. HOCl is especially good at reacting with the structures that absorb visible light. The balance between OCl⁻ and HOCl depends on how basic the water is. The bottle is kept basic so it stays hypochlorite on the shelf.",
        equations: ["bleach-hocl"],
      },
      {
        title: "A color-making bond breaks pattern",
        caption:
          "Many dyes are colored because electrons can move along alternating double bonds. HOCl can add across a double bond and end that pattern. The line uses ethene, the smallest double bond, as a stand-in. The product is colorless in this picture. Real dyes are larger, and bleach does not remove every kind of stain. Protein stains and some pigments need a different approach, or they are simply gone from the cloth because the fiber was damaged.",
        equations: ["bleach-dye"],
      },
      {
        title: "It does not neutralize itself by mixing",
        caption:
          "Hypochlorite can slowly become chloride and oxygen. That is not a reason to pour another cleaner in to “use it up.” Mixing is how people make chlorine gas and chloramines. Use bleach alone, as the label describes, with air moving through the room. When you are done, wash it away with water.",
        equations: ["bleach-spent"],
      },
    ],
    practice: {
      title: "Follow the bottle, and only the bottle",
      safe: true,
      body: "If a white cotton cloth needs bleach, use the product by itself in the way its label describes, with a window open. Do not add vinegar, ammonia, rubbing alcohol, or a toilet-bowl cleaner to the same water. Test a hidden spot if the item is not plain white cotton. Bleach weakens some fibers and removes color you wanted to keep.",
    },
    sources: [
      {
        title: "CDC, cleaning and disinfecting with bleach",
        href: "https://www.cdc.gov/hygiene/about/cleaning-and-disinfecting-with-bleach.html",
        detail: "Bleach is sodium hypochlorite. CDC’s standing rule is not to mix it with any other cleaner or disinfectant.",
      },
    ],
    related: { topicId: "never-mix-bleach", label: "The mixtures that make toxic gas" },
  },
  {
    id: "never-mix-bleach",
    room: "cleaning",
    title: "Never mix bleach",
    hook: "Bleach plus acid makes chlorine gas. Bleach plus ammonia makes chloramines. There is no useful household reason to combine them.",
    signature: "OCl⁻ + Cl⁻ + 2 H⁺ → Cl₂ + H₂O",
    danger: true,
    steps: [
      {
        title: "Acids make chlorine gas",
        caption:
          "Hypochlorite, chloride, and acid produce chlorine gas, Cl₂. Vinegar is an acid. Some toilet cleaners and some drain openers are acids. Bleach already contains chloride, so you do not need a second salt. The gas is yellow-green, heavier than air, and painful to breathe. This line is here so the warning has a reason. It is not a procedure. There is no safe amount to mix on purpose.",
        equations: ["danger-acid"],
      },
      {
        title: "Ammonia makes chloramine",
        caption:
          "Ammonia and hypochlorite make monochloramine, NH₂Cl, a toxic gas. Some glass cleaners contain ammonia. Urine contains urea and related nitrogen compounds, which is why bleach on certain messes can also smell sharp and is a bad idea in a closed room. Do not combine the bottles, the buckets, or the sponges.",
        equations: ["danger-ammonia"],
      },
      {
        title: "The path can go further",
        caption:
          "If more hypochlorite meets monochloramine, dichloramine can form, and then nitrogen trichloride. All of these are irritant gases. You do not need to remember every formula. You need to remember that “a little of each cleaner” is the dangerous case, not a stronger cleaner. One product at a time.",
        equations: ["danger-di", "danger-tri"],
      },
      {
        title: "What to do instead",
        caption:
          "Chlorine reacts with water, including the wet surfaces of eyes and airways. That is why the gas hurts so quickly. If a sharp, pool-like or bleach-like gas appears, leave the room, get fresh air, and get help. Do not go back in to identify the smell. Do not pour something else in to cancel it. There is no kitchen neutralizing step. Poison centers and emergency services exist for this.",
        equations: ["danger-lung"],
      },
    ],
    practice: {
      title: "Do not try this",
      safe: false,
      body: "There is no home demonstration. Do not put bleach in the same container, bucket, or sink load as ammonia, vinegar, or an acid cleaner. If the gas is already there, leave and get help. The equations are on this page so the warning is specific, not so anyone can run them.",
    },
    sources: [
      {
        title: "CDC, bleach safety",
        href: "https://www.cdc.gov/hygiene/about/cleaning-and-disinfecting-with-bleach.html",
        detail: "Never mix household bleach with any other cleaner or disinfectant. The vapors can be dangerous to breathe.",
      },
      {
        title: "ATSDR ToxFAQs, chlorine",
        href: "https://wwwn.cdc.gov/TSP/ToxFAQs/ToxFAQsDetails.aspx?faqid=683&toxid=36",
        detail: "Acid plus bleach can release chlorine gas. Bleach plus ammonia can release chloramines. Do not mix household cleaners.",
      },
      {
        title: "CDC, chemical emergencies, chlorine",
        href: "https://www.cdc.gov/chemical-emergencies/chemical-fact-sheets/chlorine.html",
        detail: "If chlorine is released indoors, get out of the building and breathe fresh air. Do not stay in the cloud.",
      },
    ],
  },
  {
    id: "peroxide",
    room: "cleaning",
    title: "Peroxide on a cut",
    hook: "The fizz is catalase turning H₂O₂ into water and oxygen. It is not a meter of how dirty the cut was.",
    signature: "2 H₂O₂ → 2 H₂O + O₂",
    steps: [
      {
        title: "Almost all water",
        caption:
          "The brown bottle from a pharmacy is usually about 3% hydrogen peroxide in water. The brown plastic slows light, which would help the peroxide break down. H₂O₂ is not a kind of water. Water is H₂O. The extra oxygen is the whole difference.",
        equations: ["per-mix"],
      },
      {
        title: "Catalase makes the fizz",
        caption:
          "Catalase is an enzyme in your tissue and in many microbes. It turns hydrogen peroxide into water and oxygen, fast. The bubbles are the oxygen. The enzyme is written over the arrow because it is not used up. Two peroxide molecules are required. One would not balance.",
        equations: ["per-fast"],
      },
      {
        title: "The same reaction, slowly",
        caption:
          "Leave the enzyme out and the same change still happens, only slowly. That is why an old bottle fizzes less: much of the peroxide has already become water and oxygen. It is also why a tightly sealed old bottle can bulge. The fizz on skin is the fast version of a reaction the bottle was already doing.",
        equations: ["per-slow"],
      },
      {
        title: "Bubbles are not a cleanliness score",
        caption:
          "Your own cells make the enzyme, so a clean cut fizzes too. Fizz does not prove germs were there, and it does not prove they are gone. Major first-aid advice for an ordinary cut is gentle soap and running water, not peroxide. Peroxide can irritate healthy tissue. This page is not a treatment plan.",
        equations: ["per-bubble"],
      },
    ],
    practice: {
      title: "Do not experiment on a wound",
      safe: false,
      body: "For an ordinary cut, wash with soap and water and cover it. Do not pour chemistry on skin to watch it fizz. If a bottle is old and you are curious, a drop in the sink shows the slow leftover reaction, and then you rinse it away. Deep, dirty, or bleeding wounds need a clinician, not a browser.",
    },
    sources: [
      {
        title: "Mayo Clinic, first aid for cuts",
        href: "https://www.mayoclinic.org/first-aid/first-aid-cuts/basics/art-20056711",
        detail: "Rinse with clear water and wash around the wound with soap. Hydrogen peroxide can irritate tissue and is not the preferred clean.",
      },
      {
        title: "OpenStax Biology 2e, enzymes",
        href: "https://openstax.org/books/biology-2e/pages/6-5-enzymes",
        detail: "Catalase is the usual classroom enzyme that breaks hydrogen peroxide into water and oxygen.",
      },
    ],
  },
  {
    id: "rust",
    room: "cleaning",
    title: "Rust, and why salt speeds it",
    hook: "Iron, oxygen, and water make rust. Salt is not in the formula. It only helps the charges move.",
    signature: "4 Fe + 3 O₂ + 6 H₂O → 4 Fe(OH)₃",
    steps: [
      {
        title: "A pale beginning",
        caption:
          "Dry iron in dry air is slow to change. Add water and oxygen and the surface makes iron(II) hydroxide. This is not the orange flake yet. It is the first product, and it does not last. The line uses two iron atoms because oxygen arrives as O₂ and the electrons have to match.",
        equations: ["rust-first"],
      },
      {
        title: "Electrons move through the metal",
        caption:
          "Chemists split the first stage into halves. Iron atoms give up two electrons each and become Fe²⁺. Oxygen and water take four electrons and become hydroxide. The iron half must happen twice for one oxygen molecule. Rust can start at one spot and finish at another because the metal conducts the electrons between them.",
        equations: ["rust-anode", "rust-cathode"],
      },
      {
        title: "The color turns orange",
        caption:
          "Iron(II) hydroxide plus more oxygen and water becomes iron(III) hydroxide, the orange-brown material. Four of the pale units are needed so that one O₂ has enough electrons to take. The flake you knock off a nail is this family of compounds, often partly dried.",
        equations: ["rust-orange"],
      },
      {
        title: "Salt is the courier",
        caption:
          "Dissolve salt and you get Na⁺ and Cl⁻. They are not ingredients of rust. They let charge drift through the water film so the two halves of the reaction can stay apart and still balance. A wet salty nail rusts faster than a wet nail. A dry salty nail does little until it gets damp. Winter road spray is this effect on a car.",
        equations: ["rust-salt"],
      },
      {
        title: "The crust dries",
        caption:
          "Iron(III) hydroxide can lose water and sit as a hydrated oxide. People write that crust as Fe₂O₃·H₂O. Real rust is a mixture, so the formula is a label for the red layer, not a pure crystal you could bottle from a nail.",
        equations: ["rust-crust"],
      },
    ],
    practice: {
      title: "Two nails and a week",
      safe: true,
      body: "Put one steel nail in tap water and one in salty water, in open jars so air can get in. Look after a few days. Keep them away from a cut. Do not seal the jars if you used anything other than salt and water. This is iron and salt, not bleach.",
    },
    sources: [
      {
        title: "OpenStax Chemistry 2e, corrosion",
        href: "https://openstax.org/books/chemistry-2e/pages/17-6-corrosion",
        detail: "Iron rust is an electrochemical reaction of iron, oxygen, and water. Salt water accelerates it by carrying ions.",
      },
    ],
    related: {
      href: COPPER_SITE.href,
      label: "Copper tarnish is a different metal, told on the sibling site",
    },
  },
  {
    id: "silver-tarnish",
    room: "cleaning",
    title: "Silver tarnish and foil",
    hook: "Black tarnish is silver sulfide. Aluminum foil and hot baking-soda water can hand the sulfur to the aluminum and leave the silver behind.",
    signature: "3 Ag₂S + 2 Al → 6 Ag + Al₂S₃",
    steps: [
      {
        title: "The black film",
        caption:
          "Silver metal meets traces of hydrogen sulfide and oxygen and becomes silver sulfide, Ag₂S. Eggs, hot springs, and some rubber bands are familiar sulfur sources. The black is the film, not missing silver. The metal is still there, bound to sulfur.",
        equations: ["sil-tarnish"],
      },
      {
        title: "Baking soda makes a mild base",
        caption:
          "The foil method uses hot water and baking soda. The soda dissolves into sodium and bicarbonate. Bicarbonate reacts a little with water and leaves a small amount of hydroxide, so the bath is mildly basic. Basic water helps the aluminum surface stop hiding behind its oxide.",
        equations: ["sil-soda", "sil-base"],
      },
      {
        title: "The foil’s dull skin",
        caption:
          "Aluminum in air wears a thin coat of aluminum oxide. The silver reaction needs metal-to-tarnish contact, so that coat has to give way. The line shows oxide dissolving in hydroxide. A baking-soda bath is only mildly basic, so this is the strong-base version of the idea. Hot water and a pinch of salt also help ions move.",
        equations: ["sil-oxide"],
      },
      {
        title: "Silver returns",
        caption:
          "Three silver sulfide units and two aluminum atoms become six silver atoms and aluminum sulfide. The silver looks bright again because it is metal again, not because a polish rubbed the surface off. Polishing does remove a little silver with the tarnish. This reaction moves the sulfur instead.",
        equations: ["sil-redox"],
      },
      {
        title: "Electrons need a touch",
        caption:
          "Split the same change into halves. Silver sulfide takes six electrons and releases sulfide. Aluminum gives those six electrons and becomes Al³⁺. The ions then form aluminum sulfide in the simplified tally. None of this happens through the water alone. The spoon has to touch the foil so the electrons have a metal path. In the wet pan, aluminum sulfide does not sit forever. A sulfur smell is possible. Open a window.",
        equations: ["sil-ag-half", "sil-al-half", "sil-combine"],
      },
    ],
    practice: {
      title: "Foil, hot water, baking soda",
      safe: true,
      body: "Line a glass or metal dish with aluminum foil, shiny side up. Add hot tap water and a spoonful of baking soda. Lay the silver so it touches the foil. Wait, then rinse. Skip pieces with a dark finish you want to keep, stones that cannot get wet, or glued handles. The water is hot enough to burn. This is a kitchen method, not a dip for bleach.",
    },
    sources: [
      {
        title: "Canadian Conservation Institute, caring for silver",
        href: "https://www.canada.ca/en/conservation-institute/services/conservation-preservation-publications/canadian-conservation-institute-notes/care-silver.html",
        detail: "Silver sulfide is the usual tarnish. Electrochemical reduction with aluminum is a known way to convert it back to silver without abrasive polishing.",
      },
    ],
  },
];
