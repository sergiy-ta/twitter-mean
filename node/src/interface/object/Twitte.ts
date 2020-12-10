import User from "./User";

export default interface Twitte {
    readonly _id: string,
    readonly user: User | {
        _id: string
    },
    text: string,
    readonly date_of_creation: Date
}