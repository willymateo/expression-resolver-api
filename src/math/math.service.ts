import { Injectable } from '@nestjs/common';

import { ApplyLastOperatorProps, ApplyMathOperatorProps } from './math.types';

@Injectable()
class MathService {
  private static readonly OPERATORS_PRIORITY: Record<string, number> = {
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

    for (let i = 0; i < mathExpressionString.length; i++) {
      const stringCharacter = mathExpressionString[i];

      const isOpeningParenthesis = stringCharacter === '(';
      const isClosingParenthesis = stringCharacter === ')';

      if (this.characterIsNumber(stringCharacter)) {
        let num = '';

        // Check if the number has more than one digit
        while (
          i < mathExpressionString.length &&
          !Number.isNaN(Number.parseInt(mathExpressionString[i]))
        ) {
          num = `${num}${mathExpressionString[i]}`;
          i++;
        }

        i--; // Move back one position because the final while loop
        numericValues.push(Number.parseInt(num));
      } else if (isOpeningParenthesis) {
        mathOperators.push(stringCharacter);
      } else if (isClosingParenthesis) {
        while (mathOperators[mathOperators.length - 1] !== '(') {
          this.applyLastOperator({
            numericValues,
            mathOperators,
          });
        }

        mathOperators.pop(); // Remove '('
      } else if (this.characterIsMathOperator(stringCharacter)) {
        while (
          mathOperators.length &&
          mathOperators[mathOperators.length - 1] !== '(' &&
          MathService.OPERATORS_PRIORITY[
            mathOperators[mathOperators.length - 1]
          ] >= MathService.OPERATORS_PRIORITY[stringCharacter]
        ) {
          this.applyLastOperator({
            numericValues,
            mathOperators,
          });
        }

        mathOperators.push(stringCharacter);
      } else {
        throw new Error(`Unexpected token '${stringCharacter}'`);
      }
    }

    while (mathOperators.length) {
      this.applyLastOperator({
        numericValues,
        mathOperators,
      });
    }

    return numericValues[0];
  }

  private applyLastOperator({
    mathOperators = [],
    numericValues = [],
  }: ApplyLastOperatorProps) {
    const mathOperator = mathOperators.pop();
    const rightNumber = numericValues.pop();
    const leftNumber = numericValues.pop();

    const result = this.applyMathOperator({
      mathOperator,
      leftNumber,
      rightNumber,
    });

    numericValues.push(result);
  }

  private applyMathOperator({
    mathOperator,
    leftNumber,
    rightNumber,
  }: ApplyMathOperatorProps): number {
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

  private characterIsMathOperator(stringCharacter: string): boolean {
    return stringCharacter in MathService.OPERATORS_PRIORITY;
  }

  private characterIsNumber(stringCharacter: string): boolean {
    return !Number.isNaN(Number.parseInt(stringCharacter));
  }
}

export { MathService };
