import { Injectable } from '@nestjs/common'
import { BoardEntity, ImageEntity } from 'modules/data-access/entities'
import {
  BoardListViewRepository,
  BoardRepository,
  CommentRepository,
  FavoriteRepository,
  ImageRepository,
  UserRepository,
} from 'modules/data-access/repository'
import { PatchBoardRequestDto, PostBoardRequestDto, PostCommentRequestDto } from './dto/request'
import {
  DeleteBoardResponseDto,
  GetBoardResponseDto,
  GetFavoriteListResponseDto,
  PatchBoardResponseDto,
  PostBoardResponseDto,
  PostCommentResponseDto,
  PutFavoriteResponseDto,
} from './dto/response'
import { GetCommentListResponseDto } from './dto/response/get-comment-list.response.dto'
import { GetLatestBoardListResponseDto } from './dto/response/get-latest-board-list.response.dto'

@Injectable()
export class BoardService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly boardRepository: BoardRepository,
    private readonly imageRepository: ImageRepository,
    private readonly commentRepository: CommentRepository,
    private readonly favoriteRepository: FavoriteRepository,
    private readonly boardListiewRepository: BoardListViewRepository
  ) {}

  async postBoard(dto: PostBoardRequestDto, email: string): Promise<PostBoardResponseDto> {
    const { imageUrlList } = dto

    const isUserExist = await this.userRepository.existsByEmail(email)
    if (!isUserExist) throw PostBoardResponseDto.noExistUser()

    const boardEntity: BoardEntity = this.boardRepository.create(dto, email)
    const board = await this.boardRepository.save(boardEntity)

    const imageEntities: ImageEntity[] = this.imageRepository.bulkCreate(imageUrlList, board.boardNo)
    await this.imageRepository.saveAll(imageEntities)

    return PostBoardResponseDto.success()
  }

  async getLatestBoardList(): Promise<GetLatestBoardListResponseDto> {
    const boardList = await this.boardListiewRepository.findLatestList()

    return GetLatestBoardListResponseDto.success(boardList)
  }

  async getBoard(boardNo: number): Promise<GetBoardResponseDto> {
    const boardItem = await this.boardRepository.getBoardItem(boardNo)
    if (!boardItem) throw GetBoardResponseDto.noExistBoard()

    const images: ImageEntity[] = await this.imageRepository.findByBoardNo(boardNo)
    const imageUrlList = images.map(i => i.url)

    await this.boardRepository.increaseViewCnt(boardNo)

    return GetBoardResponseDto.success(boardItem, imageUrlList)
  }

  async patchBoard(dto: PatchBoardRequestDto, boardNo: number, email: string): Promise<PatchBoardResponseDto> {
    const { imageUrlList } = dto

    const boardItem = await this.boardRepository.update(dto, boardNo, email)
    if (!boardItem) throw PatchBoardResponseDto.noExistBoard()

    await this.imageRepository.deleteByBoardNo(boardNo)

    const imageEntities: ImageEntity[] = this.imageRepository.bulkCreate(imageUrlList, boardNo)
    await this.imageRepository.saveAll(imageEntities)

    return PatchBoardResponseDto.success()
  }

  async deleteBoard(boardNo: number, email: string): Promise<DeleteBoardResponseDto> {
    const board = await this.boardRepository.findByBoardNoAndEmail(boardNo, email)
    if (!board) DeleteBoardResponseDto.noExistBoard()

    await this.boardRepository.delete(board)
    await this.favoriteRepository.deleteByBoardNo(boardNo)
    await this.commentRepository.deleteByBoardNo(boardNo)
    await this.imageRepository.deleteByBoardNo(boardNo)

    return DeleteBoardResponseDto.success()
  }

  async postComment(dto: PostCommentRequestDto, boardNo: number, email: string): Promise<PostCommentResponseDto> {
    const commentEntity = this.commentRepository.create(dto, boardNo, email)

    await this.commentRepository.save(commentEntity)
    await this.boardRepository.increaseCommentCnt(boardNo, email)

    return PostCommentResponseDto.success()
  }

  async getCommentList(boardNo: number): Promise<GetCommentListResponseDto> {
    const commentList = await this.commentRepository.getCommentItemList(boardNo)

    return GetCommentListResponseDto.success(commentList)
  }

  async putFavorite(boardNo: number, email: string): Promise<PutFavoriteResponseDto> {
    const board = await this.boardRepository.findByBoardNo(boardNo)
    if (!board) PutFavoriteResponseDto.noExistBoard()

    const isExist = await this.favoriteRepository.exists(boardNo, email)
    if (isExist) {
      await this.favoriteRepository.deleteByBoardNo(boardNo)
      board.favoriteCnt--
    } else {
      const favoriteEntity = this.favoriteRepository.create(boardNo, email)
      await this.favoriteRepository.save(favoriteEntity)
      board.favoriteCnt++
    }

    await this.boardRepository.save(board)

    return PutFavoriteResponseDto.success()
  }

  async getFavoriteList(boardNo: number, email: string): Promise<GetFavoriteListResponseDto> {
    const board = await this.boardRepository.findByBoardNo(boardNo)
    if (!board) PutFavoriteResponseDto.noExistBoard()

    const favoriteList = await this.favoriteRepository.getFavoriteList(boardNo)

    return GetFavoriteListResponseDto.success(favoriteList)
  }
}
