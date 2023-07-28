const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const threadSchema = new Schema({
    title: String,
    description: String,
    createdAt: {
        default: Date.now(),
        type: Date
    }, 
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    /*
    upvotes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
    */
});

const Thread = mongoose.model('Thread', threadSchema);
module.exports = Thread;
