const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    email: String,
    password: String
});

const Account = mongoose.model('account', AccountSchema);

module.exports= Account;
