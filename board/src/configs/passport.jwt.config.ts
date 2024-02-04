import { IAuthModuleOptions } from "@nestjs/passport";

export const passportJwtConfig: IAuthModuleOptions<any> = {
    defaultStrategy: 'jwt'
}