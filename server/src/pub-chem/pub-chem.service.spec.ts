import { Test, TestingModule } from '@nestjs/testing';
import { PubChemService } from './pub-chem.service';

describe('PubChemService', () => {
  let service: PubChemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PubChemService],
    }).compile();

    service = module.get<PubChemService>(PubChemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
