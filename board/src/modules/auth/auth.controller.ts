import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SigninRequestDto, SignupRequestDto } from './dto/request'
import { SignupResponseDto } from './dto/response'
import { SigninResponseDto } from './dto/response/signin.response.dto'

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() reqBody: SignupRequestDto): Promise<SignupResponseDto> {
    return this.authService.signup(reqBody)
  }

  @Post('/signin')
  signin(@Body() reqBody: SigninRequestDto): Promise<SigninResponseDto> {
    return this.authService.signin(reqBody)
  }
}
