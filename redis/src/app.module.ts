import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import * as redisStore from 'cache-manager-redis-store'
import { RedisClientOptions } from 'redis'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { APP_INTERCEPTOR } from '@nestjs/core'

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),

    /** !! does not support redis v4:: downgraded to v3 will be fixed soon */
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      socket: {
        host: 'localhost',
        port: 6379,
      },
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
