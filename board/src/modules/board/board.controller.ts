import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common'
import { GetSigninUser } from 'decorators'
import { JwtAuthGuard } from 'guards/jwt-auth.guard'
import { BoardService } from './board.service'
import { PatchBoardRequestDto, PostBoardRequestDto, PostCommentRequestDto } from './dto/request'
import {
  DeleteBoardResponseDto,
  GetBoardResponseDto,
  GetCommentListResponseDto,
  GetLatestBoardListResponseDto,
  PatchBoardResponseDto,
  PostBoardResponseDto,
  PutFavoriteResponseDto,
} from './dto/response'

@Controller('/api/v1/board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  postBoard(@Body() reqBody: PostBoardRequestDto, @GetSigninUser() email: string): Promise<PostBoardResponseDto> {
    return this.boardService.postBoard(reqBody, email)
  }

  @Get('/list')
  getLatestBoardList(): Promise<GetLatestBoardListResponseDto> {
    return this.boardService.getLatestBoardList()
  }

  @Get('/:boardNo')
  getBoard(@Param('boardNo') boardNo: number): Promise<GetBoardResponseDto> {
    return this.boardService.getBoard(boardNo)
  }

  @Patch('/:boardNo')
  @UseGuards(JwtAuthGuard)
  patchBoard(
    @Body() reqBody: PatchBoardRequestDto,
    @Param('boardNo') boardNo: number,
    @GetSigninUser() email: string
  ): Promise<PatchBoardResponseDto> {
    return this.boardService.patchBoard(reqBody, boardNo, email)
  }

  @Delete('/boardNo')
  @UseGuards(JwtAuthGuard)
  deleteBoard(@Param('boardNo') boardNo: number, @GetSigninUser() email: string): Promise<DeleteBoardResponseDto> {
    return this.boardService.deleteBoard(boardNo, email)
  }

  @Post('/:boardNo/comment')
  @UseGuards(JwtAuthGuard)
  postComment(
    @Body() reqBody: PostCommentRequestDto,
    @Param('boardNo') boardNo: number,
    @GetSigninUser() email: string
  ): Promise<PatchBoardResponseDto> {
    return this.boardService.postComment(reqBody, boardNo, email)
  }

  @Get('/:boardNo/comment-list')
  getCommentList(@Param('boardNo') boardNo: number): Promise<GetCommentListResponseDto> {
    return this.boardService.getCommentList(boardNo)
  }

  @Put('/:boardNo/favorite')
  @UseGuards(JwtAuthGuard)
  putFavorite(@Param('boardNo') boardNo: number, @GetSigninUser() email: string): Promise<PutFavoriteResponseDto> {
    return this.boardService.putFavorite(boardNo, email)
  }

  @Get('/:boardNo/favorite-list')
  @UseGuards(JwtAuthGuard)
  getFavoriteList(@Param('boardNo') boardNo: number, @GetSigninUser() email: string): Promise<PutFavoriteResponseDto> {
    return this.boardService.getFavoriteList(boardNo, email)
  }
}
