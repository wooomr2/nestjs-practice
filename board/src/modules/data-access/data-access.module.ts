import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity, BoardListViewEntity, CommentEntity, FavoriteEntity, ImageEntity, SearchLogEntity, UserEntity } from './entities';
import { BoardListViewRepository, BoardRepository, CommentRepository, FavoriteRepository, ImageRepository, SearchLogRepository, UserRepository } from './repository';

@Module({
    imports: [TypeOrmModule.forFeature([BoardEntity, BoardListViewEntity, CommentEntity, FavoriteEntity, ImageEntity, SearchLogEntity, UserEntity])],
    providers: [BoardListViewRepository, BoardRepository, CommentRepository, FavoriteRepository, ImageRepository, SearchLogRepository, UserRepository],
    exports: [BoardListViewRepository, BoardRepository, CommentRepository, FavoriteRepository, ImageRepository, SearchLogRepository, UserRepository]
})
export class DataAccessModule {

}
