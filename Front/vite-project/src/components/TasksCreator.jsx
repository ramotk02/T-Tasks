import React, { useState } from 'react';
import { XMarkIcon } from "@heroicons/react/24/solid";

const TasksCreator = ({ onClose }) => {
    const [formData, setFormData] = useState({
        wyhtd: '',
        description: '',
        date: '',
        time:'',
    });

    const [Tc, setTc] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log(formData);
        setFormData({
            wyhtd: '',
            description: '',
            date: '',
            time:'',
        });
    };

    const handleDelete = () => {
        // Implement delete functionality here
        console.log("Delete button clicked");
    };

    return (
        <section className='h-[90vh] w-[50vh] bg-[#F4F4F4] m-8 relative rounded-lg'>
            <button onClick={onClose} className="text-black py-1 px-1 rounded flex border border-gray-300 hover:bg-gray-200 absolute top-0 right-0 m-2">
                <XMarkIcon className="h-6 w-4 mx-3 font-bold " />
            </button>

            <div className='my-[90px] px-8'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                    <label className='mb-2'>
                        What you have to do:
                        <input type='text' name='wyhtd' value={formData.wyhtd} placeholder="What you have to do ?" onChange={handleChange} className='border p-2 w-full rounded-lg' />
                    </label>
                    <label className='mb-2'>
                        Description:
                        <textarea name='description' value={formData.description} placeholder='Description' onChange={handleChange} className='border p-2 w-full h-20 resize-none rounded-lg'></textarea>
                    </label>
                    <label className='mb-2'>
                        Due Date:
                        <input type="date" name='date' value={formData.at} placeholder='at' onChange={handleChange} className='border p-2 w-full rounded-lg' />
                    </label>
                    <label className='mb-2'>
                        at:
                        <input type="time" name='time' value={formData.at} placeholder='at' onChange={handleChange} className='border p-2 w-full rounded-lg' />
                    </label>
                    <div className="flex justify-between items-center">
                        <button type='submit' className='bg-[#FFD43B] text-white p-2 rounded-lg  w-[40%] '>Submit</button>
                        <button type='button' onClick={handleDelete} className='bg-red-500 text-white p-2 rounded-lg  w-[40%] '>Delete</button>
                    </div>
                </form>
            </div>

            <div></div>
        </section>
    );
};

export default TasksCreator;
