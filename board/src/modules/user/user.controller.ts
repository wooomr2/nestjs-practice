import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { GetSigninUserResponseDto, GetUserResponseDto } from './dto/response'
import { GetSigninUser } from 'decorators'
import { JwtAuthGuard } from 'guards/jwt-auth.guard'

@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:email')
  getUser(@Param('email') email: string): Promise<GetUserResponseDto> {
    return this.userService.getUser(email)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getSigninUser(@GetSigninUser() email: string): Promise<GetSigninUserResponseDto> {
    return this.userService.getSigninUser(email)
  }
}
