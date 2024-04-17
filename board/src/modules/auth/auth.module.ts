import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { jwtConfig, passportJwtConfig } from 'configs'
import { DataAccessModule } from 'modules/data-access/data-access.module'
import { JwtAuthStrategy } from './jwt-auth.strategy'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [PassportModule.register(passportJwtConfig), JwtModule.register(jwtConfig), DataAccessModule],
  controllers: [AuthController],
  providers: [JwtAuthStrategy, AuthService],
  exports: [],
})
export class AuthModule {}
