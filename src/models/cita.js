const mongoose = require("mongoose");

const citaSchema = mongoose.Schema({
    fecha: {
        type: String,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    duracion: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido1: {
        type: String,
        required: true
    },
    apellido2: {
        type: String,
        required: false
    },
    servicios: {
        type: Array,
        items: [{
            type: String
        }],
        required: true
    },
    tel1: {
        type: Number,
        required: true
    },
    tel2: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('Cita', citaSchema);