import React from "react";

// Case 
const TasksCase = ({ Task1, Task2, Task3, Task4 }) => {
    return (
      <div>
          <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox h-4 w-4 accent-slate-50	" />
              <span>Faire une tâche</span>
          </label>
          <hr /> {/* Trait entre les tâches */}
          <div style={{ marginBottom: "8px" }}></div> {/* Espace entre les tâches */}
          <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox h-4 w-4 accent-slate-50	" />
              <span>Faire une autre tâche</span>
          </label>
          <hr /> {/* Trait entre les tâches */}
          <div style={{ marginBottom: "8px" }}></div> {/* Espace entre les tâches */}
          <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox h-4 w-4 accent-slate-50	" />
              <span>Une autre tâche à faire</span>
          </label>
      </div>
    );
  };
  

export default TasksCase;
