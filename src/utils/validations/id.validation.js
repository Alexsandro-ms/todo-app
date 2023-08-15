const yup = require("yup")

let idSchema = yup.object({
   id: yup.string("Id must be a string").required("Id is required").min(1)
})

module.exports = idSchema