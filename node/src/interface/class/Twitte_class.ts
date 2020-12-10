import Twitte from '../object/Twitte';

export default interface TwitteClass {
    create(user_id: string, text: string): Promise<Twitte | null>;

    get(id: string): Promise<Twitte | null>;

    getList(): Promise<Twitte[]>;

    update(id: string, user_id: string): Promise<boolean>;

    delete(id: string): Promise<boolean>;
}