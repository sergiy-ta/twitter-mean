import TwitteClass from '../interface/class/Twitte_class';
import Twitte from '../interface/object/Twitte';

import TwitteDatabase from '../database/twitte.database';

export default class TwitteModel implements TwitteClass {
    private readonly userDatabase: TwitteDatabase;

    constructor() { 
        this.userDatabase = new TwitteDatabase();
    }

    public async create(user_id: string, text: string): Promise<Twitte | null> {
        return this.userDatabase.create(user_id, text);
    }

    public async get(id: string): Promise<Twitte | null> {
        return this.userDatabase.get(id);
    }

    public async getList(): Promise<Twitte[]> {
        return this.userDatabase.getList();
    }

    public async update(id: string, text: string): Promise<boolean> {
        return this.userDatabase.update(id, text);
    }

    public async delete(id: string): Promise<boolean> { 
        return this.userDatabase.delete(id);
    }
}