import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const TasksCreator = ({ onClose, fetchTasks, tasks }) => {
  const [formData, setFormData] = useState({
    wyhtd: "",
    description: "",
    date: "",
    time: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3002/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Task created:", data);
        setFormData({
          wyhtd: "",
          description: "",
          date: "",
          time: "",
        });
        fetchTasks(); 
      })
      .catch((error) => console.error("Error creating task:", error));
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
          <input
            type="text"
            name="wyhtd"
            value={formData.wyhtd}
            onChange={(e) =>
              setFormData({ ...formData, wyhtd: e.target.value })
            }
            placeholder="Enter task name"
            className="rounded h-9"
          />
          {/* Afficher le contenu de wyhtd ici */}
          {tasks && tasks.map((task, index) => (
            <p key={index}>Vous allez ajouter : {task.wyhtd}</p>
          ))}
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Enter description"
            className="rounded"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
            className="rounded h-9"
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={(e) =>
              setFormData({ ...formData, time: e.target.value })
            }
            className="rounded h-9"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default TasksCreator;
