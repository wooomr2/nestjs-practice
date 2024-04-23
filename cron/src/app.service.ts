import { Injectable, Logger } from '@nestjs/common'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { CreateUserRequest } from './dto/create-user.request'
import { userCreateEvent } from './events/user-create.event'

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name)

  constructor(private readonly eventEmitter: EventEmitter2) {}

  getHello(): string {
    return 'Hello World!'
  }

  async createUser(body: CreateUserRequest): Promise<boolean> {
    this.logger.log('Creating User...')
    this.eventEmitter.emit('user.create', new userCreateEvent('userID', 'email@email.com'))
    return true
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
}
