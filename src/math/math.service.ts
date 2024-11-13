import { Injectable } from '@nestjs/common';

@Injectable()
class MathService {
  resolve(stringExpression: string): number {
    console.log({
      stringExpression,
    });

    return 0;
  }
}

export { MathService };
