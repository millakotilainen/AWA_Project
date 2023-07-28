const express = require("express");
const router = express.Router();
const Thread = require('../models/Tread.js');
const mongoose = require('mongoose');
const protected = require('../middleware/Protected');

router.post('/create', protected, async (req,res) => {
    try{
        const newThread = Thread({
            title: req.body.title,
            description: req.body.description,
            author: req.userId,
        });

        await newThread.save();
        res.send(newThread);
    } catch {
        res.status(500).send("Error creating the thread");
    }
        
});

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const skip = (page - 1) * perPage;

    const threads = await Thread.find()
        .limit(perPage)
        .skip(skip).exec();;
    res.send(threads);
});

router.get('/:id', async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.sendStatus(404);
    }

    const thread = await Thread.findById(req.params.id).populate('author', 'name');
    res.send(thread);
});



module.exports = router;

/*
router.put("/like/:id", protected, async (req, res) => {
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