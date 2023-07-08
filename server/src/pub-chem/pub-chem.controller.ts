import { Controller, Get, Param } from '@nestjs/common';
import { PubChemFinderService } from './pub-chem-finder.service';
import { PubChemService } from './pub-chem.service';
import { ApiParam } from '@nestjs/swagger';

@Controller('pub-chem')
export class PubChemController {
  constructor(
    private readonly pubChemService: PubChemService,
    private readonly pubChemFinderService: PubChemFinderService,
  ) {}
  @Get('PubChemBestGuess/:PubChemID')
  @ApiParam({
    name: 'PubChemID',
    description: 'The PubChem ID of the compound to search for',
    required: true,
  })
  async getPubChemBestGuess(@Param('PubChemID') PubChemID: string) {
    return await this.pubChemService.findCASByCompoundName(PubChemID);
  }
}
