const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
    },
    passcode: {
        type: Number,
        required: true,
        message: 'Passcode must cintain numbers only',
    },
    firstName: String,
    lastName: String,
    email: String,
    isAnonymous: {
        type: Boolean,
        default: false,
    },
});
userSchema.pre("save", async function(next) {
    try {
        if (this.isModified('passcode')) {
            const hashedPasscode = await bcrypt.hash(this.passcode, 10);
            this.passcode = hashedPasscode;
        }
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;