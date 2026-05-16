import { Injectable } from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import {MoreThan, Repository} from "typeorm";
import { RefreshTokenEntity } from "../shared/models/refresh-tokens.entity";
import { InjectRepository} from "@nestjs/typeorm";
import { SignUpDto } from "./dto/sign-up.dto";
import { UserEntity } from "../shared/models/user.entity";
import { SignResponseDto } from "./dto/sign-response.dto";
import * as bcrypt from "bcrypt"
import { SignInDto } from "./dto/sign-in.dto";
import { InvalidCredentialsException } from "../exceptions/auth.exception";
import { ConflictError } from "../exceptions/conflict.exception";
import { ValidationError } from "../exceptions/validation.exception";
import {randomBytes} from "node:crypto";
import {BlacklistService} from "../blacklist/blacklist.service";

interface AuthResult {
    response: SignResponseDto
    userUuid: string
}

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(RefreshTokenEntity)
        private readonly refreshTokenRepo: Repository<RefreshTokenEntity>,
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly blacklistService: BlacklistService
    ) {}

    async signUp(data: SignUpDto): Promise<AuthResult> {
        if (!data.email || !data.password || !data.login || !data.name) {
            throw new ValidationError(
                'No required data',
                { fields: ['email', 'password', 'name', 'login'] },
            );
        }

        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
        if(!isEmailValid) {
            throw new ValidationError(
                'Invalid email format',
                { field: 'email' },
            );
        }

        const isLoginExist = await this.userService.getUserByLogin(data.login)
        if(isLoginExist) {
            throw new ConflictError('Username already exists');
        }

        const user = await this.userService.getUserByEmail(data.email)
        if(user) {
            throw new ConflictError('Email already exists');
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

    async signIn(data: SignInDto): Promise<AuthResult> {
        if (!data.identifier || !data.password) {
            throw new ValidationError(
                'Email and password are required',
                { fields: ['email', 'password'] },
            );
        }

        let user: UserEntity|null;
        user = await this.userService.getUserByEmail(data.identifier)
        if (!user) {
            user = await this.userService.getUserByLogin(data.identifier)
        }

        if(!user) {
            throw new InvalidCredentialsException();
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password)
        if(!isPasswordValid) {
            throw new InvalidCredentialsException();
        }

        return this.getTokens(user);
    }

    async signOut(uuid?: string, authorizationHeader?: string): Promise<null> {
        const accessToken = authorizationHeader?.startsWith('Bearer ')
            ? authorizationHeader.split(' ')[1]
            : null

        if (accessToken) {
            await this.blacklistService.addToBlacklist(accessToken)
        }

        if (!uuid) {
            return null
        }

        const user = await this.userService.getUserByUuid(uuid)

        if (!user) {
            return null
        }

        const refreshTokens = await this.refreshTokenRepo.find({
            where: {
                userId: user,
            },
        })

        for (const token of refreshTokens) {
            await token.remove()
        }

        return null
    }

    async refreshToken(token: string): Promise<AuthResult> {
        if(!token) {
            throw new ValidationError('No token provided');
        }

        const now = new Date()
        const refreshToken = await this.refreshTokenRepo.findOne({
            relations: ['user'],
            where: {
                token,
                expires: MoreThan(now)
            }
        })

        if(!refreshToken) {
            throw new ValidationError('Invalid token');
        }

        return this.getTokens(refreshToken.userId)
    }

    async getTokens(user: UserEntity): Promise<AuthResult> {
        const payload = {
            id: user.id,
            uuid: user.uuid,
            name: user.name,
            email: user.email,
            login: user.login,
        }

        const refreshToken = new RefreshTokenEntity()
        refreshToken.token = this.generateSecureToken()

        const expires = new Date()
        expires.setDate(expires.getDate() + 14)
        refreshToken.expires = expires
        refreshToken.userId = user

        const refreshTokenCreated = await refreshToken.save()
        const accessToken = await this.jwtService.signAsync(payload)

        return {
            response: new SignResponseDto(accessToken, refreshTokenCreated.token),
            userUuid: user.uuid,
        }
    }

    private generateSecureToken(): string {
        return randomBytes(48).toString("base64url")
    }
}
