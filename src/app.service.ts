import { Injectable } from '@nestjs/common';

import { AppInfo } from './app.types';

@Injectable()
export class AppService {
  async getAppInfo(): Promise<AppInfo> {
    const packageJson = await import('../package.json');

    return {
      name: packageJson?.name,
      author: packageJson?.author,
      version: packageJson?.version,
      description: packageJson?.description,
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
