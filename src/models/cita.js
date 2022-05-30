const mongoose = require("mongoose");

const citaSchema = mongoose.Schema({
    start: {
        type: Date,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    servicio: {
        type: String,
        required: true
    },
    idEvento: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Cita', citaSchema);