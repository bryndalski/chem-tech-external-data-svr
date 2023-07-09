import { Test, TestingModule } from '@nestjs/testing';
import { PubChemService } from './pub-chem.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { PubChemFinderService } from './pub-chem-finder.service';

describe('PubChemService', () => {
  let service: PubChemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [PubChemService, PubChemFinderService],
    }).compile();

    service = module.get<PubChemService>(PubChemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
