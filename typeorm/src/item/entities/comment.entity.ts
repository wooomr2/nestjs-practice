import { BaseIdEntity } from 'src/db/base-id.entity'
import { Column, Entity, ManyToOne } from 'typeorm'
import { Item } from './item.entity'

@Entity()
export class Comment extends BaseIdEntity<Comment> {
  @Column()
  content: string

  @ManyToOne(() => Item, item => item.comments)
  item: Item
}
