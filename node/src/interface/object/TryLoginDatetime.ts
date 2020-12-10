import User from "./User";

export default interface TryLoginDatetime {
    readonly _id: string;
    readonly user: User | {
        _id: string
    };
    readonly date_of_creation: Date;
}