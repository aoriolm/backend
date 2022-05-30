const express = require("express");
const eventSchema = require("../models/event");

const router = express.Router();

//const { validateCreate } = require("../validators/familia");

// create familia
router.post("/events", (req, res) => {
    const event = eventSchema(req.body);
    event
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});
// get all events
router.get("/events", (req, res) => {
    eventSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// get a event
router.get("/events/:start", (req, res) => {
    const { start } = req.params;
    if (typeof start === 'Date'){ 
    console.log("Id pedido: ", start);
    eventSchema
    .find({start: start})
    //.findById(start)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));}
    else {
        console.log("Start pedido: ", start);
        eventSchema
        .find({start: start})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
    }
});


// update a event
router.put("/events/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    eventSchema
    .updateOne({ _id: id }, { $set: { nombre, descripcion } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// delete a event
router.delete("/events/:id", (req, res) => {
    const { id } = req.params;
    eventSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

module.exports = router;
