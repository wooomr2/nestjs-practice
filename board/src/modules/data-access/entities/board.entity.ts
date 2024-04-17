import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'board' })
export class BoardEntity {
  @PrimaryGeneratedColumn({ name: 'board_no' })
  boardNo: number

  @Column({ name: 'email' })
  email: string

  @Column({ name: 'title' })
  title: string

  @Column({ name: 'content' })
  content: string

  @Column({ name: 'view_cnt', default: 0 })
  viewCnt: number

  @Column({ name: 'comment_cnt', default: 0 })
  commentCnt: number

  @Column({ name: 'favorite_cnt', default: 0 })
  favoriteCnt: number

  @Column({ name: 'write_datetime' })
  writeDatetime: string
}
