const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    threadId: mongoose.ObjectId,
    comment: String, 
    createdAt: {
        default: Date.now(),
        type: Date
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    /*upvotes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
    */
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;