import { Body, Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { CreateUserRequest } from './dto/create-user.request'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Post()
  createUser(@Body() body: CreateUserRequest): Promise<boolean> {
    return this.appService.createUser(body)
  }
}
