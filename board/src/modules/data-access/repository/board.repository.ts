import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ResponseDto } from 'common/classes'
import { IBoardItem } from 'common/interfaces'
import { PatchBoardRequestDto, PostBoardRequestDto } from 'modules/board/dto/request'
import { DataSource, Repository } from 'typeorm'
import { nowDatetime } from 'utils/date.util'
import { BoardEntity } from '../entities'

@Injectable()
export class BoardRepository {
  private readonly logger = new Logger('Board Repository')

  constructor(
    @InjectRepository(BoardEntity)
    private readonly repository: Repository<BoardEntity>,
    private readonly dataSource: DataSource
  ) {}

  create({ title, content }: PostBoardRequestDto, email: string) {
    try {
      return this.repository.create({
        email,
        title,
        content,
        writeDatetime: nowDatetime,
      })
    } catch (e) {
      this.logger.error(e.message)
      throw ResponseDto.dbError()
    }
  }

  async save(boardEntity: BoardEntity) {
    try {
      return await this.repository.save(boardEntity)
    } catch (e) {
      this.logger.error(e.message)
      throw ResponseDto.dbError()
    }
  }

  async getBoardItem(boardNo: number) {
    try {
      const boardItem: IBoardItem = await this.dataSource
        .createQueryBuilder()
        .select('B.board_no', 'boardNo')
        .addSelect('B.title', 'title')
        .addSelect('B.content', 'content')
        .addSelect('B.write_datetime', 'writeDatetime')
        .addSelect('B.email', 'email')
        .addSelect('B.favorite_cnt', 'favoriteCnt')
        .addSelect('B.comment_cnt', 'commentCnt')
        .addSelect('B.view_cnt', 'viewCnt')
        .addSelect('U.nickname', 'nickname')
        .from('board', 'B')
        .innerJoin('user', 'U', 'B.email=U.email')
        .where('B.board_no = :boardNo', { boardNo })
        .getRawOne()

      return boardItem
    } catch (e) {
      this.logger.error(e.message)
      throw ResponseDto.dbError()
    }
  }

  async findByBoardNo(boardNo: number) {
    try {
      return await this.repository.findOneBy({ boardNo })
    } catch (e) {
      this.logger.error(e.message)
      throw ResponseDto.dbError()
    }
  }

  async findByBoardNoAndEmail(boardNo: number, email: string) {
    try {
      return await this.repository.findOneBy({ boardNo, email })
    } catch (e) {
      this.logger.error(e.message)
      throw ResponseDto.dbError()
    }
  }

  async update(dto: PatchBoardRequestDto, boardNo: number, email: string) {
    const { title, content } = dto

    try {
      return await this.repository.update({ boardNo, email }, { title, content })
    } catch (e) {
      this.logger.error(e.message)
      throw ResponseDto.dbError()
    }
  }

  async delete(boardEntity: BoardEntity) {
    try {
      const result = await this.repository.delete(boardEntity)

      return result
    } catch (e) {
      this.logger.error(e.message)
      throw ResponseDto.dbError()
    }
  }

  async increaseCommentCnt(boardNo: number, email: string) {
    try {
      await this.repository.update({ boardNo, email }, { commentCnt: () => 'comment_cnt + 1' })
    } catch (e) {
      this.logger.error(e.message)
      throw ResponseDto.dbError()
    }
  }

  async increaseViewCnt(boardNo: number) {
    try {
      await this.repository.update({ boardNo }, { viewCnt: () => 'view_cnt + 1' })
    } catch (e) {
      this.logger.error(e.message)
      throw ResponseDto.dbError()
    }
  }
}
