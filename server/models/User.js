const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    createdAt: {
        default: Date.now(),
        type: Date
    },
    Role: String,
});

// Pre-save hook on the UserSchema:
// hashes the user's password before saving it to the database
UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

