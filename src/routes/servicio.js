const express = require("express");
const servicioSchema = require("../models/servicio");
const mid_auth = require('../middlewares/authenticated');
const router = express.Router();

// create servicio
router.post("/servicios", mid_auth.isLoggedIn, (req, res) => {
    const servicio = servicioSchema(req.body);
    servicio
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// get todos servicios
router.get("/servicios", mid_auth.isLoggedIn, (req, res) => {
    servicioSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// get un servicio
router.get("/servicios/:id", mid_auth.isLoggedIn, (req, res) => {
    const { id } = req.params;
    servicioSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// update un servicio
router.put("/servicios/:id", mid_auth.isLoggedIn, (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, duracion } = req.body;
    servicioSchema
    .updateOne({ _id: id }, { $set: { nombre, descripcion, precio, duracion } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// delete un servicio
router.delete("/servicios/:id", mid_auth.isLoggedIn, (req, res) => {
    const { id } = req.params;
    servicioSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

module.exports = router;