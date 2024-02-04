import { BadRequestException } from "@nestjs/common";
import { ResponseDto } from "common/classes";
import { ResCode, ResMessage } from "common/enums";
import { ICommentItem } from "common/interfaces";

export class GetCommentListResponseDto extends ResponseDto {

    private commentList: ICommentItem[]

    constructor(commentList: ICommentItem[]) {
        super(ResCode.SUCCESS, ResMessage.SUCCESS)
        this.commentList = [...commentList]
    }

    static success(commentList: ICommentItem[]) {
        return new GetCommentListResponseDto(commentList)
    }

    static noExistBoard() {
        return new BadRequestException(ResCode.NO_EXIST_BOARD, ResMessage.NO_EXIST_BOARD)
    }
}