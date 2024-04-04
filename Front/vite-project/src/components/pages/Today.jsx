import React, { useState, useEffect } from "react";
import TasksCase from "../TasksCase";
import TasksCreator from "../TasksCreator";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const Today = () => {
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [taskSectionWidth, setTaskSectionWidth] = useState("w-full");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/tasks");
      setTasks(response.data.tasks); 
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleCreateTask = () => {
    setShowCreateTask(!showCreateTask);
    setTaskSectionWidth(showCreateTask ? "w-full" : "w-3/4");
  };

  const handleClose = () => {
    setShowCreateTask(false);
    setTaskSectionWidth("w-full");
  };

  return (
    <section className="w-full mx-8 flex justify-between">
      <section className={taskSectionWidth}>
        <h2 className="text-7xl my-10">Today</h2> {/* title */}
        <div id="Today" className="h-auto w-full"> {/* Today */}
          <button onClick={toggleCreateTask} className="text-black py-2 px-4 rounded w-full flex justify-start border border-gray-300 hover:bg-gray-200">
            <PlusCircleIcon className="h-5 w-5 mx-3 font-bold" /> 
            Add New Task
          </button>
          <div className="m-4">
            <TasksCase tasks={tasks} />
          </div>
        </div>
      </section>
      {showCreateTask && (
        <TasksCreator onClose={handleClose} fetchTasks={fetchTasks} tasks={tasks} />
      )}
    </section>
  );
};

export default Today;
