export interface ILogin {
    username: string,
    password: string;
}

export interface IPayload {
    userid: number;
    username: string;
}

export interface ILogon {
    result: Boolean;
    token?: string;
}