const express = require("express");
const userSchema = require("../models/user");
const userController = require('../controllers/user');

const router = express.Router();
const jwt = require('jsonwebtoken');
const app = express();
const mid_auth = require('../middlewares/authenticated');

const { validateCreate } = require("../validators/user");

// create user
router.post('/signup', validateCreate, mid_auth.isLoggedIn, userController.signup);

// login user
router.post('/login', userController.login);

// get all users
router.get('/users', mid_auth.isLoggedIn, userController.getUsers);

// get a user
router.get("/users/:id", mid_auth.isLoggedIn, (req, res) => {
    const { id } = req.params; 
    userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});


// update a user
router.put('/users/:id', mid_auth.isLoggedIn, userController.updateUser);

// delete a user
router.delete("/users/:id", mid_auth.isLoggedIn, (req, res) => {
    const { id } = req.params;
    userSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

module.exports = router;
