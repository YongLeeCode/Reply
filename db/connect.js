const dotenv = require('dotenv');
dotenv.config();

const MONGOClient = require('mongodb').MongoClient;
let _db;

const initDB = (callback) => {
    if (_db) {
        console.log(`DB is initiated.`);
        return callback(null, _db);
    }
    MONGOClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            _db = client;
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDB = () => {
    if (!_db) {
        throw Error (`db not initiated`);
    }
    return _db;
}

module.exports = {initDB, getDB};