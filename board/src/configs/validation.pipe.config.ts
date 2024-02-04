import { BadRequestException, ValidationPipeOptions } from "@nestjs/common";
import { ResponseDto } from "common/classes";
import { ResCode, ResMessage } from "common/enums";

export const validationPipeConfig: ValidationPipeOptions = {
    dismissDefaultMessages: false,
    exceptionFactory: () => {
        return new BadRequestException(ResCode.VALIDATION_FAIL, ResMessage.VALIDATION_FAIL)
    }
}