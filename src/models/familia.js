const mongoose = require("mongoose");

const familiaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Familia', familiaSchema);