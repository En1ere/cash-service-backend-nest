import { HttpException } from '@nestjs/common';

export class BaseHttpException extends HttpException {
    constructor(
        response: string | object,
        status: number,
    ) {
        super(response, status);
    }
}