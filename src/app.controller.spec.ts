import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return the app info', async () => {
      const packageJson = await import('../package.json');
      const appInfo = await appController.getAppInfo();

      expect(appInfo).toEqual({
        name: packageJson?.name,
        author: packageJson?.author,
        version: packageJson?.version,
        description: packageJson?.description,
        environment: process.env.NODE_ENV || 'development',
      });
    });
  });
});
