import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthException } from '../exceptions/auth.exception'
import { BlacklistService } from '../blacklist/blacklist.service'
import type RequestWithUserContext from '../types/request-with-user-context'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        protected readonly jwtService: JwtService,
        protected readonly blacklistService: BlacklistService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<RequestWithUserContext>()
        const token = this.extractToken(request)

        if (!token) {
            throw new AuthException('Need to authorize')
        }

        const isBlacklisted = await this.blacklistService.isBlacklisted(token)

        if (isBlacklisted) {
            throw new AuthException('Need to authorize')
        }

        try {
            const payload = await this.jwtService.verifyAsync(token)

            request.user = payload
            request.userUuid = payload.uuid
            request.authorization = `Bearer ${token}`

            return true
        } catch (error) {
            throw new AuthException('Token expired', error)
        }
    }

    protected extractToken(request: RequestWithUserContext): string | undefined {
        const authHeader = request.headers.authorization

        if (authHeader?.startsWith('Bearer ')) {
            return authHeader.slice(7)
        }

        return request.cookies?.accessToken
    }
}