const mongoose = require("mongoose");
const Profils = require("./Profils");

const UserSchema = mongoose.Schema(
    {
        fullname : { type: String, required: true, maxLength: 255},
        nom : { type: String, required: true, maxLength: 255},
        prenoms : { type: String, required: true, maxLength: 255},
        raison_sociale : { type: String, required: false, maxLength: 255},
        telephone : { type: String, required: true, maxLength: 20},
        email: { type: String, trim: true, required: true ,  unique: true},
        password: { type: String, required: true },
        code_email : { type: String},
        email_verified_at : { type: Date},
        first_connexion : { type: Date},
        last_connexion : { type: Date},
        enable: { type: Boolean, default: false},
        roleId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "roles",
            required: false
        },
        paysId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "pays"
        },
        profilId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "profils",
            required: false
        },
    },
    { timestamp: true }
);

//Personnalisé le schema en supprimant __v et _id
//Ajouter l'attribut id qui est l'équivalent de _id
UserSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

// Ajout d'une méthode virtuelle pour récupérer le libellé du profil de l'utilisateur
UserSchema.virtual('libelle_profil').get(async function() {
    const profil = await Profils.findById(this.profilId);
    return profil ? profil.libelle : null;
});


module.exports = mongoose.model("users", UserSchema)