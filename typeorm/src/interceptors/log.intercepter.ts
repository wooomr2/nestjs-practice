import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Observable, catchError, of, tap, throwError } from 'rxjs'
import { RequestService } from 'src/request.service'

@Injectable()
export class LogInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LogInterceptor.name)

  constructor(private readonly requestService: RequestService) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
    const reqeust = ctx.switchToHttp().getRequest()
    const userAgent = reqeust.get('user-agent') || ''
    const { ip, method, originalUrl } = reqeust

    this.logger.log(`${method} ${originalUrl} ${userAgent} ${ip}: ${ctx.getClass().name} ${ctx.getHandler().name}`)
    this.logger.debug('userId:', this.requestService.getUserId())
    const now = Date.now()

    return next.handle().pipe(
      tap(res => {
        const response = ctx.switchToHttp().getResponse()
        const { statusCode } = response
        const contentLength = response.get('content-length')

        this.logger.log(
          `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}:  ${Date.now() - now}ms`
        )
        this.logger.debug(`Respone:`, res)
      }),
      catchError(err => {
        this.logger.error(`Error: ${err.message}`)
        return throwError(() => err)
      })
    )
  }
}
