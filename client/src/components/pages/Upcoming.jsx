import React, { useState, useEffect } from 'react';
import { PlusCircleIcon } from "@heroicons/react/solid";
import TasksCase from '../TasksCase'; 
import axios from 'axios';

const Upcoming = () => {
  const [todayTasks, setTodayTasks] = useState([]);
  const [tomorrowTasks, setTomorrowTasks] = useState([]);
  const [thisWeekTasks, setThisWeekTasks] = useState([]);
  const [otherTasks, setOtherTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/tasks");
      const tasks = response.data;
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const endOfWeek = new Date(today);
      endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
      
      const todayFormatted = today.toISOString().slice(0, 10);
      const tomorrowFormatted = tomorrow.toISOString().slice(0, 10);
      const endOfWeekFormatted = endOfWeek.toISOString().slice(0, 10);
      
      const todayTasks = tasks.filter(task => task.date === todayFormatted);
      const tomorrowTasks = tasks.filter(task => task.date === tomorrowFormatted);
      const thisWeekTasks = tasks.filter(task => task.date <= endOfWeekFormatted);
      const otherTasks = tasks.filter(task => task.date > endOfWeekFormatted);
      
      setTodayTasks(todayTasks);
      setTomorrowTasks(tomorrowTasks);
      setThisWeekTasks(thisWeekTasks);
      setOtherTasks(otherTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const toggleTaskCompletion = async (taskId, completed) => {
    try {
      await axios.put(`http://localhost:3002/api/tasks/${taskId}`, { completed: !completed });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3002/api/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const addNewTask = async (date) => {
    try {
      // Vous devez remplacer "newTaskDetails" par les détails de la nouvelle tâche
      const newTaskDetails = {
        // détails de la nouvelle tâche
      };
      await axios.post("http://localhost:3002/api/tasks", newTaskDetails);
      fetchTasks();
    } catch (error) {
      console.error("Error adding new task:", error);
    }
  };

  return (
    <section className='w-full mx-8'>
      <h2 className='text-7xl my-10'>Upcoming</h2>
      <div id='Today' className='h-auto w-95 border border-gray-300 rounded-lg mx-6 '>
        <h2 className='text-3xl my-5 mx-4'>Today</h2>
        <button className="text-black py-2 px-4 rounded w-[90%] flex justify-start border border-gray-300 mx-[45px] hover:bg-gray-200"
          onClick={() => addNewTask(new Date().toISOString().slice(0, 10))}>
          <PlusCircleIcon className="h-5 w-5 mx-3 font-bold" /> 
          Add New Task
        </button>
        <div className='m-4'><TasksCase tasks={todayTasks} toggleTaskCompletion={toggleTaskCompletion} deleteTask={deleteTask}/> </div>
      </div>

      <section className='flex my-20'>
        <div id='Tomorrow' className='h-auto w-95 border border-gray-300 rounded-lg mx-6 w-[50%]'>
          <h2 className='text-3xl my-5 mx-4'>Tomorrow</h2>
          <button className="text-black py-2 px-4 rounded w-[90%] flex justify-start border border-gray-300 mx-4 hover:bg-gray-200"
            onClick={() => addNewTask(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10))}>
            <PlusCircleIcon className="h-5 w-5 mx-3 font-bold" /> 
            Add New Task
          </button>
          <div className='m-4'><TasksCase tasks={tomorrowTasks} toggleTaskCompletion={toggleTaskCompletion} deleteTask={deleteTask}/></div>
        </div>

        <div id='This Week' className='h-auto w-95 border border-gray-300 rounded-lg mx-6 w-[50%]'>
          <h2 className='text-3xl my-5 mx-4'>This Week</h2>
          <button className="text-black py-2 px-4 rounded  flex justify-start border border-gray-300 mx-4 hover:bg-gray-200 w-[90%]"
            onClick={() => addNewTask(new Date().toISOString().slice(0, 10))}>
            <PlusCircleIcon className="h-5 w-5 mx-3 font-bold" /> 
            Add New Task
          </button>
          <div className='m-4'><TasksCase tasks={thisWeekTasks} toggleTaskCompletion={toggleTaskCompletion} deleteTask={deleteTask}/></div>
        </div>
      </section>
    </section>
  );
};

export default Upcoming;
