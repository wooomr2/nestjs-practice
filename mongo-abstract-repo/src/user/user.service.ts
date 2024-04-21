import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './schemas/user.schema'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(userId: string): Promise<User> {
    return this.userRepository.findOne({ userId })
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({})
  }

  async createUser(email: string, age: number): Promise<User> {
    return this.userRepository.create({
      userId: randomUUID(),
      email,
      age,
      favoriteFoods: [],
    })
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.findOneAndUpdate({ userId }, updateUserDto)
  }
}
