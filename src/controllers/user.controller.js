const bcrypt = require("bcrypt")
const UserRepository = require("../repositories/user.repository")

const createUser = async (req,res) => {
    try {
        const {firstName, lastName, email, password } = req.body

        if(!firstName || !lastName || !email || !password){
            throw new Error('Fill all fields')
        }

        const encryptPassword = await bcrypt.hash(password, 10)

        const userResponse = await UserRepository.create(
           {
                firstName,
                lastName,
                email,
                password: encryptPassword,
                imagePath: "",
            }
        )

        console.log(userResponse)

        return res.status(200).json(userResponse)

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

module.exports = { createUser }