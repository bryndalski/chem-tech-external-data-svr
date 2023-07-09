import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { PubChemFinderService } from './pub-chem-finder.service';
import { NotFoundException } from '@nestjs/common';

describe('PubChemFinderService', () => {
  let service: PubChemFinderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [PubChemFinderService],
    }).compile();

    service = module.get<PubChemFinderService>(PubChemFinderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('All test should return proper chemisty names. POSITIVE CASE', () => {
    test.each([['H2O', 'Water']])(
      `Compound Name: %p return Chemistry Name: %p`,
      async (compoundName, compoundChemName) => {
        const result = await service.findBestMatchingCompound(compoundName);
        expect(result).toEqual({ compoundChemName });
      },
    );
  });

  describe('Expecting compound NOT to be found', () => {
    it('should throw NotFoundException', async () => {
      expect(service.findBestMatchingCompound('NOTHING')).rejects.toThrow(
        NotFoundException,
      );
    });
    it('should throw NotFoundException', async () => {
      expect(service.findBestMatchingCompound(undefined)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
