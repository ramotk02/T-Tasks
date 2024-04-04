import React from "react";

const TasksCase = ({ tasks }) => {
  return (
    <div>
      {tasks &&
        tasks.map((task, index) => (
          <div key={index}>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 accent-slate-50"
              />
              <span className="text-black">{task.wyhtd}</span>{" "}
              {/* Titre de la tâche */}
            </label>
            <div style={{ marginBottom: "8px" }}>
              {/* Ajoutez le titre de la tâche ici */}
              <div className="ml-6 text-sm">{task.title}</div>
            </div>
            <hr />
          </div>
        ))}
    </div>
  );
};

export default TasksCase;
