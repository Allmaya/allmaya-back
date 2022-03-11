const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserSchema = new Schema({
    userName: String,
    userId: String,
});

UserSchema.methods.setUserId = async function(userId) {
    this.userId = userId;
}

UserSchema.statics.findByUserId = function(userId) {
    return this.findOne({ userId: userId });
}

const User = mongoose.model('User', UserSchema);
module.exports = { User };