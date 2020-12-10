import * as fs from 'fs';

const mongodbUrl: string = fs.readFileSync('src/database/mongodb_url.txt', 'utf8');

const dbUsers: string = "users";
const dbTwitte: string = "twitte";

const database = {
    mongodbUrl,
    dbUsers,
    dbTwitte
}

export default database;