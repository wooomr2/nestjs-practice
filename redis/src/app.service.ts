import { CACHE_MANAGER, Cache, CacheKey, CacheTTL } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  @CacheKey('cache_key')
  @CacheTTL(6000)
  getHello(): string {
    return 'Hello World!'
  }

  async testCache() {
    await this.cacheManager.set('cached_key', { value: 32 }, 6000)
    const cachedItem = await this.cacheManager.get('cached_key')
    console.log(cachedItem)

    await this.cacheManager.del('cached_key')
    const deletedItem = await this.cacheManager.get('cached_key')
    console.log(deletedItem)

    await this.cacheManager.reset()

    return 'Cache Test'
  }
}
