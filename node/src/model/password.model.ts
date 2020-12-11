// package
import * as passwordHash from 'password-hash';

export default class PasswordModel {
    private password: string;

    constructor(password: string) {
        this.password = password;
    }

    // It's method for create hash for password
    public hashPassword(): string {
        return passwordHash.generate(this.password);
    }

    // It's method for verification password of hash
    public verificatePassword(hashedPassword: string): boolean {
        return passwordHash.verify(this.password, hashedPassword);
    }
}