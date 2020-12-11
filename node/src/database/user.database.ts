import { MongoClient, ObjectID } from 'mongodb';

import database from './database';

import User from '../interface/object/User';
import UserClass from '../interface/class/User_class';

export default class UserDatabase implements UserClass {
    private readonly collection: string = "users";

    constructor() { }

    private async connect() {
        return await MongoClient.connect(database.mongodbUrl, { useNewUrlParser: true });
    }

    // It's method for create user
    public create(last_name: string, first_name: string, age: number, email: string, password: string): Promise<User | null> {
        let promise = new Promise<User | null>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbUsers).collection(this.collection).insertOne({
                    last_name: last_name,
                    first_name: first_name,
                    age: age,
                    email: email,
                    password: password,
                    date_of_creation: new Date(new Date().toISOString())
                }, (error: any, data: any) => {
                    if (!error) resolve(data['ops'][0] ?? null);
                    else rejects(error);
                });

                client.close();
            }).catch(error => {
                return error;
            });
        });

        return promise;
    }

    // It's method for get user by id
    public get(id: string): Promise<User | null> {
        let promise = new Promise<User | null>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbUsers).collection(this.collection).findOne({
                    _id: new ObjectID(id)
                }, (error: any, user: any) => {
                    if (!error) resolve(user ?? null);
                    else rejects(error);
                });

                client.close();
            }).catch(error => {
                rejects(error);
            });
        });

        return promise;
    }

    // It's method for get user by email
    public getEmail(email: string): Promise<User | null> {
        let promise = new Promise<User>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbUsers).collection(this.collection).findOne({
                    email: email
                }, (error: any, user: any) => {
                    if (!error) resolve(user ?? null);
                    else console.error(error);
                });

                client.close();
            }).catch(error => {
                console.error(error);
            });
        });

        return promise;
    }

    // It's method for get list all user
    public getList(): Promise<User[]> {
        let promise = new Promise<User[]>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbUsers).collection(this.collection).find({
                    
                }).toArray((error: any, data: any) => {
                    if (!error) resolve(data ?? []);
                    else rejects(error);
                });

                client.close();
            }).catch(error => {
                rejects(error);
            });
        });

        return promise;
    }

    // It's method for update user by id
    public update(id: string, last_name: string, first_name: string, age: number, email: string, password: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbUsers).collection(this.collection).findOneAndUpdate({ 
                    _id: new ObjectID(id) 
                }, {'$set': {
                    last_name: last_name,
                    first_name: first_name,
                    age: age,
                    email: email,
                    password: password,
                }}, (error: any, user: any) => {
                    if (!error) resolve(user ? true : false);
                    else {
                        rejects(error);
                        resolve(false);
                    }
                });
    
                client.close();
            }).catch(error => {
                rejects(error);
                resolve(false);
            });
        });
        
        return promise;
    }

    // It's method for delete user by id
    public delete(id: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbUsers).collection(this.collection).deleteOne({ 
                    _id: new ObjectID(id)
                }, (error: any, user: any) => {
                    if (!error) resolve(user ? true : false);
                    else {
                        rejects(error);
                        resolve(false);
                    }
                });
    
                client.close();
            }).catch(error => {
                rejects(error);
                resolve(false);
            });
        });
        
        return promise;
    }
}