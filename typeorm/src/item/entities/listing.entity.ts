import { BaseIdEntity } from 'src/db/base-id.entity'
import { Column, Entity } from 'typeorm'

@Entity()
export class Listing extends BaseIdEntity<Listing> {
  @Column()
  description: string

  @Column()
  rating: number
}
