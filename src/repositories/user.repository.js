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

module.exports = { create, remove }