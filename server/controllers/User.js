const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require('bcryptjs');

// Endpoint to initialize and get user information 
router.get('/init', async (req, res) => {
    // Fetch user information based on the 'userId'
    const user = await User.findById(req.userId);
    res.send({user});
});

// Endpoint to register a new user
router.post('/register', async (req, res) => {
     // Check if a user with the provided email already exists
    const user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).send({message: 'User with this email already exists'});
    }

    const newUser = User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: 'user'
    });

    await newUser.save();

    return res.sendStatus(201);
});

// Endpoint to handle user login
router.post('/login', async (req, res) => {
    // Find the user with the provided email
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(400).send({message: 'User with this email cannot be found'});
    }
    // Compare the provided password with the user's hashed password in the database
    const passwordIsEqual = await bcrypt.compare(req.body.password, user.password);
    if(!passwordIsEqual) {
        return res.status(401).send({message: 'Wrong password'});
    }

    // If login is successful, create a JWT token containing the 'userId'
    const token = jwt.sign({userId: user._id}, 'app');

    res.send({user, token});
});

// Endpoint to change the user's name
router.post("/change-name", async (req, res) => {
    const user = await User.findById(req.body.userId);
    // Update the user's name with the new name from the request body
    user.name = req.body.name;
    await user.save();
    return res.sendStatus(200);
});

// Endpoint to change the user's email
router.post("/change-email", async (req, res) => {
    // Check if the new email is already taken by another user
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists){
        return res.status(400).send({
            message: "This email is already taken"
        });
    }

    const user = await User.findById(req.body.userId);
    // Update the user's email with the new email from the request body
    user.email = req.body.email;
    await user.save();
    return res.sendStatus(200);
});

// Endpoint to change the user's password
router.post("/change-password", async (req, res) => {
    const user = await User.findById(req.body.userId);

    const passwordIsEqual = await bcrypt.compare(req.body.currentPassword, user.password);
    if (!passwordIsEqual){
        return res.status(401).send({
            message: "Password is incorrect"
        });
    }
    // Update the user's password with the new password from the request body
    user.password = req.body.password;
    await user.save();
    res.sendStatus(200);
});

module.exports = router;