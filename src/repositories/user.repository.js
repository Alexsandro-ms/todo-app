const {UserModel} = require("../models/user.model")

const create = async (user) => {
    try {
        const user = await UserModel.create(user);
        return user;
    } catch (error) {
        return error
    }
}

module.exports = {create}