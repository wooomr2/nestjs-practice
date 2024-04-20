import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    console.log('authGuard')
    return true
  }
}
