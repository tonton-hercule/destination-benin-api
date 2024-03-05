const mongoose = require("mongoose")

const PasswordResetSchema = mongoose.Schema(
    {
        email: { type: String, required: true },
        token: { type: String, default: null }
    },
    { timestamp: true }
);

module.exports = mongoose.model("password_resets", PasswordResetSchema)