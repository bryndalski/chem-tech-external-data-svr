import { Test, TestingModule } from '@nestjs/testing';
import { CasService } from './cas.service';
import { HttpModule } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';

describe('CasService', () => {
  let service: CasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [CasService],
    }).compile();

    service = module.get<CasService>(CasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('All test should return proper chemisty names. POSITIVE CASE', () => {
    test.each([
      ['Water', 1],
      ['C=O', 3],
      ['aspirine', 1],
      ['C', 4],
      ['none', 0],
      ['50-78-2', 1],
    ])(
      `Compound Name: %p return Chemistry Name: %p`,
      async (compoundName, resultsNumber) => {
        const result = await service.foundCompounds(compoundName);
        expect(result).toHaveProperty('count');
        expect(result.count).toEqual(resultsNumber);
        expect(result).toHaveProperty('results');
        expect(result.results).toHaveLength(resultsNumber);
        result.results.forEach((element) => {
          expect(element).toHaveProperty('image');
          expect(element).toHaveProperty('name');
          expect(element).toHaveProperty('rn');
        });
      },
    );
  });

  describe('All test should return proper chemisty names. NEGATIVE CASE', () => {
    it(`should not fund any compound`, async () => {
      const result = await service.foundCompounds('not_existing_name');
      expect(result).toHaveProperty('count');
      expect(result.count).toEqual(0);
      expect(result).toHaveProperty('results');
      expect(result.results).toHaveLength(0);
      expect(result.results[0]).not.toBeDefined();
    });
  });
});
