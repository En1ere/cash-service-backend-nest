import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {BlacklistEntity} from "../shared/models/blacklist.entity";

@Injectable()
export class BlacklistService {
    constructor(
        @InjectRepository(BlacklistEntity)
        private readonly blacklistRepo: Repository<BlacklistEntity>
    ) {}

    async addToBlacklist(token: string): Promise<void> {
        const existingToken = await this.blacklistRepo.findOne({ where: { token } });
        if (!existingToken) {
            await this.blacklistRepo.insert({ token });
        }
    }

    async isBlacklisted(token: string): Promise<boolean> {
        return !!(await this.blacklistRepo.findOne({where: {token}}));
    }
}
