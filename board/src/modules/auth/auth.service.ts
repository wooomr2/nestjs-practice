import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'modules/data-access/entities';
import { UserRepository } from 'modules/data-access/repository';
import { SigninRequestDto, SignupRequestDto } from './dto/request';
import { SigninResponseDto, SignupResponseDto } from './dto/response';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userRepository: UserRepository
    ) { }

    async signup(dto: SignupRequestDto): Promise<SignupResponseDto> {
        const { email, password, nickname, tel } = dto

        const isEmailExist = await this.userRepository.existsByEmail(email)
        if (isEmailExist) throw SignupResponseDto.duplicateEmail()

        const isTelExist = await this.userRepository.existsByTel(tel)
        if (isTelExist) throw SignupResponseDto.duplicateTel()

        const isNicknameExist = await this.userRepository.existsByNickname(nickname)
        if (isNicknameExist) throw SignupResponseDto.duplicateNickname()

        const salt = await bcrypt.genSalt()
        const encodedPW = await bcrypt.hash(password, salt)
        dto.password = encodedPW

        const user: UserEntity = { ...dto }

        await this.userRepository.save(user)

        return SignupResponseDto.success()
    }

    async signin(dto: SigninRequestDto): Promise<SigninResponseDto> {
        const { email, password } = dto

        const user = await this.userRepository.findByEmail(email)
        if (!user) throw SigninResponseDto.siginFail()

        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) throw SigninResponseDto.siginFail()

        const payload = { sub: email }

        const token = this.jwtService.sign(payload)

        return SigninResponseDto.success(token)
    }
}
