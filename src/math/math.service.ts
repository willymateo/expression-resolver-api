import { Injectable } from '@nestjs/common';

@Injectable()
class MathService {
  resolve(mathExpressionString: string): number {
    console.log({
      mathExpressionString,
    });

    return 0;
  }
}

export { MathService };
