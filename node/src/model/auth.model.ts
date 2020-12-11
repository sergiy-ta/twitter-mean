import * as jwt from 'jsonwebtoken';
const secretKeyAuthToken = "secretKeysecretKeysecretKeysecretKey";

interface VerifyTokenCallback {
    (access: boolean, authData: { id: string } | undefined): void;
}

export default class AuthModel {
    constructor() { }

    // It's method for authentication user in system by id
    public login(id: string): Promise<string> {
        let promise = new Promise<string>((resolve, rejects) => {
            jwt.sign({ id }, secretKeyAuthToken, (error: any, token: any) => {
                if (!error) resolve(token);
                else console.error(error);
            });
        });

        return promise;
    }

    // It's method for verificate token
    public verifyToken(token: string, callback: VerifyTokenCallback): void {
        jwt.verify(token, secretKeyAuthToken, (error: any, authData: any) => {
            if (error) {
                callback(false, authData);
            } else {
                callback(true, authData);
            }
        });
    }
}