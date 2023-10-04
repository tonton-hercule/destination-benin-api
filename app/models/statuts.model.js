module.exports = mongoose => {
    /**Création du schéma par défaut pour une table de la db */
    /*const Statuts = mongoose.model(
        "statut",
        mongoose.Schema(
            {
                libelle: String,
                description: Text
            },
            {timestamps : true}
        )
    );*/

    //Création du schema de la table statuts
    var schema = mongoose.Schema(
        {
            libelle: { type : String, required : true, unique: true},
            description: { type : String, default: null}
        },
        { timestamps: true }
    );

    //Personnalisé le schema en supprimant __v et _id
    //Ajouter l'attribut id qui est l'équivalent de _id
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const StatutsModel = mongoose.model("statuts", schema);

    return StatutsModel;
};