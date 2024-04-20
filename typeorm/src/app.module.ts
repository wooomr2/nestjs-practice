import { MiddlewareConsumer, Module, NestModule, RequestMethod, Scope } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DBModule } from './db/db.module'
import { AuthGuard } from './guards/auth.guard'
import { LogInterceptor } from './interceptors/log.intercepter'
import { ItemModule } from './item/item.module'
import { TestMiddleware } from './middleware/test.middleware'
import { FreezePipe } from './pipes/freeze.pipe'
import { RequestService } from './request.service'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DBModule, ItemModule],
  controllers: [AppController],
  providers: [
    AppService,
    RequestService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   scope: Scope.REQUEST,
    //   useClass: LogInterceptor,
    // },
    // {
    //   provide: APP_PIPE,
    //   useClass: FreezePipe,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TestMiddleware).forRoutes({ path: '/test', method: RequestMethod.GET })
  }
}
