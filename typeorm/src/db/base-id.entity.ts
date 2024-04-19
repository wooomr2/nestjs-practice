import { PrimaryGeneratedColumn } from 'typeorm'

export class BaseIdEntity<T> {
  @PrimaryGeneratedColumn()
  id: number

  constructor(entity: Partial<T>) {
    Object.assign(this, entity)
  }
}
