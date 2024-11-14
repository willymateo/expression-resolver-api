import { Body, Controller, Get } from '@nestjs/common';

import { ResolveDTO } from './dto/resolve.dto';
import { MathService } from './math.service';

@Controller({
  path: 'math',
})
class MathController {
  constructor(private mathService: MathService) {}

  @Get('resolve')
  resolve(@Body() { mathExpression }: ResolveDTO): any {
    const result =
      this.mathService.resolveMathExpressionFromString(mathExpression);

    return {
      result,
    };
  }
}

export { MathController };
