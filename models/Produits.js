const mongoose = require("mongoose")

const ProduitSchema = new mongoose.Schema(
    {
        titre: { type: String, required: true, unique: true },
        description: { type: String, trim: true, required: true },
        image: { type: String, trim: true },
        categorieId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "categories",
            required: true
        },
        taille: { type: String },
        couleur: { type: String },
        prix: { type: Number, required: true },
    },
    { timestamp: true }
);

//Personnalisé le schema en supprimant __v et _id
//Ajouter l'attribut id qui est l'équivalent de _id
ProduitSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("produits", ProduitSchema)