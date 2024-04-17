import { Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'favorite' })
export class FavoriteEntity {
  @PrimaryColumn({ name: 'board_no' })
  boardNo: number

  @PrimaryColumn({ name: 'email' })
  email: string
}
