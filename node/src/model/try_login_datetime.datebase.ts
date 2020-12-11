import TryLoginDatetimeClass from '../interface/class/TryLoginDatetime_class';
import TryLoginDatetime from '../interface/object/TryLoginDatetime';
import User from '../interface/object/User';

import TryLoginDatetimeDatabase from '../database/try_login_datetime.database';

export default class UserModel implements TryLoginDatetimeClass {
    private readonly tryLoginDatetimeDatabase: TryLoginDatetimeDatabase;

    constructor() { 
        this.tryLoginDatetimeDatabase = new TryLoginDatetimeDatabase();
    }

    // It's method for save login user
    public async create(user: User | { _id: string }): Promise<TryLoginDatetime | null> {
        return await this.tryLoginDatetimeDatabase.create(user);
    }

    // It's method for get list all login of user
    public async getUserList(user: User | { _id: string }): Promise<TryLoginDatetime[]> {
        return this.tryLoginDatetimeDatabase.getUserList(user);
    }

    // It's method for verification of user can login in system
    public async userCanLogin(user: User | { _id: string }): Promise<{ canLogin: boolean, number: number }> {
        return new Promise<{ canLogin: boolean, number: number}>((resolve) => {
            this.getUserList(user).then((try_login_datetime_array: TryLoginDatetime[]) => {
                let number_in_5_minute: number = 0;
                let number_in_60_minute: number = 0;

                if (try_login_datetime_array.length !== 0) {
                    for (let i: number = try_login_datetime_array.length - 1; i >= 0; i--) {
                        let date: Date = try_login_datetime_array[i].date_of_creation;

                        if (Date.now() - date.getTime() < 1000 * 60 * 60) {
                            number_in_60_minute++;
                            if (number_in_60_minute >= 10) {
                                resolve({ canLogin: false, number: 60});
                            }
                        } else if (Date.now() - date.getTime() > 1000 * 60 * 60) {
                            resolve({ canLogin: true, number: 0 });
                            break;
                        }

                        if (Date.now() - date.getTime() < 1000 * 60 * 5) {
                            number_in_5_minute++;
                            if (number_in_5_minute >= 5) {
                                resolve({ canLogin: false, number: 5 });
                            }
                        }
                        
                        if (number_in_5_minute < 5 && i === 0) {
                            resolve({ canLogin: true, number: 0 });
                        }
                    }
                } else {
                    resolve({ canLogin: true, number: 0 });
                }
            });
        });
    }
}