import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ResCode } from 'common/enums/res-code'
import { ResMessage } from 'common/enums/res-message'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context)
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
    // console.log({ err, user, info, context, status })
    if (err || !user) {
      throw err || new UnauthorizedException(ResCode.AUTHORIZATION_FAIL, ResMessage.AUTHORIZATION_FAIL)
    }

    return user
  }
}
