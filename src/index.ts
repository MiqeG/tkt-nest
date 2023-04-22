// #2 Nest (with @nestjs/platform-express)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const port = 3001;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error'] });
  app.enableCors();
  await app.listen(port);
  console.log('SERVER STARTED ON PORT : ', port);
}
bootstrap();
