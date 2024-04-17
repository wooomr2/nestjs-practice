import { UnauthorizedException } from '@nestjs/common'
import { ResponseDto } from 'common/classes'
import { preDefine } from 'common/constants'
import { ResCode, ResMessage } from 'common/enums'

export class SigninResponseDto extends ResponseDto {
  private token: string
  private expirationTime: number

  constructor(token: string) {
    super(ResCode.SUCCESS, ResMessage.SUCCESS)
    this.token = token
    this.expirationTime = preDefine.ACCESS_TOKEN_EXPIRE_TIME
  }

  static success(token: string) {
    return new SigninResponseDto(token)
  }

  static siginFail() {
    return new UnauthorizedException(ResCode.SIGN_IN_FAIL, ResMessage.SIGN_IN_FAIL)
  }
}
