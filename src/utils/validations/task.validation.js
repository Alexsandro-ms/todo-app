const yup = require("yup")

let taskSchema = yup.object({
    title: yup.string().max(70).required("Title is required"),
    description: yup.string(),
    dueDate: yup.date().min(new Date(), "Due date must be in the future").max(new Date().setFullYear(new Date().getFullYear() + 1), "Due date can be up to one year from now"),
    priority: yup.string().oneOf(["low", "medium", "high"]).default("low"),
    completed: yup.boolean().default(false),
    userId: yup.string().required()
})

module.exports = { taskSchema }