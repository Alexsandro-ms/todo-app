const bcrypt = require("bcrypt")
const UserRepository = require("../repositories/user.repository.js")

const { userSchema, userUpdateSchema } = require("../utils/validations/user.validation")
const idValidation = require("../utils/validations/id.validation.js")
const emailValidation = require("../utils/validations/email.validation.js")

const createUser = async (req,res) => {
    try {
        const {firstName, lastName, email, password } = req.body

        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({message:'Fill all fields'})
        }

        await userSchema.validate(req.body)

        const verifyingEmail = await UserRepository.find(email)

        if(verifyingEmail){
            return res.status(400).json({ message: "Email already exists" });
        }

        const encryptPassword = await bcrypt.hash(password, 10)

        const userResponse = await UserRepository.create(
           {
                firstName,
                lastName,
                email,
                password: encryptPassword,
            }
        )

        return res.status(200).json(userResponse)

    } catch (error) {
        return res.status(500).json({message: error})
    }
}

const removeUser = async (req,res) => {
    try {
        const { id } = req.params;

        if (isNaN(Number(id))) {
            return res.status(400).json({ message: "Invalid ID" });
          }

        await idValidation.validate({ id: Number(id) });

        await UserRepository.remove(id)

        return res.status(200).json({message: "User deleted"})
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const editUser = async (req,res) => {
    try {
        const { id } = req.params;
        const data = req.body

        if (isNaN(Number(id))) {
            return res.status(400).json({ message: "Invalid ID" });
          }

        await idValidation.validate({ id: Number(id) });


        await UserRepository.edit(Number(id), data)

        return res.status(200).json({message: "User edited"})

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

const listUser = async (req,res) => {
    try {
        const { id } = req.params;

        if (isNaN(Number(id))) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        await idValidation.validate({ id: Number(id) })

        const user = await UserRepository.list(Number(id))        

        return res.status(200).json(user)

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

const findUser = async (req,res) => {
    try {
        const { email } = req.body

        await emailValidation.validate(email)

        const user = await UserRepository.find(email)

        return res.status(200).json(user)

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

module.exports = { createUser, removeUser, editUser, listUser, findUser }