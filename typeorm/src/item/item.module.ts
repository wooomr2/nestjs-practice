import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Comment } from './entities/comment.entity'
import { Item } from './entities/item.entity'
import { Listing } from './entities/listing.entity'
import { ItemController } from './item.controller'
import { ItemService } from './item.service'
import { Tag } from './entities/tag.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Item, Listing, Comment, Tag])],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
