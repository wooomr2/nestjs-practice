import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { RequestService } from 'src/request.service'

@Injectable()
export class TestMiddleware implements NestMiddleware {
  private readonly logger = new Logger(TestMiddleware.name)
  constructor(private readonly requestService: RequestService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(TestMiddleware.name)
    const userId = 'userid1234'
    this.requestService.setUserId(userId)

    next()
  }
}
