/** Ebullioscopic constant of water, °C·kg/mol. OpenStax Chemistry 2e, Table 11.2. */
export const WATER_KB = 0.512;

/** Cryoscopic constant of water, °C·kg/mol. OpenStax Chemistry 2e, Table 11.2. */
export const WATER_KF = 1.86;

/**
 * Ideal van ’t Hoff factor for NaCl. Real values at kitchen concentrations
 * are a little under 2 because some ions briefly pair.
 */
export const NACL_IDEAL_I = 2;

/** One-tenth molal: about 5.8 g of salt in 1 kg of water, close to a teaspoon in a liter. */
export const EXAMPLE_MOLALITY = 0.1;

/** Rounded standard enthalpy of formation of Fe₂O₃, kJ/mol. */
export const FE2O3_FORMATION_KJ = -824;

/** Enthalpy of solution of ammonium nitrate, about +25.7 kJ/mol near room temperature. */
export const NH4NO3_SOLUTION_KJ = 25.7;

/** Sodium chloride–water eutectic, the coldest that brine can stay liquid, about −21 °C. */
export const NACL_EUTECTIC_C = -21;

export function boilingPointRise(i: number, kb: number, molality: number): number {
  return i * kb * molality;
}

export function freezingPointDrop(i: number, kf: number, molality: number): number {
  return i * kf * molality;
}

/** ΔH for 4 Fe + 3 O₂ → 2 Fe₂O₃, from 2 × ΔHf(Fe₂O₃), elements in standard states. */
export function ironOxidationHeatKJ(): number {
  return 2 * FE2O3_FORMATION_KJ;
}

export function solutionHeatKJ(moles: number, deltaHPerMole: number): number {
  return moles * deltaHPerMole;
}

export const BOILING_EXAMPLE_C = boilingPointRise(NACL_IDEAL_I, WATER_KB, EXAMPLE_MOLALITY);
export const FREEZING_EXAMPLE_C = freezingPointDrop(NACL_IDEAL_I, WATER_KF, EXAMPLE_MOLALITY);
export const ICE_PACK_EXAMPLE_KJ = solutionHeatKJ(0.25, NH4NO3_SOLUTION_KJ);
