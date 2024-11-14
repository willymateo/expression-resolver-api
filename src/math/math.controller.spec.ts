import { Test, TestingModule } from '@nestjs/testing';

import { MathController } from './math.controller';
import { MathService } from './math.service';

describe('MathController', () => {
  let controller: MathController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MathController],
      providers: [MathService],
    }).compile();

    controller = module.get<MathController>(MathController);
  });

  describe('/math/resolve', () => {
    it('should return -27', () => {
      expect(
        controller.resolve({
          mathExpression: '3 + 5 * (2 - 8)',
        }),
      ).toEqual({
        result: -27,
      });
    });

    describe('Error cases', () => {
      it('Unexpected token', () => {
        expect(
          controller.resolve({
            mathExpression: '5ab5',
          }),
        ).toEqual({
          error: "Unexpected token 'a'",
        });
      });
    });
  });
});
