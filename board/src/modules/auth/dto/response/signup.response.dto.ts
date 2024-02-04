import { BadRequestException } from "@nestjs/common"
import { ResponseDto } from "common/classes"
import { ResCode, ResMessage } from "common/enums"

export class SignupResponseDto extends ResponseDto {

    constructor() {
        super(ResCode.SUCCESS, ResMessage.SUCCESS)
    }

    static success() {
        return new SignupResponseDto()
    }

    static duplicateEmail() {
        return new BadRequestException(ResCode.DUPLICATE_EMAIL, ResMessage.DUPLICATE_EMAIL)
    }

    static duplicateNickname() {
        return new BadRequestException(ResCode.DUPLICATE_NICKNAME, ResMessage.DUPLICATE_NICKNAME)
    }

    static duplicateTel() {
        return new BadRequestException(ResCode.DUPLICATE_TEL, ResMessage.DUPLICATE_TEL)
    }
}