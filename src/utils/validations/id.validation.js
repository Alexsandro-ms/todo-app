const yup = require("yup")

let idSchema = yup.object({
   id: yup.number("Id must be a number").required("Id is required").min(1)
})

module.exports = idSchema