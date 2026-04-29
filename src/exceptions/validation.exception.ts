import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class ValidationError extends AppException {
    constructor(
        message: string,
        details?: Record<string, any>,
        status: number = HttpStatus.BAD_REQUEST,
    ) {
        super(
            message,
            status,
            {
                code: 'VALIDATION_ERROR',
                details,
            },
        );
    }
}