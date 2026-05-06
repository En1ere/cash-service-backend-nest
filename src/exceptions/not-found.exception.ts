import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class NotFoundError extends AppException {
    constructor(
        message: string,
        details?: Record<string, any>,
    ) {
        super(
            message,
            HttpStatus.NOT_FOUND,
            {
                code: 'NOT_FOUND_ERROR',
                details,
            },
        );
    }
}