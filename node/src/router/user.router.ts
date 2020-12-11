
import express from 'express';

import User from '../interface/object/User';
import AuthModel from '../model/auth.model';

import UserModel from '../model/user.model';

const jsonParser = express.json();

const router: express.Router = express.Router();

// It's router for get all list user
router.get('/user', async (req: express.Request, res: express.Response) => {
    let userModel: UserModel = new UserModel();
    let user_list: User[] = await userModel.getList();

    res.send({
        user_list: user_list
    });
});

// It's router for get user by id
router.get('/user/:id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    let userModel: UserModel = new UserModel();
    let user: User | null = await userModel.get(id);

    res.send({
        user: user
    });
});

// It's router for create user
router.post('/user', jsonParser, async (req: express.Request, res: express.Response) => {
    let first_name: string = req.body.first_name;
    let last_name: string = req.body.last_name;
    let email: string = req.body.email;
    let age: number = parseInt(req.body.age);
    let password: string = req.body.password;
    console.log(req.body);

    let userModel: UserModel = new UserModel();
    let user: User | null = await userModel.create(last_name, first_name, age, email, password);

    let token: string = "";
    if (user) {
        let authModel: AuthModel = new AuthModel();
        token = await authModel.login(user._id.toString()) ?? '';
    }

    // It's pause of 3 second for login in system
    setTimeout(() => {
        res.send({
            is_create: !!user,
            token: token
        });
    }, 3000);
});

// It's router for update user by id
router.put('/user', jsonParser, async (req: express.Request, res: express.Response) => {
    let id: string = req.body.id;
    let first_name: string = req.body.first_name;
    let last_name: string = req.body.last_name;
    let email: string = req.body.email;
    let age: number = parseInt(req.body.age);
    let password: string = req.body.passwrod;

    let userModel: UserModel = new UserModel();
    let is_update: boolean = await userModel.update(id, last_name, first_name, age, email, password);

    res.send({
        is_update: is_update
    });
});

// It's router for delete by id
router.delete('/user/:id', async (req: express.Request, res: express.Response) => {
    let id: string = req.params.id;

    let userModel: UserModel = new UserModel();
    let is_delete: boolean = await userModel.delete(id);

    res.send({
        is_delete: is_delete
    });
});


export default router;