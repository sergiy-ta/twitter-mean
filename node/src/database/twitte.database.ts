import { MongoClient, ObjectID } from 'mongodb';

import database from './database';

import Twitte from '../interface/object/Twitte';
import TwitteClass from '../interface/class/Twitte_class';

export default class TwitteDatabase implements TwitteClass {
    private readonly collection: string = "twitte";

    constructor() { }

    private async connect() {
        return await MongoClient.connect(database.mongodbUrl, { useNewUrlParser: true });
    }

    public create(user_id: string, text: string): Promise<Twitte | null> {
        let promise = new Promise<Twitte | null>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbTwitte).collection(this.collection).insertOne({
                    user_id: new ObjectID(user_id),
                    text: text,
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

    public get(id: string): Promise<Twitte | null> {
        let promise = new Promise<Twitte | null>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbTwitte).collection(this.collection).findOne({
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

    public getList(): Promise<Twitte[]> {
        let promise = new Promise<Twitte[]>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbTwitte).collection(this.collection).find({
                    
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

    public update(id: string, text: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbTwitte).collection(this.collection).findOneAndUpdate({ 
                    _id: new ObjectID(id) 
                }, {'$set': {
                    text: text,
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

    public delete(id: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbTwitte).collection(this.collection).deleteOne({ 
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