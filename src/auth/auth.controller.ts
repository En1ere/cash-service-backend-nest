import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { SignResponseDto } from "./dto/sign-response.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";

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

    @Post("refresh-token")
    async refreshToken(@Body() data: RefreshTokenDto): Promise<SignResponseDto> {
        return this.service.refreshToken(data.token)
    }
}
