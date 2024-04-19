import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { CreateItemDto } from './dto/create-item.dto'
import { UpdateItemDto } from './dto/update-item.dto'
import { Comment } from './entities/comment.entity'
import { Item } from './entities/item.entity'
import { Listing } from './entities/listing.entity'
import { Tag } from './entities/tag.entity'

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    private readonly dataSource: DataSource
  ) {}

  async create(createItemDto: CreateItemDto) {
    const listing = new Listing({ ...createItemDto.listing, rating: 0 })
    const tags = createItemDto.tags.map(t => new Tag(t))

    const item = new Item({ ...createItemDto, listing, tags })
    await this.itemRepository.save(item)
  }

  async findAll() {
    return await this.itemRepository.find({ relations: { listing: true, comments: true, tags: true } })
  }

  async findOne(id: number) {
    return await this.itemRepository.findOne({
      where: { id },
      relations: { listing: true, comments: true, tags: true },
    })
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemRepository.findOneBy({ id })

    item.public = updateItemDto.public

    const comments = updateItemDto.comments.map(c => new Comment(c))
    item.comments = comments
    item.tags = [new Tag({ type: `type ${Math.random()}` })]

    // managed transaction
    await this.dataSource.transaction(async tm => {
      await tm.save(item)
    })

    // // unmanaged transaction(query runner)
    // const queryRunner = this.dataSource.createQueryRunner()
    // await queryRunner.connect()
    // await queryRunner.startTransaction()
    // try {
    //   await queryRunner.manager.save(item)
    //   await queryRunner.commitTransaction()
    // } catch (e) {
    //   await queryRunner.rollbackTransaction()
    // } finally {
    //   await queryRunner.release()
    // }
  }

  async remove(id: number) {
    return await this.itemRepository.delete({ id })
  }
}
