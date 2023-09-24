const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
    title: {
     type: String,
     required: true
    },
    description: {
     type: String,
     required: true
    },
    dueData: {
     type: Date,
     required: false 
    },
    priority: {
     type: String,
     enum: ["low", "medium", "high"],
     default: "low" 
    },
    completed: {
       type: Boolean,
       default: false
    }
 });
 

const TaskModel = mongoose.model("TaskModel", taskSchema);

module.exports = TaskModel;