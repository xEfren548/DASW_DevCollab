const taskSchema = mongoose.Schema({
    uid: {
      type: String,
      unique: true,
      required: true,
    },
    projectId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
  });
  
  taskSchema.statics.getTasksByProject = async (projectId) => {
    let tasks = await Task.find({ projectId });
    return tasks;
  };
  
  taskSchema.statics.getTaskByID = async (uid) => {
    let task = await Task.findOne({ uid });
    return task;
  };
  
const Task = mongoose.model("Task", taskSchema);

module.exports = { Proyecto, Task };