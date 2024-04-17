import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { ServeStaticModule } from '@nestjs/serve-static'
import { multerConfig, serveStaticModuleConfig } from 'configs'
import { FileController } from './file.controller'
import { FileService } from './file.service'

@Module({
  imports: [MulterModule.register(multerConfig), ServeStaticModule.forRoot(serveStaticModuleConfig)],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
