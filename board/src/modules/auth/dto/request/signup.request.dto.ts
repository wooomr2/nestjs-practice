import { Equals, IsBoolean, IsEmail, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from "class-validator"
import { regExp } from "common/constants"

export class SignupRequestDto {

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    password: string

    @IsNotEmpty()
    nickname: string

    @IsNotEmpty()
    @Matches(regExp.TEL)
    tel: string

    @IsNotEmpty()
    address: string

    @IsOptional()
    addressDetail?: string | null

    @IsBoolean()
    @Equals(true)
    isAgreed: boolean
}