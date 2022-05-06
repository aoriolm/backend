const express = require("express");
const servicioSchema = require("../models/servicio");

const router = express.Router();

//const { validateCreate } = require("../validators/user");

// create servicio
router.post("/servicios", (req, res) => {
    const servicio = servicioSchema(req.body);
    servicio
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// get todos servicios
router.get("/servicios", (req, res) => {
    servicioSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// get un servicio
router.get("/servicios/:id", (req, res) => {
    const { id } = req.params; 
    servicioSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// update un servicio
router.put("/servicios/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, duracion } = req.body;
    servicioSchema
    .updateOne({ _id: id }, { $set: { nombre, descripcion, precio, duracion } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// delete un servicio
router.delete("/servicios/:id", (req, res) => {
    const { id } = req.params;
    servicioSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

module.exports = router;