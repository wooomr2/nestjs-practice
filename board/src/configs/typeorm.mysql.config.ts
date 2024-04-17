import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { config } from 'dotenv'

config()

export const typeOrmMysqlConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
  logging: ['query', 'error'],
}
