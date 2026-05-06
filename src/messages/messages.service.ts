import { Injectable } from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {MessageDto} from "./dto/message.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {MessageEntity} from "../shared/models/message.entity";
import {UpdateMessageDto} from "./dto/update-message.dto";
import {NotFoundError} from "../exceptions/not-found.exception";
import {CreateMessageDto} from "./dto/create-message.dto";
import {AuthException} from "../exceptions/auth.exception";
import {ValidationError} from "../exceptions/validation.exception";
import {ForwardMessagesDto} from "./dto/forward-messages.dto";

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>,
        private readonly usersService: UsersService
    ) {}

    async createMessage(uuid: string, payload: CreateMessageDto): Promise<boolean> {
        if(!uuid) {
            throw new AuthException('Need to authorize')
        }

        const user = await this.usersService.getUserByUuid(uuid);
        if(!user) {
            throw new NotFoundError(
                'User not found',
                { uuid },
            );
        }

        const { content, author, addressee } = payload;
        const message = new MessageEntity();

        message.userUuid = user
        message.content = content
        message.author = author
        message.addressee = addressee

        await message.save();

        return true;
    }

    async getMyMessages(uuid: string):Promise<MessageDto[]> {
        if(!uuid) {
            throw new AuthException('Need to authorize')
        }

        return this.messageRepository
            .createQueryBuilder('message')
            .where('message.user_uuid = :uuid', { uuid })
            .orderBy('message.createdAt', 'DESC')
            .getMany()
            .then(messages => messages.map(m => new MessageDto(m)));
    }

    async getMessagesForMe(uuid: string) {
        if(!uuid) {
            throw new AuthException('Need to authorize')
        }

        return this.messageRepository
            .createQueryBuilder('message')
            .where('message.addressee = :uuid', { uuid })
            .orderBy('message.createdAt', 'DESC')
            .getMany()
            .then(messages => messages.map(m => new MessageDto(m)));
    }

    async updateMessageById(id: number, data: UpdateMessageDto): Promise<MessageEntity|null> {
        const message = this.messageRepository.findOne({
            where: {
                id
            }
        })

        if(!message) {
            throw new NotFoundError(
                'Message not found',
                { id },
            );
        }

        await this.messageRepository.update({ id }, {
            content: data.content,
        }).catch(err => {
            console.log(err)
            return null
        })

        return await this.getMessageById(id)
    }

    async getMessageById(id: number): Promise<MessageEntity|null> {
        const message = this.messageRepository.findOne({
            where: {
                id
            }
        })

        if(!message) {
            throw new NotFoundError(
                'Message not found',
                { id },
            );
        }

        return message;
    }

    async softDeleteMessage(id: number): Promise<number> {
        const result = await this.messageRepository.softDelete(id);
        if (!result.affected) {
            throw new NotFoundError('Message not found', { id });
        }
        return result.affected;
    }

    async softDeleteMessages(ids: number[]): Promise<number> {
        const results = await Promise.all(
            ids.map(id => this.softDeleteMessage(id)),
        );

        return results.reduce((sum, count) => sum + count, 0);
    }

    async forwardMessages(uuid: string, data: ForwardMessagesDto): Promise<MessageDto[]> {
        if (!uuid) {
            throw new AuthException('Need to authorize');
        }

        if (!data.messagesIds?.length) {
            throw new ValidationError('No messages provided');
        }

        const user = await this.usersService.getUserByUuid(uuid);
        if (!user) {
            throw new NotFoundError('User not found', { uuid });
        }

        const result: MessageDto[] = [];

        for (const id of data.messagesIds) {
            const message = await this.getMessageById(id);
            if (!message) continue;

            const forwardedMessage = structuredClone(message);
            forwardedMessage.userUuid = user;
            forwardedMessage.addressee = data.addressee;
            forwardedMessage.forwarded = true;

            result.push(new MessageDto(forwardedMessage));
        }

        return result;
    }
}
