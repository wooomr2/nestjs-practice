import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { BoardListViewEntity } from "../../entities";
import { ResponseDto } from "common/classes";

@Injectable()
export class BoardListViewRepository {
    private readonly logger = new Logger('Board Repository')

    constructor(
        @InjectRepository(BoardListViewEntity)
        private readonly repository: Repository<BoardListViewEntity>,
        private readonly dataSource: DataSource
    ) { }

    async findLatestList() {
        try {
            const boardListViewEntities = this.repository.find({ order: { writeDatetime: 'DESC' } })

            return boardListViewEntities
        } catch (e) {
            this.logger.error(e.message)
            throw ResponseDto.dbError()
        }
    }
}