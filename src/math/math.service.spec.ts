import { Test, TestingModule } from '@nestjs/testing';

import { MathService } from './math.service';

describe('MathService', () => {
  let service: MathService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MathService],
    }).compile();

    service = module.get<MathService>(MathService);
  });

  describe('Success cases', () => {
    it('should return -27', () => {
      expect(
        service.resolveMathExpressionFromString('3 + 5 * (2 - 8)'),
      ).toEqual(-27);
    });

    it('should return -27', () => {
      expect(
        service.resolveMathExpressionFromString(
          '(69 + 27) + (35 / 5) * (210 - 8)',
        ),
      ).toEqual(1510);
    });
  });

  describe('Error cases', () => {
    it('Unexpected token', () => {
      expect(() => {
        service.resolveMathExpressionFromString('5ab5');
      }).toThrow("Unexpected token 'a'");
    });
  });
});
