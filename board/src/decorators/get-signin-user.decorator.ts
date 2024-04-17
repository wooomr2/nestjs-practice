import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const GetSigninUser = createParamDecorator((data, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest()

  console.log(req.user) // email
  return req.user
})
