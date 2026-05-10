import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {BlacklistService} from "../blacklist/blacklist.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly blacklistService: BlacklistService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            if (await this.blacklistService.isBlacklisted(token)) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
        }

        next();
    }
}
