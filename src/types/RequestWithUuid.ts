export default interface RequestWithUserUuid extends Request {
    userUuid?: string;
    authorization?: string;
}
