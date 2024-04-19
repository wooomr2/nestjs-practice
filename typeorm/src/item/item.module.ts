import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Comment } from './entities/comment.entity'
import { Item } from './entities/item.entity'
import { Listing } from './entities/listing.entity'
import { Tag } from './entities/tag.entity'
import { ItemController } from './item.controller'
import { ItemService } from './item.service'
import { ItemSubscriber } from './subscribers/item.subscriber'
import { AbstractEntity } from './entities/abstract.entity'

@Module({
  imports: [TypeOrmModule.forFeature([AbstractEntity, Item, Listing, Comment, Tag])],
  controllers: [ItemController],
  providers: [ItemService, ItemSubscriber],
})
export class ItemModule {}
