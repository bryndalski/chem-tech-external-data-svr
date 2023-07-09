import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PubChemFinderService } from './pub-chem-finder.service';

@Injectable()
export class PubChemService {
  private logger: Logger;
  constructor(
    private readonly httpService: HttpService,
    private readonly pubChemFinderService: PubChemFinderService,
  ) {
    this.logger = new Logger(PubChemService.name);
  }

  public async findCASByCompoundName(compoundName: string) {
    try {
      const CID = await this.pubChemFinderService.findBestMatchingCompound(
        compoundName,
      );
      const { data } = await this.httpService.axiosRef.get(
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/${CID}/JSON/`,
      );
      this.logger.log({ CID, data });
      this.getRequiredPubChemData(data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
    }
  }

  private getRequiredPubChemData(data: any) {
    try {
      this.logger.debug({
        method: 'getRequiredPubChemData',
        referenceNumber: data.Record.Reference[2],
        recordTitle: data.Record.RecordTitle,
      });
    } catch (error) {
      this.logger.error({
        method: 'getRequiredPubChemData',
        error,
      });
    }
  }
}
