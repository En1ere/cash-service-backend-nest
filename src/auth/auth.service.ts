import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { MoreThan, Repository } from "typeorm";
import { RefreshTokenEntity } from "../shared/models/refresh-tokens.entity";
import { InjectRepository} from "@nestjs/typeorm";
import { SignUpDto } from "./dto/sign-up.dto";
import { UserEntity } from "../shared/models/user.entity";
import { SignResponseDto } from "./dto/sign-response.dto";
import { randomBytes } from "node:crypto";
import * as bcrypt from "bcrypt"
import { SignInDto } from "./dto/sign-in.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(RefreshTokenEntity)
        private readonly refreshTokenRepo: Repository<RefreshTokenEntity>,
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async signUp(data: SignUpDto): Promise<SignResponseDto> {
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
        if(!isEmailValid) {
            throw new BadRequestException("Invalid email")
        }

        const isLoginExist = await this.userService.getUserByLogin(data.login)
        if(isLoginExist) {
            throw new BadRequestException("Login already exists")
        }

        const user = await this.userService.getUserByEmail(data.email)
        if(user) {
            throw new BadRequestException("Email already exists")
        }

        const hashPass = await bcrypt.hash(data.password, 16)

        const userPayload = {
            email: data.email,
            login: data.login,
            name: data.name,
            password: hashPass
        }

        const userCreated = await this.userService.createUser(userPayload)

        return this.getTokens(userCreated)
    }

    async signIn(data: SignInDto): Promise<SignResponseDto> {
        let user: UserEntity|null;
        user = await this.userService.getUserByEmail(data.identifier)
        if (!user) {
            user = await this.userService.getUserByLogin(data.identifier)
        }

        if(!user) {
            throw new BadRequestException("User not found")
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password)
        if(!isPasswordValid) {
            throw new UnauthorizedException("Invalid password")
        }

        return this.getTokens(user);
    }

    async refreshToken(token: string): Promise<SignResponseDto> {
        const now = new Date()
        const refreshToken = await this.refreshTokenRepo.findOne({
            relations: ['user'],
            where: {
                token,
                expires: MoreThan(now)
            }
        })

        if(!refreshToken) {
            throw new UnauthorizedException("Invalid refresh token")
        }

        return this.getTokens(refreshToken.userId)
    }

    async getTokens(user: UserEntity): Promise<SignResponseDto> {
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            login: user.login
        }

        const refreshToken = new RefreshTokenEntity()
        refreshToken.token = this.generateSecureToken()
        const expires = new Date()
        expires.setDate(expires.getDate() + 14)
        refreshToken.expires = expires
        refreshToken.userId = user

        const refreshTokenCreated = await refreshToken.save()

        const accessToken = await this.jwtService.signAsync(payload)
        return new SignResponseDto(accessToken, refreshTokenCreated.token)
    }

    private generateSecureToken(): string {
        return randomBytes(48).toString("base64url")
    }
}
