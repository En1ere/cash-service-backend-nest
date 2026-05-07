import {Body, Controller, Post, Res} from '@nestjs/common';
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { SignResponseDto } from "./dto/sign-response.dto";
import { SignInDto } from "./dto/sign-in.dto";
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly service: AuthService
    ) {}

    @Post("sign-up")
    async signUp(
        @Body() data: SignUpDto,
        @Res({ passthrough: true }) response: Response
    ): Promise<SignResponseDto> {
        return this.service.signUp(data, response)
    }

    @Post("sign-in")
    async signIn(
        @Body() data: SignInDto,
        @Res({ passthrough: true }) response: Response
    ): Promise<SignResponseDto> {
        return this.service.signIn(data, response)
    }

    // @Post("refresh-token")
    // async refreshToken(@Body() data: RefreshTokenDto): Promise<SignResponseDto> {
    //     return this.service.refreshToken(data.token)
    // }
}
