import { BadRequestException } from "@nestjs/common";
import { ResponseDto } from "common/classes";
import { ResCode, ResMessage } from "common/enums";
import { IBoardItem } from "common/interfaces";

export class GetBoardResponseDto extends ResponseDto {

    private boardItem: IBoardItem
    private imageUrlList: string[]

    constructor(boardItem: IBoardItem, imageUrlList: string[]) {
        super(ResCode.SUCCESS, ResMessage.SUCCESS)
        this.boardItem = boardItem
        this.imageUrlList = imageUrlList
    }

    static success(boardItem: IBoardItem, imageUrlList: string[]) {
        return new GetBoardResponseDto(boardItem, imageUrlList)
    }

    static noExistBoard() {
        return new BadRequestException(ResCode.NO_EXIST_BOARD, ResMessage.NO_EXIST_BOARD)
    }
}