import React from "react";

const TasksCase = ({ tasks, deleteTask, toggleTaskCompletion }) => {
  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
  };

  const handleToggleCompletion = async (taskId, completed) => {
    try {
      await toggleTaskCompletion(taskId, completed); // Utilisation correcte de toggleTaskCompletion
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  return (
    <div>
      {tasks && tasks.map((task, index) => (
        <div key={index} className="relative">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 accent-slate-50"
              checked={task.completed}
              onChange={() => handleToggleCompletion(task._id, task.completed)}
            />
            <span className={task.completed ? "line-through text-gray-500" : "text-black"}>{task.wyhtd}</span>
            <button onClick={() => handleDelete(task._id)} className="text-red-600 hover:text-red-800 absolute right-0 top-0">
              X
            </button>
          </label>
          <hr className="my-2" />
        </div>
      ))}
    </div>
  );
};

export default TasksCase;
