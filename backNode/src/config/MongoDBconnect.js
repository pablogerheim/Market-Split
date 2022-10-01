import mongconnect from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

function MongoDBconnect() {
    const uri = process.env.MONGOKEY;
    return new mongconnect.MongoClient(uri);
}

export default MongoDBconnect;
