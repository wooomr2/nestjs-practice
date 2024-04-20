import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DBModule } from './db/db.module'
import { ItemModule } from './item/item.module'
import { TestMiddleware } from './middleware/test.middleware'
import { RequestService } from './request.service'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DBModule, ItemModule],
  controllers: [AppController],
  providers: [AppService, RequestService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TestMiddleware).forRoutes({ path: '/middleware-test', method: RequestMethod.GET })
  }
}
