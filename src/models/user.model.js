const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    imagePath: {
        type: String,
        default: ""
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
    resetPasswordCode: { 
        type: String,
        default: null 
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: "TaskModel"
    }]
});


const UserModel = mongoose.model("UserModel", userSchema);

module.exports = {UserModel}