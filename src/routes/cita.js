const express = require("express");
const citaSchema = require("../models/cita");
const mid_auth = require('../middlewares/authenticated');
const router = express.Router();

// create cita
router.post("/citas", mid_auth.isLoggedIn, (req, res) => {
    const cita = citaSchema(req.body);
    cita
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});
// get all citas
router.get("/citas", mid_auth.isLoggedIn, (req, res) => {
    citaSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// get a cita
router.get("/citas/:id", mid_auth.isLoggedIn, (req, res) => {
    const { id } = req.params; 
    citaSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// update a cita
router.put("/citas/:id", mid_auth.isLoggedIn, (req, res) => {
    const { id } = req.params;
    const { start, user_id, servicio, idEvento } = req.body;
    citaSchema
    .updateOne({ _id: id }, { $set: { start, user_id, servicio, idEvento } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// delete a cita
router.delete("/citas/:id", mid_auth.isLoggedIn, (req, res) => {
    const { id } = req.params;
    citaSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

module.exports = router;
