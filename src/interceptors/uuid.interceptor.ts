import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';

const UserUUIDHeader: string = 'x-user-id';

@Injectable()
export class UuidInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler) {
        const request = context.switchToHttp().getRequest();
        const uuid = request.headers[UserUUIDHeader];
        const authorization = request.headers.authorization;

        if (uuid) {
            request.userUuid = uuid;
        }

        if (authorization) {
            request.authorization = authorization;
        }

        return next.handle();
    }
}
