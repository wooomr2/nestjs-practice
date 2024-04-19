import { BaseIdEntity } from 'src/db/base-id.entity'
import { Column, Entity } from 'typeorm'

@Entity()
export class Tag extends BaseIdEntity<Tag> {
  @Column()
  type: string
}
