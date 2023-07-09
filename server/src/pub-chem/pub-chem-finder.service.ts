import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { IfindBestMatchingCompoundInterface } from './interfaces/findBestCoumpoind.interface';
import { uuid } from 'uuidv4';

@Injectable()
export class PubChemFinderService {
  private logger: Logger;
  constructor(private readonly httpService: HttpService) {
    this.logger = new Logger(PubChemFinderService.name);
  }

  /**
   * Finds compound id to look for in PubChemDatabase
   * @param {string} compoundName look for in PubChemDatabase
   * @returns compoundChemName
   * @throws NotFoundException
   * @throws InternalServerErrorException
   * @throws TypeError
   * @example
   *  const result = await service.findBestMatchingCompound("h2o") returns {compoundChemName: "Water"}
   */
  public async findBestMatchingCompound(
    compoundName: string,
  ): Promise<IfindBestMatchingCompoundInterface> {
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
      const compoundChemName =
        data['ConceptsAndCIDs']['Concept'][0]['ConceptName'];
      this.logger.log({
        method: 'findBestMatchingCompound',
        message: 'Found compound name',
        arguments: {
          compoundChemName,
        },
      });
      return { compoundChemName };
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
      if (error instanceof TypeError) {
        this.logger.error({
          method: 'findBestMatchingCompound',
          message: 'Type error. Possible data structure change in pub chem',
          error,
        });
        throw new InternalServerErrorException();
      }
      const errorId = uuid();
      this.logger.error({
        method: 'findBestMatchingCompound',
        message: 'Error finding best matching compound',
        error,
        errorId,
      });
      throw new InternalServerErrorException(errorId);
    }
  }
}
