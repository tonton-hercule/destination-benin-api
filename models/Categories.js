const mongoose = require("mongoose")

const CategorieSchema = mongoose.Schema(
    {
        libelle: { type: String, required: true, unique: true },
        description: { type: String, default: null }
    },
    { timestamp: true }
);

//Personnalisé le schema en supprimant __v et _id
//Ajouter l'attribut id qui est l'équivalent de _id
CategorieSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("categories", CategorieSchema)