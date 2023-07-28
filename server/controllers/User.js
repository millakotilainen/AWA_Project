const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require('bcryptjs');

router.get('/init', async (req, res) => {
    const user = await User.findById(req.userId);

    res.send({user});
});

router.post('/register', async (req, res) => {
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

router.post('/login', async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(400).send({message: 'User with this email cannot be found'});
    }

    const passwordIsEqual = await bcrypt.compare(req.body.password, user.password);
    if(!passwordIsEqual) {
        return res.status(401).send({message: 'Wrong password'});
    }

    const token = jwt.sign({userId: user._id}, 'app');

    res.send({user, token});
});

router.post("/change-name", async (req, res) => {
    const user = await User.findById(req.body.userId);

    user.name = req.body.name;
    await user.save();
    return res.sendStatus(200);
});

router.post("/change-email", async (req, res) => {
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists){
        return res.status(400).send({
            message: "This email is already taken"
        });
    }

    const user = await User.findById(req.body.userId);

    user.email = req.body.email;
    await user.save();
    return res.sendStatus(200);
});

router.post("/change-password", async (req, res) => {
    const user = await User.findById(req.body.userId);

    const passwordIsEqual = await bcrypt.compare(req.body.currentPassword, user.password);
    if (!passwordIsEqual){
        return res.status(401).send({
            message: "Password is incorrect"
        });
    }

    user.password = req.body.password;
    await user.save();
    res.sendStatus(200);
});

module.exports = router;