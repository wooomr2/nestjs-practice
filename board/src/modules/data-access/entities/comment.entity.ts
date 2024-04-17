import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'comment' })
export class CommentEntity {
  @PrimaryGeneratedColumn({ name: 'comment_no' })
  commentNo: number

  @Column({ name: 'board_no' })
  boardNo: number

  @Column({ name: 'email' })
  email: string

  @Column({ name: 'content' })
  content: string

  @Column({ name: 'write_datetime' })
  writeDatetime: string
}
