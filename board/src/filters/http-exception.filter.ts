import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(httpException: HttpException, host: ArgumentsHost) {
        console.log(httpException)
        const context = host.switchToHttp()
        const res = context.getResponse<Response>()

        const status = httpException.getStatus()
        const response = httpException.getResponse()

        res.status(status).json({
            code: response['error'],
            message: response['message']
        })
    }
}