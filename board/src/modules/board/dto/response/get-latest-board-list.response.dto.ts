import { BadRequestException } from "@nestjs/common";
import { ResponseDto } from "common/classes";
import { ResCode, ResMessage } from "common/enums";
import { BoardListViewEntity } from "modules/data-access/entities";

export class GetLatestBoardListResponseDto extends ResponseDto {

    private boardList: BoardListViewEntity[]

    constructor(boardList: BoardListViewEntity[]) {
        super(ResCode.SUCCESS, ResMessage.SUCCESS)
        this.boardList = [...boardList]
    }

    static success(boardList: BoardListViewEntity[]) {
        return new GetLatestBoardListResponseDto(boardList)
    }

    static noExistBoard() {
        return new BadRequestException(ResCode.NO_EXIST_BOARD, ResMessage.NO_EXIST_BOARD)
    }
}