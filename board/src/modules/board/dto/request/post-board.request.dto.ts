import { IsArray, IsNotEmpty } from "class-validator";

export class PostBoardRequestDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    content: string

    @IsArray()
    imageUrlList: string[]
}