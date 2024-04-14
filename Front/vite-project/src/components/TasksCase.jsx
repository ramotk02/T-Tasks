import React from "react";

const TasksCase = ({ tasks }) => {
  return (
    <div>
      {tasks && tasks.map((task, index) => (
        <div key={index}>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 accent-slate-50"
            />
            <span className="text-black">{task.wyhtd}</span>
          </label>
          {/* <div className="ml-6 text-sm mt-1">{task.description}</div> */}
          <hr className="my-2" />
        </div>
      ))}
    </div>
  );
};

export default TasksCase;
