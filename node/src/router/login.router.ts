import express from 'express';

import UserModel from '../model/user.model';

import User from '../interface/object/User';
import AuthModel from '../model/auth.model';
import LoginModel from '../model/login.model';
import TryLoginDatetimModel from '../model/try_login_datetime.datebase';

const login_api: express.Router = express.Router();
const jsonParser = express.json();

login_api.get('/login', async (req: express.Request, res: express.Response) => {
    let token: string | undefined = req.headers.authorization;

    if (token) {
        token = token.replace('Bearer ', '');

        let authModel: AuthModel = new AuthModel();
        authModel.verifyToken(token, async (access: boolean, authData: { id: string } | undefined) => {
            if (access) {
                let user: User | null = null;
                let userModel: UserModel = new UserModel();
                console.log(user);
                if (authData) user = await userModel.get(authData.id);

                res.status(200).send(user);
            } else {
                res.sendStatus(401);
            }
        });
    } else {
        res.sendStatus(401);
    }
});

login_api.post('/login', jsonParser, async (req: express.Request, res: express.Response) => {
    if (!req.body) return res.sendStatus(400);

    let email: string = req.body.email;
    let password: string = req.body.password;

    if (typeof email === 'string') email = email.trim();
    if (typeof password === 'string') password = password.trim();

    if (email && password) {
        let userModel: UserModel = new UserModel();
        let user: User | null = await userModel.getEmail(email);

        if (user) {
            let tryLoginDatetimModel: TryLoginDatetimModel = new TryLoginDatetimModel();
            let access: { canLogin: boolean, number: number } = await tryLoginDatetimModel.userCanLogin(user);

            if (access.canLogin) { 
                let loginModel: LoginModel = new LoginModel(email, password);
                let token: string = await loginModel.login() ?? '';

                if (token === '') {
                    setTimeout(() => {
                        res.sendStatus(401);
                    }, 3000);
                } else {
                    setTimeout(() => {
                        res.status(200).send({token: token, number: 0});
                    }, 3000);
                }
            } else {
                setTimeout(() => {
                    res.status(403).send({
                        number: access.number,
                        token: ''
                    });
                }, 3000);
            }
        } else {
            setTimeout(() => {
                res.sendStatus(401);
            }, 3000);
        }
    } else {
        setTimeout(() => {
            res.sendStatus(401);
        }, 3000);
    }
});

export default login_api;