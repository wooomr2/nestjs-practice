import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninRequestDto, SignupRequestDto } from './dto/request';
import { SignupResponseDto } from './dto/response';
import { SigninResponseDto } from './dto/response/signin.response.dto';

@Controller('/api/v1/auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('/signup')
    signup(@Body() reqBody: SignupRequestDto): Promise<SignupResponseDto> {
        const response = this.authService.signup(reqBody)
        return response
    }

    @Post('/signin')
    signin(@Body() reqBody: SigninRequestDto): Promise<SigninResponseDto> {
        const response = this.authService.signin(reqBody)
        return response
    }

}
