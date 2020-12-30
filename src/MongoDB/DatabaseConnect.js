const mongoose = require('mongoose');
const URL = "mongodb://admin123:admin123@basededatos1-shard-00-00.7nwet.mongodb.net:27017,basededatos1-shard-00-01.7nwet.mongodb.net:27017,basededatos1-shard-00-02.7nwet.mongodb.net:27017/basededatos1?ssl=true&replicaSet=atlas-vy84mu-shard-0&authSource=admin&retryWrites=true&w=majority";
module.exports = () => {
    mongoose.set('useCreateIndex', true);
    //le agregue esta nueva instruccion para solucionar el error
    //DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
    mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('DB conectada');
    }).catch((err) => {
        console.error(err);
    });
}