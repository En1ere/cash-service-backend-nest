import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class ForbiddenError extends AppException {
    constructor(
        message: string,
        details?: Record<string, any>,
    ) {
        super(
            message,
            HttpStatus.FORBIDDEN,
            {
                code: 'FORBIDDEN_ERROR',
                details,
            },
        );
    }
}