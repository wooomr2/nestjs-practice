import { AbstractEntity } from 'src/db/abstract.entity'
import { Column, Entity } from 'typeorm'

@Entity()
export class Tag extends AbstractEntity<Tag> {
  @Column()
  type: string
}
