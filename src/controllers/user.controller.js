const bcrypt = require("bcrypt")
const userSchema = require("../utils/user.validation")
const idSchema = require("../utils/id.validation")
const UserRepository = require("../repositories/user.repository")

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

        await idSchema.validate({ id: Number(id) });

        await UserRepository.remove(id)

        return res.status(200).json({message: "User deleted"})
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = { createUser, removeUser }