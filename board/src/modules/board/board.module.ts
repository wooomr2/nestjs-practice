import { Module } from '@nestjs/common';
import { DataAccessModule } from 'modules/data-access/data-access.module';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
  imports: [DataAccessModule],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule { }
