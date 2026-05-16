import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from './auth.guard'
import type RequestWithUserContext from '../types/request-with-user-context'

@Injectable()
export class OptionalAuthGuard extends AuthGuard {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<RequestWithUserContext>()
        const token = this.extractToken(request)

        if (!token) {
            return true
        }

        const isBlacklisted = await this.blacklistService.isBlacklisted(token)

        if (isBlacklisted) {
            return true
        }

        try {
            const payload = await this.jwtService.verifyAsync(token)

            request.user = payload
            request.authorization = `Bearer ${token}`

            return true
        } catch {
            return true
        }
    }
}