import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { Item } from './entities/item.entity'
import { ItemService } from './item.service'

describe('ItemService', () => {
  let service: ItemService
  let itemRepository: Repository<Item>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemService,
        {
          provide: getRepositoryToken(Item),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: DataSource,
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<ItemService>(ItemService)
    itemRepository = module.get<Repository<Item>>(getRepositoryToken(Item))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  test('findAll', async () => {
    await service.findAll()
    expect(itemRepository.find).toHaveBeenCalled()
  })
})
