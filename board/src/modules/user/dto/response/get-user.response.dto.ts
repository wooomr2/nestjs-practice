import { BadRequestException } from "@nestjs/common"
import { UserEntity } from "modules/data-access/entities"
import { ResponseDto } from "common/classes"
import { ResCode, ResMessage } from "common/enums"

export class GetUserResponseDto extends ResponseDto {

    private email: string
    private nickname: string
    private profileImg: string | null

    constructor({ email, nickname, profileImg }: UserEntity) {
        super(ResCode.SUCCESS, ResMessage.SUCCESS)
        this.email = email
        this.nickname = nickname
        this.profileImg = profileImg
    }

    static success(user: UserEntity) {
        return new GetUserResponseDto(user)
    }

    static noExistUser() {
        return new BadRequestException(ResCode.NO_EXIST_USER, ResMessage.NO_EXIST_USER)
    }
}