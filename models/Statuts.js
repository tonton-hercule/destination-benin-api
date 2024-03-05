const mongoose = require('mongoose');

const StatutSchema = mongoose.Schema(
    {
        libelle: { type: String, required: true, unique: true },
        description: { type: String, default: null },
        createdBy:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        updatedBy:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: false
        },
    },
    { timestamp: true }
);

module.exports = mongoose.model("statuts", StatutSchema)
