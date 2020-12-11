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

    // It's method for create user
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

    // It's method for get user by id
    public async get(id: string): Promise<User | null> {
        return this.userDatabase.get(id);
    }

    // It's method for get user by email 
    public async getEmail(email: string): Promise<User | null> {
        return await this.userDatabase.getEmail(email);
    }

    // It's method for list all user
    public async getList(): Promise<User[]> {
        return this.userDatabase.getList();
    }

    // It's method for update user by id
    public async update(id: string, last_name: string, first_name: string, age: number, email: string, password: string): Promise<boolean> {
        return this.userDatabase.update(id, last_name, first_name, age, email, password);
    }

    // It's method for delete user by id
    public async delete(id: string): Promise<boolean> { 
        return this.userDatabase.delete(id);
    }
}