import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { config } from 'dotenv'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { UserModule } from './user/user.module'

config()

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
