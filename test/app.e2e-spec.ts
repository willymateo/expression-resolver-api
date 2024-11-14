import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  it('/ [GET]', async () => {
    const packageJson = await import('../package.json');

    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect({
        name: packageJson?.name,
        author: packageJson?.author,
        version: packageJson?.version,
        description: packageJson?.description,
        environment: process.env.NODE_ENV || 'development',
      });
  });

  describe('/math/resolve [POST]', () => {
    it('Succcess case', () => {
      return request(app.getHttpServer())
        .post('/math/resolve')
        .send({
          mathExpression: '10 * (2 + 5) * 10',
        })
        .expect(200)
        .expect({
          result: 700,
        });
    });

    describe('Error cases', () => {
      it('Bad request', () => {
        return request(app.getHttpServer())
          .post('/math/resolve')
          .send({})
          .expect(400)
          .expect({
            message: [
              'mathExpression should not be empty',
              'mathExpression must be a string',
            ],
            error: 'Bad Request',
            statusCode: 400,
          });
      });

      it('Unexpected token', () => {
        return request(app.getHttpServer())
          .post('/math/resolve')
          .send({
            mathExpression: '3ab6',
          })
          .expect(400)
          .expect({
            message: ["Unexpected token 'a'"],
            error: 'Bad Request',
            statusCode: 400,
          });
      });
    });
  });
});
