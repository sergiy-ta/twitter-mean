import TweetClass from '../interface/class/Tweet_class';
import Tweet from '../interface/object/Tweet';

import TweetDatabase from '../database/tweet.database';

export default class TweetModel implements TweetClass {
    private readonly userDatabase: TweetDatabase;

    constructor() { 
        this.userDatabase = new TweetDatabase();
    }

    // It's method for create tweet
    public async create(user_id: string, text: string): Promise<Tweet | null> {
        return this.userDatabase.create(user_id, text);
    }

    // It's method for get tweet by id
    public async get(id: string): Promise<Tweet | null> {
        return this.userDatabase.get(id);
    }

    // It's method for get list all tweet
    public async getList(): Promise<Tweet[]> {
        return this.userDatabase.getList();
    }

    // It's method for update tweet by id
    public async update(id: string, text: string): Promise<boolean> {
        return this.userDatabase.update(id, text);
    }

    // It's methof for delete tweet by id
    public async delete(id: string): Promise<boolean> { 
        return this.userDatabase.delete(id);
    }
}