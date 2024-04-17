export interface IBoardItem {
  boardNo: number

  title: string
  content: string

  favoriteCnt: number
  commentCnt: number
  viewCnt: number

  wirteDatetime: string

  nickname: string
  profileImg: string | null
}
