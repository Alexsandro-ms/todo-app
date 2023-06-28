const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    imagePath: String,
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