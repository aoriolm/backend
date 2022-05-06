const express = require("express");
const citaSchema = require("../models/cita");

const router = express.Router();

//const { validateCreate } = require("../validators/cita");

// create cita
router.post("/citas", (req, res) => {
    const cita = citaSchema(req.body);
    cita
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});
// get all citas
router.get("/citas", (req, res) => {
    citaSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// get a cita
router.get("/citas/:id", (req, res) => {
    const { id } = req.params; 
    citaSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// update a cita
router.put("/citas/:id", (req, res) => {
    const { id } = req.params;
    const { fecha, hora, duracion, nombre, apellido1, apellido2, servicios, tel1, tel2 } = req.body;
    citaSchema
    .updateOne({ _id: id }, { $set: { fecha, hora, duracion, nombre, apellido1, apellido2, servicios, tel1, tel2 } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// delete a cita
router.delete("/citas/:id", (req, res) => {
    const { id } = req.params;
    citaSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

module.exports = router;
