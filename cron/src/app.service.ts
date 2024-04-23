import { Injectable, Logger } from '@nestjs/common'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule'
import { CreateUserRequest } from './dto/create-user.request'
import { userCreateEvent } from './events/user-create.event'

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name)

  constructor(
    private readonly eventEmitter: EventEmitter2,
    // Dynamic Batch Scheduling
    private schedulerRegister: SchedulerRegistry
  ) {}

  getHello(): string {
    return 'Hello World!'
  }

  async createUser(body: CreateUserRequest) {
    this.logger.log('Creating User...')
    const userId = 'userID'
    this.eventEmitter.emit('user.create', new userCreateEvent(userId, 'email@email.com'))

    const establishWsTimeout = setTimeout(() => this.#establishWsConnection(userId), 3000)
    this.schedulerRegister.addTimeout(`establish_ws`, establishWsTimeout)
  }

  #establishWsConnection(userId: string) {
    this.logger.log(`Establishing WS connection for user ${userId}...`)
  }

  @OnEvent('user.create')
  welcomeNewUser(payload: userCreateEvent) {
    this.logger.log(`Welcome ${payload.email}!`)
  }

  @OnEvent('user.create')
  async sendWelcomeGift(payload: userCreateEvent) {
    this.logger.log(`Sending welcome gift...  ${payload.email}`)
    await new Promise<void>(resolve => setTimeout(resolve, 2000))
    this.logger.log(`Welcome gift sent to ${payload.email}`)
  }

  @Cron(CronExpression.EVERY_10_SECONDS, { name: 'deleteExpiredUsers' })
  deleteExpiredUsers() {
    this.logger.log('Deleting expired users...')
  }
}
