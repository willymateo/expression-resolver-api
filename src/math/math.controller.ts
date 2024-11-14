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
    try {
      const result =
        this.mathService.resolveMathExpressionFromString(mathExpression);

      return {
        result,
      };
    } catch (error) {
      console.log('Error resolving math expresssion from string', error);

      return {
        error: error?.message,
      };
    }
  }
}

export { MathController };
