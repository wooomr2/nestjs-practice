import { ViewColumn, ViewEntity } from 'typeorm'

@ViewEntity({ name: 'board_list_view' })
export class BoardListViewEntity {
  @ViewColumn({ name: 'board_no' })
  boardNo: number

  @ViewColumn({ name: 'title' })
  title: string

  @ViewColumn({ name: 'title_img' })
  titleImg: string | null

  @ViewColumn({ name: 'content' })
  content: string

  @ViewColumn({ name: 'view_cnt' })
  viewCnt: number

  @ViewColumn({ name: 'favorite_cnt' })
  favoriteCnt: number

  @ViewColumn({ name: 'comment_cnt' })
  commentCnt: number

  @ViewColumn({ name: 'write_datetime' })
  writeDatetime: string

  @ViewColumn({ name: 'email' })
  email: string

  @ViewColumn({ name: 'nickname' })
  nickname: string

  @ViewColumn({ name: 'profile_img' })
  profileImg: string | null
}
