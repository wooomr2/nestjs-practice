import { MongooseModule, getModelToken } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { FilterQuery } from 'mongoose'
import { User, UserSchema } from '../schemas/user.schema'
import { UserRepository } from '../user.repository'
import { userStub } from './stubs/user.stub'
import { UserModel } from './supports/user.model'

describe('UserRepository', () => {
  let userRepository: UserRepository
  let userModel: UserModel
  let userFilterQuery: FilterQuery<User>

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
      controllers: [],
      providers: [
        UserRepository,
        {
          provide: getModelToken(User.name),
          useClass: UserModel,
        },
      ],
    }).compile()

    userRepository = moduleRef.get<UserRepository>(UserRepository)
    userModel = moduleRef.get<UserModel>(getModelToken(User.name))
    userFilterQuery = { userId: userStub().userId }

    jest.clearAllMocks()
  })

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let user: User

      beforeEach(async () => {
        jest.spyOn(userModel, 'findOne')
        user = await userRepository.findOne(userFilterQuery)
      })

      test('then it should call the userModel', () => {
        expect(userModel.findOne).toHaveBeenCalledWith(userFilterQuery, { _id: 0, __v: 0 })
      })

      test('then it should return a user', () => {
        expect(user).toEqual(userStub())
      })
    })
  })

  describe('find', () => {
    describe('when find is called', () => {
      let users: User[]

      beforeEach(async () => {
        jest.spyOn(userModel, 'find')
        users = await userRepository.find(userFilterQuery)
      })

      test('then it should call the userModel', () => {
        expect(userModel.find).toHaveBeenCalledWith(userFilterQuery)
      })

      test('then it should return a user', () => {
        expect(users).toEqual([userStub()])
      })
    })
  })

  describe('findOneAndUpdate', () => {
    it('when findOneAndUpdate is called', () => {
      let user: User

      beforeEach(async () => {
        jest.spyOn(userModel, 'findOneAndUpdate')
        user = await userRepository.findOneAndUpdate(userFilterQuery, userStub())
      })

      test('then it should call the userModel', () => {
        expect(userModel.findOneAndUpdate).toHaveBeenCalledWith(userFilterQuery, userStub(), { new: true })
      })

      test('then it should return a user', () => {
        expect(user).toEqual(userStub())
      })
    })
  })

  describe('create operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          UserRepository,
          {
            provide: getModelToken(User.name),
            useValue: UserModel,
          },
        ],
      }).compile()

      userRepository = moduleRef.get<UserRepository>(UserRepository)
    })

    describe('create', () => {
      describe('when create is called', () => {
        let user: User
        let saveSpy: jest.SpyInstance
        let constructorSpy: jest.SpyInstance

        beforeEach(async () => {
          saveSpy = jest.spyOn(UserModel.prototype, 'save')
          constructorSpy = jest.spyOn(UserModel.prototype, 'constructorSpy')
          user = await userRepository.create(userStub())
        })

        test('then it should call the userModel', () => {
          expect(saveSpy).toHaveBeenCalled()
          expect(constructorSpy).toHaveBeenCalledWith(userStub())
        })

        test('then it should return a user', () => {
          expect(user).toEqual(userStub())
        })
      })
    })
  })
})
