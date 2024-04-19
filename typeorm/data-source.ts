import { config } from 'dotenv'
import { ConfigService } from '@nestjs/config'
import { DataSource } from 'typeorm'

config()
const configService = new ConfigService()

export default new DataSource({
  type: 'mysql',
  host: configService.getOrThrow('MYSQL_HOST'),
  port: Number(configService.getOrThrow('MYSQL_PORT')),
  database: configService.getOrThrow('MYSQL_DATABASE'),
  username: configService.getOrThrow('MYSQL_USERNAME'),
  password: configService.getOrThrow('MYSQL_PASSWORD'),
  migrations: ['migrations/**'],
  entities: ['src/**/*.entity'],
  logging: ['query', 'error'],
})
