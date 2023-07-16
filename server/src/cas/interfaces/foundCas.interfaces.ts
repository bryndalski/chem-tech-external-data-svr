import { IcasSingleResult } from './singleCasResult.interface';

/**
 * Interface for the response of the CAS search
 * @typedef {Object} IfoundCas
 * @property {number} count - The number of results
 * @property {IcasSingleResult[]} results - The results
 */
export interface IfoundCas {
  count: number;
  results: IcasSingleResult[];
}
