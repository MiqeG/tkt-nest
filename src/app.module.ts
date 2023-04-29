import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger_middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: '', method: RequestMethod.GET },
        { path: 'login', method: RequestMethod.GET },
        { path: 'login', method: RequestMethod.POST },
        'login/(.*)',
      )
      .forRoutes('*');
  }
}
