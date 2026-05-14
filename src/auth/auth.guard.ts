import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';
import { AuthException } from "../exceptions/auth.exception";
import {BlacklistService} from "../blacklist/blacklist.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly blacklistService: BlacklistService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractToken(request);

        if(!token) {
            throw new AuthException('Need to authorize');
        }

        const isBlackListed = await this.blacklistService.isBlacklisted(token);
        if(isBlackListed) {
            throw new AuthException('Need to authorize');
        }

        try {
            request['user'] = await this.jwtService.verifyAsync(token);
        }
        catch (err) {
            throw new AuthException(
                "Token expired",
                err,
            );
        }

        return true
    }

    extractToken(request: Request): string | undefined {
        const authHeader = request.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            return authHeader.substring(7);
        }

        return request.cookies?.accessToken;
    }
}