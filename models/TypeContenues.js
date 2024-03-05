const mongoose = require('mongoose');

const TypeContenueSchema = mongoose.Schema(
    {
        libelle: { type: String, required: true, unique: true },
        description: { type: String, default: null },
        key: { type: String, unique: true },
        statut_id:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "statuts",
            default: 1
        },
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

module.exports = mongoose.model("typecontenus", TypeContenueSchema)
