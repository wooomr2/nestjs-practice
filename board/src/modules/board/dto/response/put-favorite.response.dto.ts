import { BadRequestException } from '@nestjs/common'
import { ResponseDto } from 'common/classes'
import { ResCode, ResMessage } from 'common/enums'

export class PutFavoriteResponseDto extends ResponseDto {
  constructor() {
    super(ResCode.SUCCESS, ResMessage.SUCCESS)
  }

  static success() {
    return new PutFavoriteResponseDto()
  }

  static noExistBoard() {
    return new BadRequestException(ResCode.NO_EXIST_BOARD, ResMessage.NO_EXIST_BOARD)
  }
}
