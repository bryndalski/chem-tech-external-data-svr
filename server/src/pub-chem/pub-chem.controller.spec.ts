import { Test, TestingModule } from '@nestjs/testing';
import { PubChemController } from './pub-chem.controller';
import { PubChemFinderService } from './pub-chem-finder.service';
import { HttpModule } from '@nestjs/axios';
import { PubChemService } from './pub-chem.service';

describe('PubChemController', () => {
  let controller: PubChemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [PubChemService, PubChemFinderService],
      controllers: [PubChemController],
    }).compile();

    controller = module.get<PubChemController>(PubChemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
