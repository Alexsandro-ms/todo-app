const { UserModel } = require("../models/user.model");
const TaskRepository = require("../repositories/task.repository");
const emailValidation = require("../utils/validations/email.validation.js")
const idValidation = require("../utils/validations/id.validation")
const { taskSchema } = require("../utils/validations/task.validation")

const createTask = async (req, res) => {
    try {
      const { title, description, dueData, priority, completed } = req.body;
      const { user_id } = req.user;
  
      const clientDueDate = new Date(dueData);
      clientDueDate.setHours(clientDueDate.getHours());
  
      const task = await TaskRepository.create({
        title,
        description,
        dueData: clientDueDate,
        priority,
        completed,
      });
  
      await UserModel.findByIdAndUpdate(user_id, { $push: { tasks: task._id } });
  
      return res.status(200).json(task);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};

const removeTask = async (req, res) => {
  try {
    const { id } = req.params;

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

    const task = await TaskRepository.edit(id, data);
    return res.status(200).json({ message: "Task edited", task });
  } catch (error) {
    console.log(error)
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

        const startOfDay = new Date('2023-08-23T00:00:00.000+00:00');
        const endOfDay = new Date('2023-08-23T23:59:59.999+00:00');

        const completedTasks = await TaskRepository.findTodayTasks(user_id, startOfDay, endOfDay);

        const tasks = completedTasks.map(task => ({
            ...task.toObject(),
            completionDate: new Date(task.dueData).toISOString(),
        }));
  
        return res.status(200).json(tasks);   
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { createTask, removeTask, editTask, listTasks, findTask, listTaskToday };
