import { Injectable } from '@nestjs/common';

import { ApplyOperatorProps } from './main.types';

@Injectable()
class MathService {
  static OPERATORS_PRIORITY = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
  };

  public resolveMathExpressionFromString(mathExpressionString: string): number {
    const numericValues: number[] = [];
    const mathOperators: string[] = [];

    // Remove whitespaces
    mathExpressionString = mathExpressionString.replace(/\s/g, '');

    console.log({
      mathExpressionString,
    });

    for (let i = 0; i < mathExpressionString.length; i++) {
      const stringCharacter = mathExpressionString[i];

      const isOpeningParenthesis = stringCharacter === '(';
      const isClosingParenthesis = stringCharacter === ')';
      const isMathOperator =
        MathService.OPERATORS_PRIORITY[stringCharacter] > 0;
      const isNumber = !Number.isNaN(Number.parseInt(stringCharacter));

      if (isNumber) {
        let num = '';

        // Check if the number has more than one digit
        while (
          i < mathExpressionString.length &&
          !Number.isNaN(Number.parseInt(mathExpressionString[i]))
        ) {
          num = `${num}${mathExpressionString[i]}`;
          i++;
        }

        numericValues.push(Number.parseInt(num));
      } else if (isOpeningParenthesis) {
        mathOperators.push(stringCharacter);
      } else if (isClosingParenthesis) {
        while (mathOperators[mathOperators.length - 1] !== '(') {
          const mathOperator = mathOperators.pop();
          const rightNumber = numericValues.pop();
          const leftNumber = numericValues.pop();

          const result = this.applyOperator({
            mathOperator,
            leftNumber,
            rightNumber,
          });

          numericValues.push(result);
        }
      } else if (isMathOperator) {
        while (
          mathOperators.length &&
          mathOperators[mathOperators.length - 1] !== '(' &&
          MathService.OPERATORS_PRIORITY[
            mathOperators[mathOperators.length - 1]
          ] >= MathService.OPERATORS_PRIORITY[stringCharacter]
        ) {
          const mathOperator = mathOperators.pop();
          const rightNumber = numericValues.pop();
          const leftNumber = numericValues.pop();

          const result = this.applyOperator({
            mathOperator,
            leftNumber,
            rightNumber,
          });

          numericValues.push(result);
        }

        mathOperators.push(stringCharacter);
      }
    }

    return numericValues[0];
  }

  private applyOperator({
    mathOperator,
    leftNumber,
    rightNumber,
  }: ApplyOperatorProps): number {
    switch (mathOperator) {
      case '+':
        return leftNumber + rightNumber;
      case '-':
        return leftNumber - rightNumber;
      case '*':
        return leftNumber * rightNumber;
      case '/':
        return leftNumber / rightNumber;
      default:
        throw new Error(`Unknown math operator: ${mathOperator}`);
    }
  }
}

export { MathService };
