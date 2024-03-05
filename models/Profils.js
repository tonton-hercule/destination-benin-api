const mongoose = require("mongoose")

const ProfilSchema = mongoose.Schema(
    {
        libelle: { type: String, required: true, unique: true },
        description: { type: String, default: null },
        statutId:
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


module.exports = mongoose.model("profils", ProfilSchema)