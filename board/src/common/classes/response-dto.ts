import { InternalServerErrorException } from "@nestjs/common";
import { ResCode, ResMessage } from "common/enums";

export class ResponseDto {
    constructor(
        private readonly code: ResCode,
        private readonly message: ResMessage) { }

    static internalServerError() {
        return new InternalServerErrorException(ResCode.INTERNAL_SERVER_ERROR, ResMessage.INTERNAL_SERVER_ERROR)
    }

    static dbError() {
        return new InternalServerErrorException(ResCode.DB_ERROR, ResMessage.DB_ERROR)
    }
}