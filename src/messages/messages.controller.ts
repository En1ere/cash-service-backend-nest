import {Body, Controller, Delete, Get, Param, Post, Put, Headers, UseGuards} from '@nestjs/common';
import { MessagesService } from "./messages.service";
import {MessageDto} from "./dto/message.dto";
import {AuthGuard} from "../auth/auth.guard";
import {UpdateMessageDto} from "./dto/update-message.dto";
import {CreateMessageDto} from "./dto/create-message.dto";
import {MessageEntity} from "../shared/models/message.entity";
import {ForwardMessagesDto} from "./dto/forward-messages.dto";

@Controller('messages')
export class MessagesController {
    constructor(
        private readonly service: MessagesService
    ) {}

    @Post("send-message")
    @UseGuards(AuthGuard)
    async createMessage(
        @Body() data: CreateMessageDto,
        @Headers('uuid') uuid: string
    ): Promise<boolean> {
        return this.service.createMessage(uuid, data)
    }

    @Get("my-messages")
    @UseGuards(AuthGuard)
    async getMyMessages(
        @Headers('uuid') uuid: string
    ): Promise<MessageDto[]> {
        return this.service.getMyMessages(uuid)
    }

    @Get("messages-for-me")
    @UseGuards(AuthGuard)
    async getMessagesForMe(
        @Headers('uuid') uuid: string
    ): Promise<MessageDto[]> {
        return this.service.getMessagesForMe(uuid)
    }

    @Put("update-message/:id")
    @UseGuards(AuthGuard)
    async updateMessage(@Param("id") id: number, data: UpdateMessageDto): Promise<MessageEntity|null> {
        return this.service.updateMessageById(id, data)
    }

    @Delete("delete/:id")
    @UseGuards(AuthGuard)
    async deleteMessage(@Param("id") id: number): Promise<number> {
        return this.service.softDeleteMessage(id)
    }

    @Post("forward-message")
    @UseGuards(AuthGuard)
    async forwardMessages(
        @Body() data: ForwardMessagesDto,
        @Headers('uuid') uuid: string
    ): Promise<MessageDto[]> {
        return this.service.forwardMessages(uuid, data)
    }

    @Delete("delete-messages")
    @UseGuards(AuthGuard)
    async deleteMessages(@Body() data: { ids: number[] }): Promise<number> {
        return this.service.softDeleteMessages(data.ids)
    }
}
