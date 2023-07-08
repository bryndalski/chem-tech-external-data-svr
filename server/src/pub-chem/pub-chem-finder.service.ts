import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { FindBestMatchingCompoundDTO } from './DTO';
import { Axios, AxiosError } from 'axios';

@Injectable()
export class PubChemFinderService {
  private logger: Logger;
  constructor(private readonly httpService: HttpService) {
    this.logger = new Logger(PubChemFinderService.name);
  }

  /**
   * Finds compound id to look for in PubChemDatabase
   * @param param0
   */
  public async findBestMatchingCompound(compoundName: string) {
    try {
      this.logger.log({
        method: 'findBestMatchingCompound',
        message: 'Finding best matching compound',
        arguments: {
          compoundName,
        },
      });
      const { data } = await this.httpService.axiosRef.get(
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug/concepts/name/JSON?name=${compoundName}`,
      );
      this.logger.log({
        method: 'findBestMatchingCompound',
        message: 'Received positive response from pub chem',
      });
      const CID = this.getConceptCID(data);
      this.logger.log({
        method: 'findBestMatchingCompound',
        message: 'Extracted CID from pub chem',
        arguments: {
          CID,
          compoundName,
        },
      });

      return CID;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response.status === 404) {
          this.logger.warn({
            method: 'findBestMatchingCompound',
            message: 'Could not find compound in pub chem',
            arguments: {
              compoundName,
            },
          });
          throw new NotFoundException();
        }
      }
      this.logger.error({
        method: 'findBestMatchingCompound',
        message: 'Error finding best matching compound',
        error,
      });
      throw new InternalServerErrorException();
    }
  }

  /**
   * @private
   * @bryndalski
   * @param data Response from pub chem
   * @returns CID for the compound
   * @description Gets the CID for the compound
   */
  private getConceptCID(data: any) {
    try {
      this.logger.log({
        method: 'getConceptCID',
        message: 'Extracting CID from pub chem',
      });
      return data['ConceptsAndCIDs']['CID'][0];
    } catch (error) {
      if (error instanceof TypeError) {
        this.logger.error({
          method: 'getConceptId',
          message: 'Could not get CID of compound. TYPE ERROR',
          params: {
            data,
          },
        });
        throw new InternalServerErrorException();
      }
      this.logger.error({
        method: 'getConceptId',
        message: 'Error getting concept id',
        error,
      });
      throw new InternalServerErrorException();
    }
  }
}
