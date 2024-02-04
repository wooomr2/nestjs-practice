import { JwtModuleOptions } from "@nestjs/jwt";
import { config } from 'dotenv';
import { preDefine } from "common/constants";

config()

export const jwtConfig: JwtModuleOptions = {
    secret: process.env.SECRET_KEY,
    signOptions: {
        expiresIn: preDefine.ACCESS_TOKEN_EXPIRE_TIME,
    }
}