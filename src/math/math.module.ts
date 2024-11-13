import { Module } from '@nestjs/common';

import { MathService } from './math.service';
import { MathController } from './math.controller';

@Module({
  providers: [MathService],
  controllers: [MathController],
})
export class MathModule {}
