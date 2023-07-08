import { Test, TestingModule } from '@nestjs/testing';
import { PubChemController } from './pub-chem.controller';

describe('PubChemController', () => {
  let controller: PubChemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PubChemController],
    }).compile();

    controller = module.get<PubChemController>(PubChemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
