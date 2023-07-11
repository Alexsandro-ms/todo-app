const yup = require("yup")

let userSchema = yup.object({
    firstName: yup.string().min(2).required("First name is required."),
    lastName: yup.string().min(2).required("Last name is required."),
    email: yup.string().email("Enter a correct email address.").required(),
    password: yup.string().min(8, "Password must have at least 8 characters").max(32).required()
})

module.exports = userSchema