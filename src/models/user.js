const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
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
    nacimiento: {
        type: String,
        required: false
    },
    tel1: {
        type: Number,
        required: true
    },
    tel2: {
        type: Number,
        required: false
    },
    genero: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('User', userSchema);