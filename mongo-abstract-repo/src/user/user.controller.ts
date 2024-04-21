import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './schemas/user.schema'
import { UserService } from './user.service'

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:userId')
  getUser(@Param('userId') userId: string): Promise<User> {
    return this.userService.getUserById(userId)
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers()
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto.email, createUserDto.age)
  }

  @Patch('/:userId')
  async updateUser(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(userId, updateUserDto)
  }
}
