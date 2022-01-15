export const SECRET: string = process.env.TOKEN_SECRET as string;

export interface IRequestResult {
    code: number;
    msg: string;
    data: object;
}