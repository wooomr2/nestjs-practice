import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from 'app.controller'
import { AppService } from 'app.service'
import { typeOrmMysqlConfig } from 'configs'
import { AuthModule, BoardModule, DataAccessModule, FileModule, UserModule } from 'modules'

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmMysqlConfig),
    AuthModule,
    BoardModule,
    UserModule,
    FileModule,
    DataAccessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
