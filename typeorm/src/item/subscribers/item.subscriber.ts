import { Logger } from '@nestjs/common'
import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm'
import { Item } from '../entities/item.entity'

@EventSubscriber()
export class ItemSubscriber implements EntitySubscriberInterface<Item> {
  private readonly logger = new Logger(ItemSubscriber.name)

  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this)
  }

  listenTo() {
    return Item
  }

  beforeInsert(event: InsertEvent<Item>) {
    this.logger.log(`BEFORE INSERTED: ${JSON.stringify(event.entity)}`)
  }

  afterInsert(event: InsertEvent<Item>) {
    this.logger.log(`AFTER INSERTED: ${JSON.stringify(event.entity)}`)
  }
}
