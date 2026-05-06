import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';
import { AuthException } from "../exceptions/auth.exception";
import { ForbiddenError } from "../exceptions/forbidden.exception";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractToken(request);

        if(!token) {
            throw new AuthException('Need to authorize');
        }

        try {
            request['user'] = await this.jwtService.verifyAsync(token);
        }
        catch (err) {
            throw new ForbiddenError(
                'Access denied',
                err,
            );
        }

        return true
    }

    extractToken(request: Request): string | undefined {
        const token: string = request.cookies.accessToken?.accessToken ?? "";
        return token || undefined;
    }
}