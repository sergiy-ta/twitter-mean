export interface User {
    readonly _id: string;
    first_name: string;
    last_name: string;
    email: string;
    age: string;
    password: string;
    readonly date_of_creation: Date;
}
