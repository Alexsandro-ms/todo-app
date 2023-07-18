const TaskModel = require("../models/task.model");
const { UserModel } = require("../models/user.model");

const create = async (data) => {
    try {
        const task = await TaskModel.create(data);
        return task;
    } catch (error) {
        return error;
    }
};

const remove = async (id) => {
    try {
        await TaskModel.findByIdAndDelete(id);
        return;
    } catch (error) {
        return error;
    }
};

const edit = async (id, data) => {
    try {
        const task = await TaskModel.findByIdAndUpdate(id, data, { new: true });
        return task;
    } catch (error) {
        return error;
    }
};

const listByUser = async (userId) => {
    try {
        const user = await UserModel.findById(userId).populate("tasks");
        if (!user) {
        throw new Error("User not exist");
        }
        return user.tasks;
    } catch (error) {
        return error;
    }
};

const findById = async (id) => {
try {
    const task = await TaskModel.findById(id);
    return task;
} catch (error) {
    return error;
}
};  

module.exports = { create, remove, edit, findById, listByUser };