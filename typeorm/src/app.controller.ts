import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
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

  @Get('/middleware-test')
  middlewareTest(): string {
    const userId = this.requestService.getUserId()
    console.log(`usreId: ${userId}`)
    return this.appService.getHello()
  }
}
