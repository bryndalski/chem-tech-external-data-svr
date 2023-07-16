/**
 * Interface for a single CAS result
 * @typedef {Object} IcasSingleResult
 * @property {string} rn - The CAS RN
 * @property {string} name - The name of the compound
 * @property {string} image - The image of the compound - svg
 */
export interface IcasSingleResult {
  rn: string;
  name: string;
  image: string;
}
