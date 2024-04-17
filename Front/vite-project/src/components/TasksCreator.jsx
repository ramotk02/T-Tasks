import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const TasksCreator = ({ onClose, fetchTasks }) => {
  const [formData, setFormData] = useState({
    wyhtd: "",
    description: "",
    date: "",
    time: "",
  });

  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3002/api/tasks", formData);
      console.log("Task created:", response.data);
      setFormData({
        wyhtd: "",
        description: "",
        date: "",
        time: "",
      });
      fetchTasks(); 
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleTimeClick = () => {
    setIsTimePickerVisible(true);
  };

  const handleTimeChange = (e) => {
    setFormData({ ...formData, time: e.target.value });
    setIsTimePickerVisible(false);
  };

  return (
    <section className="h-[90vh] w-[50vh] bg-gray-200 m-8 relative rounded-lg">
      <button onClick={onClose} className="text-black py-1 px-1 rounded flex border border-gray-300 hover:bg-gray-300 absolute top-0 right-0 m-2">
        <XMarkIcon className="h-6 w-4 mx-3 font-bold" />
      </button>

      <div className="my-12 px-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="relative">
            <input
              type="text"
              name="wyhtd"
              value={formData.wyhtd}
              onChange={(e) => setFormData({ ...formData, wyhtd: e.target.value })}
              className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-transparent"
            />
            <label
              htmlFor="wyhtd"
              className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
            >
              Task Name
            </label>
          </div>

          <div className="relative">
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-transparent"
            />
            <label
              htmlFor="description"
              className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
            >
              Description
            </label>
          </div>

          <div className="form__group field">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-transparent"
            />
            <label
              htmlFor="date"
              className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
            >
              Date
            </label>
          </div>

          <div className="relative">
            {isTimePickerVisible ? (
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleTimeChange}
                className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none bg-white"
              />
            ) : (
              <input
                type="text"
                name="time"
                value={formData.time || ""}
                onClick={handleTimeClick}
                onChange={handleTimeChange}
                className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-transparent cursor-pointer"
              />
            )}
            <label
              htmlFor="time"
              className={`absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700 ${formData.time && "hidden"}`}
            >
              Time
            </label>
          </div>
          
          <div className="form__group field">
              <input type="input" className="form__field" placeholder="Name" required />
              <label htmlFor="name" className="form__label">Name</label>
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full">
            Submit
          </button>
        </form>
      </div>

      <style>
        {`
         .form__group {
          position: relative;
          padding: 20px 0 0;
          width: 100%;
          max-width: 180px;
        }
        
        .form__field {
          font-family: inherit;
          width: 100%;
          border: none;
          border-bottom: 2px solid #9b9b9b;
          outline: 0;
          font-size: 17px;
          color: #fff;
          padding: 7px 0;
          background: transparent;
          transition: border-color 0.2s;
        }
        
        .form__field::placeholder {
          color: transparent;
        }
        
        .form__field:placeholder-shown ~ .form__label {
          font-size: 17px;
          cursor: text;
          top: 20px;
        }
        
        .form__label {
          position: absolute;
          top: 0;
          display: block;
          transition: 0.2s;
          font-size: 17px;
          color: #9b9b9b;
          pointer-events: none;
        }
        
        .form__field:focus {
          padding-bottom: 6px;
          font-weight: 700;
          border-width: 3px;
          border-image: linear-gradient(to right, #383838, #0b0d2e);
          border-image-slice: 1;
        }
        
        .form__field:focus ~ .form__label {
          position: absolute;
          top: 0;
          display: block;
          transition: 0.2s;
          font-size: 17px;
          font-weight: 700;
        }
        
        /* reset input */
        .form__field:required, .form__field:invalid {
          box-shadow: none;
        }
        `}
      </style>
    </section>
  );
};

export default TasksCreator;
