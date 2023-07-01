const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    imagePath: {
        type: String,
        default: undefined
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: "TaskModel"
    }]
});


const UserModel = mongoose.model("UserModel", userSchema);

module.exports = {UserModel}