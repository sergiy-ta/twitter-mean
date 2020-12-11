import { MongoClient, ObjectID } from 'mongodb';

import database from './database';

import User from '../interface/object/TryLoginDatetime';
import TryLoginDatetime from '../interface/object/TryLoginDatetime';
import TryLoginDatetimeClass from '../interface/class/TryLoginDatetime_class';

export default class TryLgin implements TryLoginDatetimeClass {
    private readonly collection: string = "try_login_datetime";

    constructor() { }

    private async connect() {
        return await MongoClient.connect(database.mongodbUrl, { useNewUrlParser: true });
    }

    // It's method for save login user
    public create(user: User | { _id: string }): Promise<TryLoginDatetime | null> {
        return new Promise<TryLoginDatetime | null>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbUsers).collection(this.collection).insertOne({
                    user: { _id: new ObjectID(user._id) },
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
    }

    // It's method for get list all login of user
    public getUserList(user: User | { _id: string }): Promise<TryLoginDatetime[]> {
        return new Promise<TryLoginDatetime[]>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbUsers).collection(this.collection).find({
                    user: { _id: new ObjectID(user._id) }
                }).toArray((error: any, data: any) => {
                    if (!error) resolve(data ?? []);
                    else rejects(error);
                });

                client.close();
            }).catch(error => {
                rejects(error);
            });
        });
    }
}