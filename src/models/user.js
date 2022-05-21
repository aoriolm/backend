const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
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
    },
    nacimiento: {
        type: String,
    },
    tel1: {
        type: Number,
        required: true
    },
    tel2: {
        type: Number,
    },
    genero: {
        type: String,
        required: false
    },
    rol: {
        type: String,
        default: 'basic',
        enum: ["basic", "admin"]
       },
    accessToken: {
        type: String
       }
});

module.exports = mongoose.model('User', userSchema);