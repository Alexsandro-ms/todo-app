const { UserModel } = require("../models/user.model")

const create = async (data) => {
    try {
      const user = await UserModel.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        imagePath: data.imagePath,
        tasks: [],
      });
      return user;
    } catch (error) {
      return error;
    }
};

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
        const user = await UserModel.findByIdAndUpdate(id, data)

        return user;
    } catch (error) {
        return error;
    }
}

const list = async (id) => {
    try {
        const user = await UserModel.findById(id)

        return user;
    } catch (error) {
        return error;
    }
}

const find = async (email) => {
    try {
        const user = await UserModel.findOne({email})

        return user
    } catch (error) {
        return error;
    }
}

module.exports = { create, remove, edit, list, find }