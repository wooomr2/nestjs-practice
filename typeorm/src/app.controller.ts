import { Body, Controller, Get, InternalServerErrorException, Post, UseGuards, UseInterceptors } from '@nestjs/common'
import { AppService } from './app.service'
import { AuthGuard } from './guards/auth.guard'
import { LogInterceptor } from './interceptors/log.intercepter'
import { FreezePipe } from './pipes/freeze.pipe'
import { RequestService } from './request.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly requestService: RequestService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('/test')
  @UseInterceptors(LogInterceptor)
  @UseGuards(AuthGuard)
  middlewareTest(): string {
    const userId = this.requestService.getUserId()
    console.log(`usreId: ${userId}`)
    return this.appService.getHello()
  }

  @Post('/test/pipe')
  test(@Body(new FreezePipe()) body: any) {
    body.test = 'qbwjpqwbepoiqwhe'
    return body
  }

  @Get('/test/exception')
  testException() {
    throw new InternalServerErrorException('Internal Server Erorr')
  }
}
