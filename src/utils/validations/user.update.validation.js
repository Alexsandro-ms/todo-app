const yup = require("yup");

let userSchema = yup.object({
  imagePath: yup.string().default(""),
  firstName: yup.string().min(2),
  lastName: yup.string().min(2),
  email: yup.string().email("Enter a correct email address."),
  password: yup.string(),
  tasks: yup.array().of(yup.string()) 
});

module.exports = userSchema;
