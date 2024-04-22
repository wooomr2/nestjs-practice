import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose'

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(entityFilterQuery: FilterQuery<T>, projection?: Record<string, unknown>): Promise<T | null> {
    return await this.entityModel.findOne(entityFilterQuery, { _id: 0, __v: 0, ...projection }).exec()
  }

  async find(entityFilterQuery: FilterQuery<T>, projection?: Record<string, unknown>): Promise<T[] | null> {
    return await this.entityModel.find(entityFilterQuery, { _id: 0, __v: 0, ...projection }).exec()
  }

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData)
    const result = await entity.save()
    return result as T
  }

  async findOneAndUpdate(entityFilterQuery: FilterQuery<T>, updateEntityData: UpdateQuery<unknown>): Promise<T | null> {
    return await this.entityModel.findOneAndUpdate(entityFilterQuery, updateEntityData, { new: true })
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery)

    return deleteResult.deletedCount > 0
  }
}
