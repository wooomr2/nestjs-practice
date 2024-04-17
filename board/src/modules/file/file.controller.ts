import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { config } from 'dotenv'
import { FileService } from './file.service'
import { Response } from 'express'

config()

@Controller('/api/v1/file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File): string {
    console.log(file)
    const url = process.env.FILE_URL + file.filename
    return url
  }

  @Get('/:filename')
  getImage(@Param('filename') filename: string, @Res() res: Response): any {
    return res.sendFile(process.env.FILE_PATH + filename)
  }
}
