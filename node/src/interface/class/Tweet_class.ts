import Tweet from '../object/Tweet';

export default interface TweetClass {
    create(user_id: string, text: string): Promise<Tweet | null>;

    get(id: string): Promise<Tweet | null>;

    getList(): Promise<Tweet[]>;

    update(id: string, user_id: string): Promise<boolean>;

    delete(id: string): Promise<boolean>;
}