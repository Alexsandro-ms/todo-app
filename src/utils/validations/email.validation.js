const yup = require("yup")

let idSchema = yup.object({
   email: yup.string().email("Invalid e-mail").required("E-mail is required")
})

module.exports = idSchema