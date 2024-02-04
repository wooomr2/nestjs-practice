import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ResponseDto } from "common/classes";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../entities";

@Injectable()
export class UserRepository {

    private readonly logger = new Logger('User Repository')

    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>,
        private readonly dataSource: DataSource
    ) { }

    async existsByEmail(email: string): Promise<boolean> {
        try {
            return await this.repository.exists({ where: { email } })
        } catch (e) {
            this.logger.error(e.message)
            throw ResponseDto.dbError()
        }
    }

    async existsByNickname(nickname: string): Promise<boolean> {
        try {
            return await this.repository.exists({ where: { nickname } })
        } catch (e) {
            this.logger.error(e.message)
            throw ResponseDto.dbError()
        }
    }

    async existsByTel(tel: string): Promise<boolean> {
        try {
            return await this.repository.exists({ where: { tel } })
        } catch (e) {
            this.logger.error(e.message)
            throw ResponseDto.dbError()
        }
    }

    async findByEmail(email: string): Promise<UserEntity> {
        try {
            const user = await this.repository.findOneBy({ email })

            return user
        } catch (e) {
            this.logger.error(e.message)
            throw ResponseDto.dbError()
        }
    }

    async save(userEntity: UserEntity): Promise<UserEntity> {
        try {
            const user = await this.repository.save(userEntity)
            return user
        } catch (e) {
            this.logger.error(e.message)
            throw ResponseDto.dbError()
        }
    }

}