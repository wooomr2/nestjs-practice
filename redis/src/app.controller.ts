import { CacheInterceptor } from '@nestjs/cache-manager'
import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { AppService } from './app.service'

/** Return cached Api Result */
@UseInterceptors(CacheInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    // return this.appService.getHello()
    return this.appService.testCache()
  }
}
