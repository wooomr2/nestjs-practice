import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_GUARD } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DBModule } from './db/db.module'
import { HttpExceptionFilter } from './filters/http-exception.filter'
import { ItemModule } from './item/item.module'
import { TestMiddleware } from './middleware/test.middleware'
import { RequestService } from './request.service'
import { AuthGuard } from './guards/auth.guard'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DBModule, ItemModule],
  controllers: [AppController],
  providers: [
    AppService,
    RequestService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   scope: Scope.REQUEST,
    //   useClass: LogInterceptor,
    // },
    // {
    //   provide: APP_PIPE,
    //   useClass: FreezePipe,
    // },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TestMiddleware).forRoutes({ path: '/test', method: RequestMethod.GET })
  }
}
