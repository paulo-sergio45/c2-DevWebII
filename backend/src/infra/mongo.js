const mongoose = require('mongoose');

const strConnection = process.env.NODE_ENV === "development" ?  `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.HOSTNAME}:${process.env.PORT}/${process.env.DATABASE}?authSource=admin`
: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@devwebii.qbg3h.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(strConnection, { useNewUrlParser: true, useUnifiedTopology: true });



const db = mongoose.connection;

db.on('error', console.error.bind(console, 'erro ao conectar no mongodb'));
db.once('open', function () {
    console.log('sucesso ao conectar no mongodb');
});

module.exports = db;