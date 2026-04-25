import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractToken(request);

        if(!token) {
            throw new UnauthorizedException("Need to authorize")
        }

        try {
            request['user'] = await this.jwtService.verifyAsync(token);
        }
        catch (err) {
            throw new UnauthorizedException(err)
        }

        return true
    }

    extractToken(request: Request): string | undefined {
        const token: string = request.cookies.accessToken?.accessToken ?? "";
        return token || undefined;
    }
}