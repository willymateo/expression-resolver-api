import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { MathModule } from './math/math.module';
import { AppService } from './app.service';

@Module({
  imports: [MathModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
