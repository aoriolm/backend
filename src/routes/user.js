const express = require("express");
const userSchema = require("../models/user");
const userController = require('../controllers/user');

const router = express.Router();

const { validateCreate } = require("../validators/user");

// create user
router.post("/users", (req, res) => {
    const user = userSchema(req.body);
    user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

router.post('/signup', userController.signup);
// get all users
/*router.get("/users", (req, res) => {
    userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});*/

router.post('/login', userController.login);

//router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);

router.get('/users', userController.getUsers);

// get a user
router.get("/users/:id", (req, res) => {
    const { id } = req.params; 
    console.log(id);
    userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// update a user
router.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { email, password, nombre, apellido1, apellido2, nacimiento, tel1, tel2, genero, rol } = req.body;
    userSchema
    .updateOne({ _id: id }, { $set: { email, password, nombre, apellido1, apellido2, nacimiento, tel1, tel2, genero, rol } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// delete a user
router.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

module.exports = router;
