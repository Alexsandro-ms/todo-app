const TaskRepository = require("../repositories/task.repository");
const emailValidation = require("../utils/validations/email.validation.js")
const { taskSchema } = require("../utils/validations/task.validation")

const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority, completed, userId } = req.body;

        const taskValidate = await taskSchema.validate(req.body);

        const task = await TaskRepository.create(taskValidate);

        return res.status(200).json(task);
        } catch (error) {
        return res.status(500).json({ message: error.message });
        }
};

const removeTask = async (req, res) => {
  try {
    const { id } = req.params;

    await emailValidation.validate(Number(id));

    await TaskRepository.remove(id);

    return res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await emailValidation.validate(Number(id));

    await TaskRepository.edit(id, data);

    return res.status(200).json({ message: "Task edited" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const listTasks = async (req, res) => {
  try {
    const { userId } = req.params;

    await emailValidation.validate(Number(userId));

    const tasks = await TaskRepository.listByUser(userId);

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const findTask = async (req, res) => {
  try {
    const { id } = req.params;

    await emailValidation.validate(Number(id));

    const task = await TaskRepository.find(id);

    return res.status(200).json(task);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { createTask, removeTask, editTask, listTasks, findTask };
