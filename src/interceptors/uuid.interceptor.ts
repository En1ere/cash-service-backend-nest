import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';

const UserUUIDHeader: string = 'X-User-Id';
const AuthorizationHeader: string = 'Authorization';

@Injectable()
export class UuidInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler) {
        const request = context.switchToHttp().getRequest();
        const uuid = request.headers[UserUUIDHeader];
        const authorization = request.headers[AuthorizationHeader];

        if (uuid) {
            request.userUuid = uuid;
        }

        if (authorization) {
            request.authorization = authorization;
        }

        return next.handle();
    }
}
