import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DBModule } from './db/db.module'
import { ItemModule } from './item/item.module'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DBModule, ItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
