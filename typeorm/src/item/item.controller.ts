import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { CreateItemDto } from './dto/create-item.dto'
import { UpdateItemDto } from './dto/update-item.dto'
import { ItemService } from './item.service'

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto)
  }

  @Get()
  findAll() {
    return this.itemService.findAll()
  }

  @Get(':id')
  // pipe
  findOne(@Param('id') id: number) {
    return this.itemService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(id, updateItemDto)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.itemService.remove(id)
  }
}
