import { Body, Controller, Get } from '@nestjs/common';

import { MathService } from './math.service';

@Controller({
  path: 'math',
})
class MathController {
  constructor(private mathService: MathService) {}

  @Get('resolve')
  resolve(@Body() { stringExpression = '' }: any): any {
    const result = this.mathService.resolve(stringExpression);

    return {
      result,
    };
  }
}

export { MathController };
