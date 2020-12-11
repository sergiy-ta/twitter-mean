import { User } from './user';

export interface Tweet {
    readonly _id: string;
    readonly user: User | {
        _id: string
    };
    text: string;
    readonly date_of_creation: Date;
}
