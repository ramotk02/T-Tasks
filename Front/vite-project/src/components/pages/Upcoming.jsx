import React from 'react';
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import TasksCase from '../TasksCase'; 

const Upcoming = () => {
  return (
    // Grande section
    <section className='w-full mx-8'>
      <h2 className='text-7xl my-10'>Upcoming</h2> {/* titre */}
      {/* Section "Today" */}
      <div id='Today' className='h-auto w-95 border border-gray-300 rounded-lg mx-6 '> {/* Aujourd'hui */}
        <h2 className='text-3xl my-5 mx-4'>Today</h2>
        <button className="text-black py-2 px-4 rounded w-[90%] flex justify-start border border-gray-300 mx-[45px] hover:bg-gray-200">
          <PlusCircleIcon className="h-5 w-5 mx-3 font-bold" /> 
          Add New Task
        </button>
        <div className='m-4'><TasksCase/> </div>
      </div>

      {/* Section "Tomorrow" et "This Week" */}
      <section className='flex my-20'> {/* Sections "Tomorrow" et "This Week" */}
        <div id='Tomorrow' className='h-auto w-95 border border-gray-300 rounded-lg mx-6 w-[50%]'> {/* Section "Tomorrow" */}
          <h2 className='text-3xl my-5 mx-4'>Tomorrow</h2>
          <button className="text-black py-2 px-4 rounded w-[90%] flex justify-start border border-gray-300 mx-4 hover:bg-gray-200">
            <PlusCircleIcon className="h-5 w-5 mx-3 font-bold" /> 
            Add New Task
          </button>
          <div className='m-4'><TasksCase/></div>
        </div>

        <div id='This Week' className='h-auto w-95 border border-gray-300 rounded-lg mx-6 w-[50%]'> {/* Section "This Week" */}
          <h2 className='text-3xl my-5 mx-4'>This Week</h2>
          <button className="text-black py-2 px-4 rounded  flex justify-start border border-gray-300 mx-4 hover:bg-gray-200 w-[90%]">
            <PlusCircleIcon className="h-5 w-5 mx-3 font-bold" /> 
            Add New Task
          </button>
          <div className='m-4'><TasksCase/></div>
        </div>
      </section>
    </section>
  );
};

export default Upcoming;
