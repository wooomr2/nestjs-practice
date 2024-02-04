import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ResponseDto } from "common/classes";
import { DataSource, Repository } from "typeorm";
import { FavoriteEntity } from "../entities";
import { IFavoriteItem } from "common/interfaces";

@Injectable()
export class FavoriteRepository {

    private readonly logger = new Logger('FavoriteRepostiory')

    constructor(
        @InjectRepository(FavoriteEntity)
        private readonly repository: Repository<FavoriteEntity>,
        private readonly dataSource: DataSource
    ) { }

    create(boardNo: number, email: string) {
        try {
            return this.repository.create({ boardNo, email })
        } catch (e) {
            this.logger.error(e.message)
            throw ResponseDto.dbError()
        }
    }

    async save(favoriteEntity: FavoriteEntity) {
        try {
            return await this.repository.save(favoriteEntity)
        } catch (e) {
            this.logger.error(e.message)
            throw ResponseDto.dbError()
        }
    }

    async exists(boardNo: number, email: string) {
        try {
            return this.repository.exists({ where: { boardNo, email } })
        } catch (e) {
            this.logger.error(e.message)
            throw ResponseDto.dbError()
        }
    }

    async deleteByBoardNo(boardNo: number) {
        try {
            return this.repository.delete({ boardNo })
        } catch (e) {
            this.logger.error(e.message)
            throw ResponseDto.dbError()
        }
    }

    async getFavoriteList(boardNo: number) {
        const result: IFavoriteItem[] = await this.dataSource.createQueryBuilder()
            .select('U.email', 'email')
            .addSelect('U.nickname', 'nickname')
            .addSelect('U.profile_img', 'profileImg')
            .from('favorite', 'F')
            .innerJoin('user', 'U', 'F.email = U.email')
            .where('F.board_no = :boardNo', { boardNo })
            .getRawMany()

        return result

    }
}