import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { SearchLogEntity } from "../entities";

@Injectable()
export class SearchLogRepository {

    constructor(
        @InjectRepository(SearchLogEntity)
        private readonly repository: Repository<SearchLogEntity>,
        private readonly dataSource: DataSource
    ) { }
}