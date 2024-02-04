import { Module } from '@nestjs/common';
import { DataAccessModule } from 'modules/data-access/data-access.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DataAccessModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
