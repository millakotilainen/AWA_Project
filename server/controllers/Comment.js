const express = require("express");
const router = express.Router();
const Comment = require('../models/Comment.js');
const mongoose = require('mongoose');
const protected = require('../middleware/Protected');

// Endpoint to create a new comment
router.post('/create', protected, async (req,res) => {
    // Create a new Comment instance based on the request data
    const newComment = Comment({
        threadId: req.body.threadId,
        comment: req.body.comment,
        author: req.userId,
    });

    // Save the new comment to the database
    await newComment.save();
    res.send(newComment);
});

// Endpoint to retrieve comments for a certain thread
router.get('/thread/:id', async (req, res) => {
    // Check if the provided thread ID is a valid MongoDB ObjectId
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.sendStatus(404);
    }

    // Parse the 'page' query parameter, default to page 1 if not provided
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const threadId = req.params.id;

    // Calculate the number of comments to skip based on the current page
    const skip = (page - 1) * perPage;

    const comment = await Comment.find({threadId})
        .limit(perPage) // Limit the number of comments per page
        .skip(skip).exec(); 
    res.send(comment);
});



module.exports = router;
