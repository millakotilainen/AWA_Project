const express = require("express");
const router = express.Router();
const Thread = require('../models/Tread.js');
const mongoose = require('mongoose');
const protected = require('../middleware/Protected');

// Endpoint to create a new thread
router.post('/create', protected, async (req,res) => {
    try{
        // Create a new Thread instance based on the request data
        const newThread = Thread({
            title: req.body.title,
            description: req.body.description,
            author: req.userId,
        });

        // Save the new thread to the database
        await newThread.save();
        res.send(newThread);
    } catch {
        res.status(500).send("Error creating the thread");
    }
        
});

// Endpoint to retrieve paginated threads
router.get('/', async (req, res) => {
    // Parse the 'page' query parameter, default to page 1 if not provided
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const skip = (page - 1) * perPage;

    const threads = await Thread.find()
        .limit(perPage) // Limit the number of threads per page
        .skip(skip).exec();;
    res.send(threads);
});

// Endpoint to retrieve a specific thread by its ID
router.get('/:id', async (req, res) => {
    // Check if the provided thread ID is a valid MongoDB ObjectId
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.sendStatus(404);
    }

    // Fetch the thread by its ID from the database and populate the 'author' field with 'name' property
    const thread = await Thread.findById(req.params.id).populate('author', 'name');
    res.send(thread);
});



module.exports = router;
