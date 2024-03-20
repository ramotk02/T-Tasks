import React from 'react'
import {PlusCircleIcon} from "@heroicons/react/24/solid";

const Upcoming = () => {
  return (
    //Big Section
    <section className='w-[100%] mx-[40px]'>
        <h2 className='text-7xl m-[50px]'>Upcoming</h2> 
    
        <section id='cards'>
            <div id='Today' className='h-[auto] w-[95%] border-solid border-4 rounded-lg mx-6'>
                <h2 className='text-3xl m-[15px]'>Today</h2>
                <button className="text-black py-2 px-4 rounded w-[90%] flex justify-start border-solid border-2 mx-[30px] hover:bg-gray-200">
                    <PlusCircleIcon className="h-5 w-5 mx-3 font-bold" /> 
                    Add New Task
                </button>
            </div>
        </section>
    </section>
  )
}

export default Upcoming
