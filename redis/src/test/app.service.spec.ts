import { Test, TestingModule } from '@nestjs/testing'
import { AppService } from '../app.service'
import { CACHE_MANAGER } from '@nestjs/cache-manager'

const mockCacheManager = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  reset: jest.fn(),
}

describe('AppServcie', () => {
  let appServcie: AppService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile()

    appServcie = app.get<AppService>(AppService)
  })

  describe('root', () => {
    it('should be defined', () => {
      expect(appServcie).toBeDefined()
    })
  })
})
