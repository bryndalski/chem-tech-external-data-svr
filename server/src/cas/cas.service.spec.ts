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
    test.each([['Water', 1]])(
      `Compound Name: %p return Chemistry Name: %p`,
      async (compoundName, resultsNumber) => {
        const result = await service.foundCompounds(compoundName);
        expect(result).toHaveProperty('count');
        expect(result.count).toEqual(resultsNumber);
        expect(result).toHaveProperty('results');
        expect(result.results).toHaveLength(resultsNumber);
        expect(result.results[0]).toHaveProperty('image');
        expect(result.results[0]).toHaveProperty('name');
        expect(result.results[0]).toHaveProperty('rn');
      },
    );
  });

  describe('All test should return proper chemisty names. NEGATIVE CASE', () => {
    it('finding param is not passed', async () => {
      console.log(await service.foundCompounds(''));
      expect(await service.foundCompounds('')).rejects.toThrowError(
        BadRequestException,
      );
    });

    it(`should not fund any compound`, async () => {
      const result = await service.foundCompounds(
        'asdasdasdasdasdasdasdasdasd',
      );
      expect(result).toHaveProperty('count');
      expect(result.count).toEqual(0);
      expect(result).toHaveProperty('results');
      expect(result.results).toHaveLength(0);
      expect(result.results[0]).not.toBeDefined();
    });
  });
});
