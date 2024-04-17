import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'image' })
export class ImageEntity {
  @PrimaryGeneratedColumn({ name: 'seq' })
  seq: number

  @Column({ name: 'board_no' })
  boardNo: number

  @Column({ name: 'url' })
  url: string
}
