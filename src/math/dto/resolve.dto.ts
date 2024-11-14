import { IsNotEmpty, IsString } from 'class-validator';

class ResolveDTO {
  @IsString()
  @IsNotEmpty()
  mathExpression: string;
}

export { ResolveDTO };
