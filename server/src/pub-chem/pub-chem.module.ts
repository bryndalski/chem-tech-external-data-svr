import { Module } from '@nestjs/common';
import { PubChemController } from './pub-chem.controller';
import { HttpModule } from '@nestjs/axios';
import { PubChemFinderService } from './pub-chem-finder.service';

@Module({
  imports: [HttpModule],
  providers: [PubChemFinderService],
  controllers: [PubChemController],
})
export class PubChemModule {}
