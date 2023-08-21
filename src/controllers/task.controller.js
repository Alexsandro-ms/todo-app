const { UserModel } = require("../models/user.model");
const TaskRepository = require("../repositories/task.repository");
const emailValidation = require("../utils/validations/email.validation.js")
const idValidation = require("../utils/validations/id.validation")
const { taskSchema } = require("../utils/validations/task.validation")

const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority, completed } = req.body;
        const { user_id } = req.user;

        const taskValidate = await taskSchema.validate(req.body);

        const task = await TaskRepository.create(taskValidate);

        await UserModel.findByIdAndUpdate(user_id, { $push: { tasks: task._id } });

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

    await idValidation.validate(Number(id));

    await TaskRepository.edit(id, data);

    return res.status(200).json({ message: "Task edited" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const listTasks = async (req, res) => {
    try {
        const { user_id } = req.user;

        const page = req.query.page ? parseInt(req.query.page) : 1;
        const perPage = req.query.perPage ? parseInt(req.query.perPage) : 6;

        const userTasks = await TaskRepository.listByUser(user_id, page, perPage);

        return res.status(200).json(userTasks);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
};


const findTask = async (req, res) => {
  try {
    const { id } = req.params;

    await idValidation.validate(id);

    const task = await TaskRepository.find(id);

    return res.status(200).json(task);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const listTaskToday = async (req, res) => {
    try {
        const { user_id } = req.user;
  
      if (!user_id) {
        return res.status(400).json({ message: "User Id is required" });
      }
  
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      const tasks = await TaskRepository.findTodayTasks(user_id, today);
  
      return res.status(200).json(tasks);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  };

module.exports = { createTask, removeTask, editTask, listTasks, findTask, listTaskToday };
