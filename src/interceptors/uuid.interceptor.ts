import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common'
import type { Response } from 'express'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import type RequestWithUserContext from '../types/request-with-user-context'

const USER_UUID_HEADER = 'X-User-Id'

@Injectable()
export class UuidInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const request = context.switchToHttp().getRequest<RequestWithUserContext>()
        const response = context.switchToHttp().getResponse<Response>()

        const incomingUuid = request.headers['x-user-id']
        const authorization = request.headers.authorization

        if (typeof incomingUuid === 'string' && incomingUuid.length > 0) {
            request.userUuid = incomingUuid
        }

        if (typeof authorization === 'string' && authorization.length > 0) {
            request.authorization = authorization
        }

        return next.handle().pipe(
            tap(() => {
                if (typeof request.userUuid === 'string' && request.userUuid.length > 0) {
                    response.setHeader(USER_UUID_HEADER, request.userUuid)
                }
            }),
        )
    }
}