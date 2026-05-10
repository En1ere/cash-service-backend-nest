import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistEntity } from '../shared/models/blacklist.entity';
import { BlacklistService } from './blacklist.service';

@Module({
    imports: [TypeOrmModule.forFeature([BlacklistEntity])],
    providers: [BlacklistService],
    exports: [BlacklistService]
})
export class BlacklistModule {}
