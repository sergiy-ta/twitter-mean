import TryLoginDatetime from "../object/TryLoginDatetime";
import User from "../object/User";

export default interface TryLoginDatetimeClass {
    create(user: User | { _id: string }): Promise<TryLoginDatetime | null>;

    getUserList(user: User | { _id: string }): Promise<TryLoginDatetime[]>;
}