const mongoose = require("mongoose")

const RoleSchema = new mongoose.Schema(
    {
        libelle: { type: String, required: true, unique: true, trim: true},
        description: { type: String },
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
    { timestamps : true}
);

//Personnaliser le schema
RoleSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

//Exporter le model pour créer aussi la table dans la db
module.exports = mongoose.model("roles", RoleSchema);