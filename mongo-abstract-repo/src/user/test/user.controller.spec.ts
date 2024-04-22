import { Test } from '@nestjs/testing'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { User } from '../schemas/user.schema'
import { UserController } from '../user.controller'
import { UserService } from '../user.service'
import { userStub } from './stubs/user.stub'

jest.mock('../user.service')

describe('UserController', () => {
  let userController: UserController
  let userService: UserService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [UserService],
    }).compile()

    userController = moduleRef.get<UserController>(UserController)
    userService = moduleRef.get<UserService>(UserService)
    jest.clearAllMocks()
  })

  describe('getUser', () => {
    describe('when getUser is called', () => {
      let user: User
      const stubUser = userStub()

      beforeEach(async () => {
        user = await userController.getUser(stubUser.userId)
      })

      test('then it should call userService.getUserById', () => {
        expect(userService.getUserById).toHaveBeenCalledWith(stubUser.userId)
      })

      test('then it should return a user', () => {
        expect(user).toEqual(stubUser)
      })
    })
  })

  describe('getUsers', () => {
    describe('when getUsers is called', () => {
      let users: User[]
      const stubUsers = [userStub('123'), userStub('456')]

      beforeEach(async () => {
        users = await userController.getUsers()
      })

      test('then it should call userService.getUsers', () => {
        expect(userService.getUsers).toHaveBeenCalled()
      })

      test('then it should return a list of users', () => {
        expect(users).toEqual(stubUsers)
      })
    })
  })

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User

      const createUserDto: CreateUserDto = {
        email: userStub().email,
        age: userStub().age,
      }

      beforeEach(async () => {
        user = await userController.createUser(createUserDto)
      })

      test('then it should call userService.createUser', () => {
        expect(userService.createUser).toHaveBeenCalledWith(createUserDto.email, createUserDto.age)
      })

      test('then it should return a user', () => {
        expect(user).toEqual(userStub())
      })
    })
  })

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let user: User
      const stubUser = userStub()
      const updateUserDto: UpdateUserDto = {
        age: 99,
        favoriteFoods: ['hohoho'],
      }

      beforeEach(async () => {
        user = await userController.updateUser(stubUser.userId, updateUserDto)
      })

      test('then it should call userService.updateUser', async () => {
        expect(userService.updateUser).toHaveBeenCalledWith(stubUser.userId, updateUserDto)
      })

      test('then it should return a user', () => {
        expect(user).toEqual(stubUser)
      })
    })
  })
})
