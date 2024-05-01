import React, { useState, useEffect } from "react";
import TasksCase from "../TasksCase";
import TasksCreator from "../TasksCreator";
import { PlusCircleIcon } from "@heroicons/react/solid";
import axios from "axios";

const Today = () => {
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [taskSectionWidth, setTaskSectionWidth] = useState("w-full");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/tasks");
      setTasks(response.data); 
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
  
  const toggleTaskCompletion = async (taskId, completed) => {
    try {
      await axios.put(`http://localhost:3002/api/tasks/${taskId}`, { completed: !completed });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleClose = () => {
    setShowCreateTask(false);
    setTaskSectionWidth("w-full");
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3002/api/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <section className="w-full mx-8 flex justify-between">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');
        `}
      </style>
      <section className={taskSectionWidth}>
        <h2 className="text-7xl my-10">Tasks</h2>
        <div id="Today" className="h-auto w-full">
          <button onClick={toggleCreateTask} className="text-black py-2 px-4 rounded w-full flex justify-start border border-gray-300 hover:bg-gray-200">
            <PlusCircleIcon className="h-5 w-5 mx-3 font-bold" /> 
            Add New Task
          </button>
          <div className="m-4">
            <TasksCase tasks={tasks} deleteTask={deleteTask} toggleTaskCompletion={toggleTaskCompletion} />
          </div>
        </div>
      </section>
      {showCreateTask && (
        <TasksCreator onClose={handleClose} fetchTasks={fetchTasks} />
      )}
    </section>
  );
};

export default Today;
