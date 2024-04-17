import { Injectable } from '@nestjs/common'
import { GetSigninUserResponseDto, GetUserResponseDto } from './dto/response'
import { UserRepository } from 'modules/data-access/repository'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(email: string): Promise<GetUserResponseDto> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) throw GetUserResponseDto.noExistUser()

    return GetUserResponseDto.success(user)
  }

  async getSigninUser(email: string): Promise<GetSigninUserResponseDto> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) throw GetSigninUserResponseDto.noExistUser()

    return GetSigninUserResponseDto.success(user)
  }
}
