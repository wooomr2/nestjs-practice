import { BadRequestException } from '@nestjs/common'
import { ResponseDto } from 'common/classes'
import { ResCode, ResMessage } from 'common/enums'
import { IFavoriteItem } from 'common/interfaces'

export class GetFavoriteListResponseDto extends ResponseDto {
  private favoriteList: IFavoriteItem[]

  constructor(favoriteList: IFavoriteItem[]) {
    super(ResCode.SUCCESS, ResMessage.SUCCESS)
    this.favoriteList = favoriteList
  }

  static success(favoriteList: IFavoriteItem[]) {
    return new GetFavoriteListResponseDto(favoriteList)
  }

  static noExistBoard() {
    return new BadRequestException(ResCode.NO_EXIST_BOARD, ResMessage.NO_EXIST_BOARD)
  }
}
