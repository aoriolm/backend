const express = require("express");
const eventSchema = require("../models/event");
const mid_auth = require('../middlewares/authenticated');
const router = express.Router();

// create familia
router.post("/events", mid_auth.isLoggedIn, (req, res) => {
    const event = eventSchema(req.body);
    event
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});
// get all events
router.get("/events", mid_auth.isLoggedIn, (req, res) => {
    eventSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// get a event
router.get("/events/:id", mid_auth.isLoggedIn, (req, res) => {
    const { id } = req.params;
    eventSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});


// update a event
router.put("/events/:id", mid_auth.isLoggedIn, (req, res) => {
    const { id } = req.params;
    const { start, end, title } = req.body;
    eventSchema
    .updateOne({ _id: id }, { $set: { start, end, title } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// delete a event
router.delete("/events/:id", mid_auth.isLoggedIn, (req, res) => {
    const { id } = req.params;
    eventSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

module.exports = router;
