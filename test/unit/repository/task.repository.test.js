const TaskRepository = require("../../../src/repositories/task.repository");

jest.mock("../../../src/repositories/task.repository.js");

describe("TaskRepository", () => {
  describe("create", () => {
    test("should create a new task", async () => {
      const data = { title: "New Task", description: "Task description" };
      const createdTask = { _id: "task-id", ...data };
      TaskRepository.create.mockResolvedValue(createdTask);

      const result = await TaskRepository.create(data);

      expect(TaskRepository.create).toHaveBeenCalledWith(data);
      expect(result).toEqual(createdTask);
    });
  });

  describe("remove", () => {
    test("should remove a task by id", async () => {
      const taskId = "task-id";
      TaskRepository.remove.mockResolvedValue();

      await TaskRepository.remove(taskId);

      expect(TaskRepository.remove).toHaveBeenCalledWith(taskId);
    });
  });

  describe("edit", () => {
    test("should edit a task by id", async () => {
      const taskId = "task-id";
      const data = { title: "Updated Task", description: "Updated task description" };
      const updatedTask = { _id: taskId, ...data };
      TaskRepository.edit.mockResolvedValue(updatedTask);

      const result = await TaskRepository.edit(taskId, data);

      expect(TaskRepository.edit).toHaveBeenCalledWith(taskId, data);
      expect(result).toEqual(updatedTask);
    });
  });

  describe("findById", () => {
    test("should find a task by id", async () => {
      const taskId = "task-id";
      const task = { _id: taskId, title: "Task" };
      TaskRepository.findById.mockResolvedValue(task);

      const result = await TaskRepository.findById(taskId);

      expect(TaskRepository.findById).toHaveBeenCalledWith(taskId);
      expect(result).toEqual(task);
    });
  });
});