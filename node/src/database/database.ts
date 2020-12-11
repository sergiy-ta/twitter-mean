import * as fs from 'fs';

// It's url for connect to mongodb
const mongodbUrl: string = fs.readFileSync('src/database/mongodb_url.txt', 'utf8');

// It's databases name
const dbUsers: string = "users";
const dbTweet: string = "tweet";

const database = {
    mongodbUrl,
    dbUsers,
    dbTweet
}

export default database;