import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'
import { DatabaseService } from './database.service'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          uri:
            configService.getOrThrow('NODE_ENV') === 'test'
              ? configService.getOrThrow('MONGO_URI_TEST')
              : configService.getOrThrow('MONGO_URI'),
        }
      },
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
