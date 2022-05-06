const express = require("express");
const familiaSchema = require("../models/familia");

const router = express.Router();

//const { validateCreate } = require("../validators/familia");

// create familia
router.post("/familias", (req, res) => {
    const familia = familiaSchema(req.body);
    familia
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});
// get all familias
router.get("/familias", (req, res) => {
    familiaSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// get a familia
router.get("/familias/:id", (req, res) => {
    const { id } = req.params; 
    familiaSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// update a familia
router.put("/familias/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    familiaSchema
    .updateOne({ _id: id }, { $set: { nombre, descripcion } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// delete a familia
router.delete("/familias/:id", (req, res) => {
    const { id } = req.params;
    familiaSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

module.exports = router;
