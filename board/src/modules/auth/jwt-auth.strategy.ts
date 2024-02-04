import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { config } from "dotenv";
import { ExtractJwt, Strategy } from "passport-jwt";

config()

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            secretOrKey: process.env.SECRET_KEY,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload: any) {
        const { sub: email } = payload
        return email
    }


}
