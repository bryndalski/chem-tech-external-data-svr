import { Module } from '@nestjs/common';
import { PubChemService } from './pub-chem.service';
import { PubChemController } from './pub-chem.controller';
import { HttpModule } from '@nestjs/axios';
import { PubChemFinderService } from './pub-chem-finder.service';

@Module({
  imports: [HttpModule],
  providers: [PubChemService, PubChemFinderService],
  controllers: [PubChemController],
})
export class PubChemModule {}
