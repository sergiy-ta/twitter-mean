// model
import AuthModel from "./auth.model";
import PasswordModel from "./password.model";
import TryLoginDatetimModel from './try_login_datetime.datebase';

// database
import UserDatabase from "../database/user.database";

// interface
import User from "../interface/object/User";

export default class LoginModel {
    private email: string;
    private password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    // It's method for login user in system
    public async login(): Promise<string | undefined> {
        let passwordHashModel: PasswordModel = new PasswordModel(this.password);
        let userDatabase: UserDatabase = new UserDatabase();
        let authModel: AuthModel = new AuthModel();

        let user: User | null = await userDatabase.getEmail(this.email);

        if (user) {
            let tryLoginDatetimeModel: TryLoginDatetimModel = new TryLoginDatetimModel();
            tryLoginDatetimeModel.create(user);

            if (passwordHashModel.verificatePassword(user.password)) {
                return await authModel.login(user._id.toString());
            }
        }
    }
}