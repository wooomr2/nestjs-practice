import { IsNotEmpty } from 'class-validator'

export class PostCommentRequestDto {
  @IsNotEmpty()
  content: string
}
