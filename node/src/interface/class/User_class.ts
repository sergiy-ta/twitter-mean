import User from '../object/User';

export default interface UserClass {
    create(last_name: string, first_name: string, age: number, email: string, password: string): Promise<User | null>;

    get(id: string): Promise<User | null>;
    
    getEmail(email: string): Promise<User | null>;

    getList(): Promise<User[]>;

    update(id: string, last_name: string, first_name: string, age: number, email: string, password: string): Promise<boolean>;

    delete(id: string): Promise<boolean>;
}