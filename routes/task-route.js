const router = require("express").Router();
const { nanoid } = require("nanoid");
const { Task } = require("../db/Proyecto.js");

router.get("/:projectId", async (req, res) => {
  const { projectId } = req.params;
  const tasks = await Task.getTasksByProject(projectId);
  res.send(tasks);
});

router.post("/:projectId", async (req, res) => {
  const { projectId } = req.params;
  const { title, description, deadline } = req.body;
  const newTask = await Task.createTask({
    uid: nanoid(),
    projectId,
    title,
    description,
    deadline,
  });
  res.status(201).send(newTask);
});

router.put("/:uid", async (req, res) => {
  const { uid } = req.params;
  const { title, description, deadline, status } = req.body;
  const updatedTask = await Task.updateTask(uid, {
    title,
    description,
    deadline,
    status,
  });
  if (!updatedTask) {
    res.status(404).send({ error: "Task not found" });
    return;
  }
  res.send(updatedTask);
});

router.delete("/:uid", async (req, res) => {
  const { uid } = req.params;
  const deletedTask = await Task.deleteTask(uid);
  if (!deletedTask) {
    res.status(404).send({ error: "Task not found" });
    return;
  }
  res.send(deletedTask);
});

module.exports = router;
