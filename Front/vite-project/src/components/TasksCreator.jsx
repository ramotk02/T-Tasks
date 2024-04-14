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
    <section className="h-[90vh] w-[50vh] bg-[#F4F4F4] m-8 relative rounded-lg">
      <button
        onClick={onClose}
        className="text-black py-1 px-1 rounded flex border border-gray-300 hover:bg-gray-200 absolute top-0 right-0 m-2"
      >
        <XMarkIcon className="h-6 w-4 mx-3 font-bold " />
      </button>

      <div className="my-[90px] px-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className={`relative ${formData.wyhtd && "active"}`}>
            <input
              type="text"
              name="wyhtd"
              value={formData.wyhtd}
              onChange={(e) =>
                setFormData({ ...formData, wyhtd: e.target.value })
              }
              className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
            />
            <label
              htmlFor="wyhtd"
              className={`absolute left-0 cursor-text peer-focus:text-xs transition-all peer-focus:-top-4 peer-focus:text-blue-700 ${formData.wyhtd && "active"}`}
            >
              Task Name
            </label>
          </div>

          <div className={`relative ${formData.description && "active"}`}>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
            />
            <label
              htmlFor="description"
              className={`absolute left-0 cursor-text peer-focus:text-xs transition-all peer-focus:-top-4 peer-focus:text-blue-700 ${formData.description && "active"}`}
            >
              Description
            </label>
          </div>

          <div className={`relative ${formData.date && "active"}`}>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
            />
            <label
              htmlFor="date"
              className={`absolute left-0 cursor-text peer-focus:text-xs transition-all peer-focus:-top-4 peer-focus:text-blue-700 ${formData.date && "active"}`}
            >
              Date
            </label>
          </div>

          <div className={`relative ${formData.time && "active"}`}>
            <input
              type="text"
              name="time"
              value={formData.time || "Time"}
              onClick={handleTimeClick}
              readOnly
              className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit cursor-pointer"
            />
            {isTimePickerVisible && (
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleTimeChange}
                className="absolute top-full left-0 border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none bg-white"
              />
            )}
            <label
              htmlFor="time"
              className={`absolute left-0 cursor-text peer-focus:text-xs transition-all peer-focus:-top-4 peer-focus:text-blue-700 ${formData.time && "active"}`}
            >
              Time
            </label>
          </div>
          
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default TasksCreator;
