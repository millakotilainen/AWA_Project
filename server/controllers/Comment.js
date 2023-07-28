const express = require("express");
const router = express.Router();
const Comment = require('../models/Comment.js');
const mongoose = require('mongoose');
const protected = require('../middleware/Protected');

router.post('/create', protected, async (req,res) => {
    const newComment = Comment({
        threadId: req.body.threadId,
        comment: req.body.comment,
        author: req.userId,
    });

    await newComment.save();
    res.send(newComment);
});


router.get('/thread/:id', async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.sendStatus(404);
    }

    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const threadId = req.params.id;

    const skip = (page - 1) * perPage;

    const comment = await Comment.find({threadId})
        .limit(perPage)
        .skip(skip).exec();
    res.send(comment);
});


module.exports = router;

/*router.put("/like/:id", protected, async (req, res) => {
    const thread = await Thread.findById(req.params.id);
    if (!thread) return res.status(400).send("Thread doesn't exists");

    if (thread.author == req.user._id)
    return res.status(400).send("You can't upvote your own thread");

    const upvoteArray = thread.upvotes;
    const index = upvoteArray.indexOf(req.user._id);
    if (index === -1) {
        upvoteArray.push(req.user._id);
    } else {
        upvoteArray.splice(index, 1);
    }

    thread.upvotes = upvoteArray;
    const result = await thread.save();

    const thread_new = await Thread.find({ _id: thread._id }).populate(
        "author",
        "name username"
    );
    res.send(thread_new);

});*/