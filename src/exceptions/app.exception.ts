import { HttpException, HttpStatus } from '@nestjs/common';

export type AppExceptionCode =
    'AUTHENTICATION_ERROR'
    | 'INVALID_CREDENTIALS'
    | 'VALIDATION_ERROR'
    | 'CONFLICT_ERROR'
    | 'INTERNAL_ERROR'
    | string;

export interface AppExceptionContext {
    code: AppExceptionCode;
    details?: Record<string, any> | null;
}

export class AppException extends HttpException {
    constructor(
        message: string,
        status: number = HttpStatus.INTERNAL_SERVER_ERROR,
        context: Partial<AppExceptionContext> = {},
    ) {
        super(
            {
                message,
                code: context.code || 'INTERNAL_ERROR',
                details: context.details || null,
            },
            status,
        );
    }
}