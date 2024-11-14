import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { AppInfo } from './app.types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAppInfo(): Promise<AppInfo> {
    return await this.appService.getAppInfo();
  }
}
