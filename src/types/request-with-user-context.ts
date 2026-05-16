import type { Request } from 'express'
import type { UserEntity } from '../shared/models/user.entity'
import {SignUpDto} from "../auth/dto/sign-up.dto";

type RequestWithUserContext = Request & {
    userUuid?: string
    authorization?: string
    user?: SignUpDto | UserEntity
}

export default RequestWithUserContext