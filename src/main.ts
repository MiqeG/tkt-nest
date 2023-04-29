import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';
import cors from 'cors';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.init();
  app.use(cors());
  app.enableCors();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({
    app: expressApp,
  });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
