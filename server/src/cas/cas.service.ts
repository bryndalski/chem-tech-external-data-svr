import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { IfoundCas } from './interfaces';
import { AxiosError } from 'axios';

@Injectable()
export class CasService {
  private logger: Logger;
  constructor(private httpService: HttpService) {
    this.logger = new Logger(CasService.name);
  }

  /**
   * @typedef {Object } IfoundCas
   * @property {number} count - The number of results
   * @property {IcasSingleResult[]} results - The results
   */
  /**
   * Finds matching compound from cas api
   * @description: Find all matching compounds from cas api
   * @param {string} findCompound - The compound to find
   * @returns {Promise<IfoundCas>} - The results
   * @bryndalski
   * @example
   * const result = await service.foundCompounds('Water') - will return {count: 1, results: [{rn: '7732-18-5', name: 'Water', image: 'https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=962&width=300&height=300'}]
   * @category CasService
   * @public
   */
  public async foundCompounds(findCompound: string): Promise<IfoundCas> {
    try {
      if (!findCompound) {
        throw new BadRequestException('findCompound is empty');
      }
      this.logger.log({
        method: 'foundCompounds',
        message: 'Finding best matching compound',
        arguments: {
          findCompound,
        },
      });
      const { data } = await this.httpService.axiosRef.get(
        `https://rboq1qukh0.execute-api.us-east-2.amazonaws.com/default/search`,
        {
          params: {
            q: findCompound,
            offset: 0,
            size: 30,
          },
        },
      );
      this.logger.log({
        method: 'foundCompounds',
        message: 'Received positive response from pub chem',
        arguments: {
          totalNumber: data.count,
        },
      });
      if ('results' in data && 'count' in data) {
        this.logger.log({
          method: 'foundCompounds',
          message: 'Found compound name match required format',
        });
        return data as IfoundCas;
      } else throw new TypeError('data is not instance of IfoundCas');
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.response.status) {
          case 404:
            this.logger.warn({
              method: 'foundCompounds',
              message: 'Compound not found',
              arguments: {
                findCompound,
                error,
              },
            });
            return { results: [], count: 0 };
          case 400:
            this.logger.error({
              method: 'foundCompounds',
              message: 'Bad request',
              arguments: {
                findCompound,
                error: {
                  url: error.config.url,
                  message: error.message,
                },
              },
            });
            throw new BadRequestException();
          default:
            this.logger.error({
              method: 'foundCompounds',
              message:
                'Error while finding compounds. Internal server error on provider side',
              arguments: { error, findCompound },
            });
        }
      }
      if (error instanceof BadRequestException) {
        this.logger.error({
          method: 'foundCompounds',
          message: 'Bad request',
          arguments: {
            findCompound,
            error: {
              message: error.message,
            },
          },
        });
        throw error;
      }
      this.logger.error({
        method: 'foundCompounds',
        message: 'Error while finding compounds',
        arguments: {
          error,
        },
      });
      throw new InternalServerErrorException();
    }
  }
}
