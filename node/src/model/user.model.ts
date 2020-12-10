import UserClass from '../interface/class/User_class';
import User from '../interface/object/User';

import UserDatabase from '../database/user.database';
import PasswordModel from './password.model';
import TryLoginDatetimModel from './try_login_datetime.datebase';

export default class UserModel implements UserClass {
    private readonly userDatabase: UserDatabase;

    constructor() { 
        this.userDatabase = new UserDatabase();
    }

    public async create(last_name: string, first_name: string, age: number, email: string, password: string): Promise<User | null> {
        if (!(await this.getEmail(email))) {
            let passwordHashModel: PasswordModel = new PasswordModel(password);
            let hashPassword: string = passwordHashModel.hashPassword();

            let user: User | null = await this.userDatabase.create(last_name, first_name, age, email, hashPassword);

            let tryLoginDatetimeModel: TryLoginDatetimModel = new TryLoginDatetimModel();
            if (user) tryLoginDatetimeModel.create(user);
            
            return user;
        } else {
            return null;
        }
    }

    public async get(id: string): Promise<User | null> {
        return this.userDatabase.get(id);
    }

    public async getEmail(email: string): Promise<User | null> {
        return await this.userDatabase.getEmail(email);
    }

    public async getList(): Promise<User[]> {
        return this.userDatabase.getList();
    }

    public async update(id: string, last_name: string, first_name: string, age: number, email: string, password: string): Promise<boolean> {
        return this.userDatabase.update(id, last_name, first_name, age, email, password);
    }

    public async delete(id: string): Promise<boolean> { 
        return this.userDatabase.delete(id);
    }
}