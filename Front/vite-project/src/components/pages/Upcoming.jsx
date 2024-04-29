import React, { useState, useEffect } from 'react';
import { PlusCircleIcon } from "@heroicons/react/solid";
import TasksCase from '../TasksCase'; 
import axios from 'axios';

const Upcoming = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/tasks')
      .then(response => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log("Tasks:", tasks); // Log tasks to see if data is fetched

  // Récupérer les dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const weekEnd = new Date(today);
  weekEnd.setDate(today.getDate() + 6 - today.getDay());

  // Filtrer les tâches en fonction de leur date
  const todayTasks = tasks.filter(task => {
    const taskDate = new Date(task.date);
    return taskDate.toDateString() === today.toDateString();
  });

  const tomorrowTasks = tasks.filter(task => {
    const taskDate = new Date(task.date);
    return taskDate.toDateString() === tomorrow.toDateString();
  });

  const thisWeekTasks = tasks.filter(task => {
    const taskDate = new Date(task.date);
    return taskDate >= tomorrow && taskDate <= weekEnd;
  });

  // Filtrer les autres tâches qui ne sont ni aujourd'hui, ni demain, ni cette semaine
  const otherTasks = tasks.filter(task => {
    const taskDate = new Date(task.date);
    return !(taskDate.toDateString() === today.toDateString() || 
             taskDate.toDateString() === tomorrow.toDateString() ||
             (taskDate >= tomorrow && taskDate <= weekEnd));
  });

  const addTask = () => {
    const newTask = {
      whatTodo: "", // Fill with appropriate values
      description: "",
      date: "",
      time: "",
      completed: false
    };

    axios.post('/api/tasks', newTask)
      .then(response => {
        setTasks([...tasks, response.data]);
      })
      .catch(error => {
        console.error('Error adding task:', error);
      });
  };

  const deleteTask = (taskId) => {
    axios.delete(`/api/tasks/${taskId}`)
      .then(response => {
        setTasks(tasks.filter(task => task._id !== taskId));
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  const updateTask = (taskId, updatedTask) => {
    axios.put(`/api/tasks/${taskId}`, updatedTask)
      .then(response => {
        setTasks(tasks.map(task => task._id === taskId ? response.data : task));
      })
      .catch(error => {
        console.error('Error updating task:', error);
      });
  };

  return (
    <section className='w-full mx-8'>
      <h2 className='text-7xl my-10'>Upcoming</h2>
      <div id='Today' className='h-auto w-95 border border-gray-300 rounded-lg mx-6 '>
        <h2 className='text-3xl my-5 mx-4'>Today</h2>
        <button onClick={addTask} className="text-black py-2 px-4 rounded w-[90%] flex justify-start border border-gray-300 mx-[45px] hover:bg-gray-200">
          <PlusCircleIcon className="h-5 w-5 mx-3 font-bold" /> 
          Add New Task
        </button>
        <div className='m-4'><TasksCase tasks={todayTasks} /></div>
      </div>

      <section className='flex my-20'>
        <div id='Tomorrow' className='h-auto w-95 border border-gray-300 rounded-lg mx-6 w-[50%]'>
          <h2 className='text-3xl my-5 mx-4'>Tomorrow</h2>
          <button onClick={addTask} className="text-black py-2 px-4 rounded w-[90%] flex justify-start border border-gray-300 mx-4 hover:bg-gray-200">
            <PlusCircleIcon className="h-5 w-5 mx-3 font-bold" /> 
            Add New Task
          </button>
          <div className='m-4'><TasksCase tasks={tomorrowTasks} /></div>
        </div>

        <div id='This Week' className='h-auto w-95 border border-gray-300 rounded-lg mx-6 w-[50%]'>
          <h2 className='text-3xl my-5 mx-4'>This Week</h2>
          <button onClick={addTask} className="text-black py-2 px-4 rounded flex justify-start border border-gray-300 mx-4 hover:bg-gray-200 w-[90%]">
            <PlusCircleIcon className="h-5 w-5 mx-3 font-bold" /> 
            Add New Task
          </button>
          <div className='m-4'><TasksCase tasks={thisWeekTasks} /></div>
        </div>
      </section>

      <div id='Other' className='h-auto w-95 border border-gray-300 rounded-lg mx-6'>
        <h2 className='text-3xl my-5 mx-4'>Other</h2>
        <div className='m-4'><TasksCase tasks={otherTasks} /></div>
      </div>
    </section>
  );
};

export default Upcoming;
