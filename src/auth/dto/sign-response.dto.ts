// export class SignResponseDto {
//     accessToken: string
//     refreshToken: string
//
//     constructor(accessToken: string, refreshToken: string) {
//         this.accessToken = accessToken
//         this.refreshToken = refreshToken
//     }
// }
export class SignResponseDto {
    message: string

    constructor(message: string) {
        this.message = message
    }
}