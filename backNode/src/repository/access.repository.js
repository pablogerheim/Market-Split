import User from '../models/user.model.js';
import mongconnect from '../config/MongoDBconnect.js';

async function getBlackList() {
    const conn = mongconnect();
    try {
        await conn.connect();
        const data = await conn
            .db('market')
            .collection('blacklist')
            .findOne({ blackList: 'BlackList' });
        return data;
    } catch (err) {
        throw err;
    } finally {
        await conn.close();
    }
}

async function updateBlackList(props) {
    const conn = mongconnect();
    try {
        await conn.connect();
        const data = await conn
            .db('market')
            .collection('blacklist')
            .findOneAndUpdate(
                { blackList: 'BlackList' },
                { $set: { ...props } },
            );
        return data;
    } catch (err) {
        throw err;
    } finally {
        await conn.close();
    }
}

async function printUser() {
    try {
        return await User.findAll();
    } catch (err) {
        throw err;
    }
}

export default {
    printUser,
    getBlackList,
    updateBlackList,
};