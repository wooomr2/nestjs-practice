import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { ImageEntity } from "../entities";
import { ResponseDto } from "common/classes";

@Injectable()
export class ImageRepository {

    private readonly logger = new Logger('Image Repository')

    constructor(
        @InjectRepository(ImageEntity)
        private readonly repository: Repository<ImageEntity>,
        private readonly dataSource: DataSource
    ) { }

    bulkCreate(imageUrlList: string[], boardNo: number) {
        try {
            const entities: Omit<ImageEntity, "seq">[] = []
            for (const url of imageUrlList) {
                entities.push({ url: url, boardNo: boardNo })
            }

            const imageEntities = this.repository.create(entities)

            return imageEntities
        } catch (e) {
            this.logger.error(e.message)
            ResponseDto.dbError()
        }
    }

    async saveAll(imageEntities: ImageEntity[]) {
        try {
            const images = await this.repository.save(imageEntities)

            return images
        } catch (e) {
            this.logger.error(e.message)
            ResponseDto.dbError()
        }
    }

    async findByBoardNo(boardNo: number) {
        try {
            const images = await this.repository.findBy({ boardNo })

            return images
        } catch (e) {
            this.logger.error(e.message)
            ResponseDto.dbError()
        }
    }

    async deleteByBoardNo(boardNo: number) {
        try {
            await this.repository.delete({ boardNo })
        } catch (e) {
            this.logger.error(e.message)
            throw ResponseDto.dbError()
        }
    }
}