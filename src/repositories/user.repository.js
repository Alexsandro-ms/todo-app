const { UserModel } = require("../models/user.model")

const create = async (user) => {
    try {
        const user = await UserModel.create(user);
        return user;
    } catch (error) {
        return error;
    }
}

const remove = async (id) => {
    try {
        await UserModel.findByIdAndDelete(id);
        return;
    } catch (error) {
        return error;
    }
}

const edit = async (id, data) => {
    try {
        const user = await UserModel.findByIdAndUpdate(id, data).lean()

        return user;
    } catch (error) {
        return error;
    }
}

const list = async (id) => {
    try {
        const user = await UserModel.findById(id).lean()

        return user;
    } catch (error) {
        return error;
    }
}

module.exports = { create, remove, edit, list }