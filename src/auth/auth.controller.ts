import {Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { SignResponseDto } from "./dto/sign-response.dto";
import { SignInDto } from "./dto/sign-in.dto";
import {RefreshTokenDto} from "./dto/refresh-token.dto";
import {AuthGuard} from "./auth.guard";
import type RequestWithUserUuid from "../types/RequestWithUuid";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly service: AuthService
    ) {}

    @Post("sign-up")
    async signUp(@Body() data: SignUpDto): Promise<SignResponseDto> {
        return this.service.signUp(data)
    }

    @Post("sign-in")
    async signIn(@Body() data: SignInDto): Promise<SignResponseDto> {
        return this.service.signIn(data)
    }

    @Post("sign-out")
    @UseGuards(AuthGuard)
    async signOut(@Req() req: RequestWithUserUuid): Promise<null> {
        return this.service.signOut(req.userUuid || "", req.authorization || "")
    }

    @Post("refresh-token")
    async refreshToken(@Body() data: RefreshTokenDto): Promise<SignResponseDto> {
        return this.service.refreshToken(data.token)
    }
}
