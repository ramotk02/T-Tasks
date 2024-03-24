import React from 'react';
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from 'react';




const TasksCreator = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
    });

    const [Tc, setTc] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

  return (
    <section className='h-[90vh] w-[50vh] bg-[#F4F4F4] m-8 relative'>
      <button onClick={onClose} className="text-black py-1 px-1 rounded flex border border-gray-300 hover:bg-gray-200 absolute top-0 right-0 m-2">
        <XMarkIcon className="h-6 w-4 mx-3 font-bold " /> 
      </button>

      <div>
      
      </div>

      <div></div>
    </section>
  );
};

export default TasksCreator;
