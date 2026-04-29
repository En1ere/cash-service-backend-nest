import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class ConflictError extends AppException {
    constructor(
        message: string,
        details?: Record<string, any>,
    ) {
        super(
            message,
            HttpStatus.CONFLICT,
            {
                code: 'CONFLICT_ERROR',
                details,
            },
        );
    }
}