import {
  HttpException,
  Controller,
  HttpStatus,
  HttpCode,
  Body,
  Post,
} from '@nestjs/common';

import { ResolveDTO } from './dto/resolve.dto';
import { MathService } from './math.service';

@Controller({
  path: 'math',
})
class MathController {
  constructor(private mathService: MathService) {}

  @Post('resolve')
  @HttpCode(HttpStatus.OK)
  resolve(@Body() { mathExpression }: ResolveDTO): any {
    try {
      const result =
        this.mathService.resolveMathExpressionFromString(mathExpression);

      return {
        result,
      };
    } catch (error) {
      console.log('Error resolving math expresssion from string', error);

      throw new HttpException(
        {
          message: [error?.message],
          error: 'Bad Request',
          statusCode: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

export { MathController };
