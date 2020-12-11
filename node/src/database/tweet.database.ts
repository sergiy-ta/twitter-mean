import { MongoClient, ObjectID } from 'mongodb';

import database from './database';

import Tweet from '../interface/object/Tweet';
import TweetClass from '../interface/class/Tweet_class';

export default class TweetDatabase implements TweetClass {
    private readonly collection: string = "tweet";

    constructor() { }

    private async connect() {
        return await MongoClient.connect(database.mongodbUrl, { useNewUrlParser: true });
    }

    // It's method for create tweet
    public create(user_id: string, text: string): Promise<Tweet | null> {
        let promise = new Promise<Tweet | null>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbTweet).collection(this.collection).insertOne({
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

    // It's method for get tweet by id
    public get(id: string): Promise<Tweet | null> {
        let promise = new Promise<Tweet | null>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbTweet).collection(this.collection).findOne({
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

    // It's method for get list all tweet
    public getList(): Promise<Tweet[]> {
        let promise = new Promise<Tweet[]>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbTweet).collection(this.collection).find({
                    
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

    // It's method for update tweet by id
    public update(id: string, text: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbTweet).collection(this.collection).findOneAndUpdate({ 
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

    // It's method for delete tweet by id
    public delete(id: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, rejects) => {
            this.connect().then(client => {
                client.db(database.dbTweet).collection(this.collection).deleteOne({ 
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