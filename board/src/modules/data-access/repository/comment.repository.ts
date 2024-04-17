import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ResponseDto } from 'common/classes'
import { ICommentItem } from 'common/interfaces'
import { PostCommentRequestDto } from 'modules/board/dto/request'
import { DataSource, Repository } from 'typeorm'
import { nowDatetime } from 'utils/date.util'
import { CommentEntity } from '../entities'

@Injectable()
export class CommentRepository {
  private readonly logger = new Logger('Comment Repository')

  constructor(
    @InjectRepository(CommentEntity)
    private readonly repository: Repository<CommentEntity>,
    private readonly dataSource: DataSource
  ) {}

  create(dto: PostCommentRequestDto, boardNo: number, email: string) {
    const { content } = dto
    try {
      return this.repository.create({
        boardNo,
        email,
        content,
        writeDatetime: nowDatetime,
      })
    } catch (e) {
      this.logger.error(e.message)
      ResponseDto.dbError()
    }
  }

  async save(commentEntity: CommentEntity) {
    try {
      await this.repository.save(commentEntity)
    } catch (e) {
      this.logger.error(e.message)
      ResponseDto.dbError()
    }
  }

  async getCommentItemList(boardNo: number) {
    try {
      const commentList: ICommentItem[] = await this.dataSource
        .createQueryBuilder()
        .select('U.nickname', 'nickname')
        .addSelect('U.profile_img', 'profileImg')
        .addSelect('C.comment_no', 'commentNo')
        .addSelect('C.content', 'content')
        .addSelect('C.write_datetime', 'writeDatetime')
        .from('comment', 'C')
        .innerJoin('user', 'U', 'C.email=U.email')
        .where('C.board_no = :boardNo', { boardNo })
        .orderBy('C.write_datetime', 'DESC')
        .getRawMany()

      return commentList
    } catch (e) {
      this.logger.error(e.message)
      ResponseDto.dbError()
    }
  }

  async deleteByBoardNo(boardNo: number) {
    try {
      return this.repository.delete({ boardNo })
    } catch (e) {
      this.logger.error(e.message)
      throw ResponseDto.dbError()
    }
  }
}
