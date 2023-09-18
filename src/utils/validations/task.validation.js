const yup = require("yup")

let taskSchema = yup.object({
    title: yup.string().max(70).required("Title is required"),
    description: yup.string(),
    dueData: yup.date(),
    priority: yup.string().oneOf(["low", "medium", "high"]).default("low"),
    completed: yup.boolean().default(false),
})

module.exports = { taskSchema }