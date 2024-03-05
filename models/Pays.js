const mongoose = require("mongoose")

const PaysSchema = mongoose.Schema(
    {
        nom_pays: { type: String, required: true, unique: true },
        code_iso: { type: String, default: null },
        indicatif: { type: String, size: 50, default: null },
        nationnalite: { type: String, default: null },
        flag: { type: String, default: null },
        coordonnee_maps: { type: String, default: null },
    },
    { timestamp: true }
);


module.exports = mongoose.model("pays", PaysSchema)