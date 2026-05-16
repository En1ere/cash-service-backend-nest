import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpDto } from './dto/sign-up.dto'
import { SignResponseDto } from './dto/sign-response.dto'
import { SignInDto } from './dto/sign-in.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { OptionalAuthGuard } from './auth-optional.guard'
import type RequestWithUserContext from '../types/request-with-user-context'

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @Post('sign-up')
    async signUp(
        @Body() data: SignUpDto,
        @Req() req: RequestWithUserContext,
    ): Promise<SignResponseDto> {
        const result = await this.service.signUp(data)
        req.userUuid = result.userUuid
        return result.response
    }

    @Post('sign-in')
    async signIn(
        @Body() data: SignInDto,
        @Req() req: RequestWithUserContext,
    ): Promise<SignResponseDto> {
        const result = await this.service.signIn(data)
        req.userUuid = result.userUuid
        return result.response
    }

    @Post('sign-out')
    @UseGuards(OptionalAuthGuard)
    async signOut(@Req() req: RequestWithUserContext): Promise<null> {
        await this.service.signOut(req.userUuid, req.authorization)
        return null
    }

    @Post('refresh-token')
    async refreshToken(
        @Body() data: RefreshTokenDto,
        @Req() req: RequestWithUserContext,
    ): Promise<SignResponseDto> {
        const result = await this.service.refreshToken(data.token)
        req.userUuid = result.userUuid
        return result.response
    }
}