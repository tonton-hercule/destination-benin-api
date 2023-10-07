const mongoose = require("mongoose")

const UserSchema = mongoose.Schema(
    {
        username : { type: String, required: true, unique: true, trim: true, maxLength: 100},
        email: { type: String, trim: true, required: true ,  unique: true},
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false}
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

module.exports = mongoose.model("users", UserSchema)