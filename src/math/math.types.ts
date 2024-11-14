export type AnalyzeDigitsInMathExpressionProps = {
  mathExpressionString: string;
  numericValues: number[];
  i: number;
};

export type AnalyzeClosingParenthesisProps = {
  mathOperators: string[];
  numericValues: number[];
};

export type AnalyzeMathOperatorProps = {
  mathOperators: string[];
  numericValues: number[];
  stringCharacter: string;
};

export type ApplyLastOperatorProps = {
  mathOperators: string[];
  numericValues: number[];
};

export type ApplyMathOperatorProps = {
  leftNumber: number;
  rightNumber: number;
  mathOperator: string;
};
