const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserRepository = require("../repositories/user.repository.js")

const { userSchema, userUpdateSchema, logInUserSchema } = require("../utils/validations/user.validation")
const idValidation = require("../utils/validations/id.validation.js")
const emailValidation = require("../utils/validations/email.validation.js")
const { bodyMessage, sendToken} = require("../utils/sendEmail/text.email.js")

const sendEmail = require("../utils/sendEmail/send-email.js")
const { UserModel } = require("../models/user.model.js")

const dotenv = require("dotenv").config()

const logInUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      try {
        await logInUserSchema.validate({ email, password });
      } catch (validationError) {
        return res.status(400).json({ message: "Fill all fields" });
      }

      const user = await UserRepository.find(email);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const passwordValidation = await bcrypt.compare(password, user.password);
  
      if (!passwordValidation) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      const token = await jwt.sign(
        {
          user_id: user._id,
          user_image: user.imagePath,
          user_name: `${user.firstName} ${user.lastName}`,
          user_email: `${user.email}`
        },
        process.env.JWT_KEY,
        {
            expiresIn: "48h",
        }
      );
  
      return res
        .status(200)
        .json({ message: "User successfully logged in", token });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error });
    }
};

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

        await sendEmail(email, "New account", bodyMessage(`${firstName} ${lastName}`))

        return res.status(200).json(userResponse)

    } catch (error) {
        return res.status(500).json({message: error})
    }
}

const sendPasswordRecoveryEmail = async (req,res) => {
    try {
    const { email } = req.body

    const user = await UserRepository.find(email)

    if (!user) {
        return res.status(404).json({message: "E-mail not registered"})
    }

    const payload = {
      userId: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '15m' });

    user.resetPasswordToken = token;

    await user.save();

    await sendEmail(email, "Change Password", sendToken(`${user.firstName} ${user.lastName}`, token))

    return res.status(200).json({message: "Token generated"});
  } catch (error) {
    console.log(error)
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

module.exports = { createUser, removeUser, editUser, listUser, findUser, logInUser, sendPasswordRecoveryEmail }