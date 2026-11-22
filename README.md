# Household Chemistry

A static, mobile-friendly tour of chemistry that happens around the house. Made for people who last took chemistry a long time ago.

Live site: [https://cryptotradingplatformx.github.io/household-chemistry/](https://cryptotradingplatformx.github.io/household-chemistry/)

The pictures move in the browser. There is no backend. Pause a scene or step through its captions. If your device asks for reduced motion, the scenes hold still and Play walks the captions instead. Each step has its own equation, formula, or representation. Tap a term for a plain explanation. The sentence under the line is the reading.

A sibling tour of one copper water bottle lives at [Copper Bottle Chemistry](https://cryptotradingplatformx.github.io/copper-bottle-chemistry/).

## Rooms

**Kitchen.** Baking soda and vinegar. Bread rising. Maillard browning, labeled as a simplified reaction network. Caramelizing sugar. Cut fruit turning brown, and why lemon juice slows it. Boiling an egg. Salt and the boiling point, including how small the effect is at cooking amounts. Kettle scale and vinegar.

**Cleaning.** How soap micelles lift oil. Bleach fading a stain. A safety-first page on why bleach must never meet ammonia or acids: chlorine and chloramines, with no mixing instructions. Hydrogen peroxide fizzing, and why the bubbles are not a cleanliness score. Rust, and why salt speeds it without being part of the formula. Silver tarnish removed with aluminum foil and baking soda.

**Bathroom and body.** Fluoride and enamel. Antiperspirant gels. Hair bleach and dye. Sunscreen, organic filters and zinc oxide or titanium dioxide.

**Around the house.** A gas flame. Carbon monoxide, hemoglobin, and detectors. Alkaline batteries. Hand warmers. Instant ice packs. Glow sticks. Salt on ice. Microplastics from bottles and laundry, with health claims kept to what the evidence supports.

Every chemical line is checked by tests for atoms and charge. Physical formulas such as boiling-point elevation are checked against the arithmetic they claim. Lines that leave out real complexity are marked Simplified.

## Develop

```bash
npm install
npm test
npm run dev
```

The Vite base path is `/household-chemistry/`. Production build:

```bash
npm run build
npm run preview
```

Topic routes are client-side. The build copies `index.html` to `404.html` so GitHub Pages can open a topic link directly.

## Deploy

GitHub Pages is configured with `build_type=workflow`. `.github/workflows/ci.yml` runs tests and `npm run build` on pull requests and on pushes to `main`. A push to `main` uploads `dist` with `actions/upload-pages-artifact` and deploys it with `actions/deploy-pages`.

## Disclaimer

This is educational, not medical, nutritional, or safety-engineering advice. It will not tell you how to treat a wound, a poisoning, or a gas leak. Never mix bleach with ammonia, vinegar, or other acids. If someone may have breathed chlorine, chloramines, or carbon monoxide, get them to fresh air and contact emergency services or a poison center.
