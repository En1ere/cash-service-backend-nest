import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class AuthException extends AppException {
    constructor(
        message: string,
        details?: Record<string, any>,
        status: number = HttpStatus.UNAUTHORIZED,
    ) {
        super(
            message,
            status,
            {
                code: 'AUTHENTICATION_ERROR',
                details,
            },
        );
    }
}

export class InvalidCredentialsException extends AppException {
    constructor(details?: Record<string, any>) {
        super(
            'Invalid credentials',
            HttpStatus.UNAUTHORIZED,
            {
                code: 'INVALID_CREDENTIALS',
                details,
            },
        );
    }
}