import React, { useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TaskContext } from "../store/tasks/task-context";
import AuthContext from "../store/UserAuthentication/auth-context";

const AddTaskPage = () => {
  const [task, setTask] = useState("");
  const taskContext = useContext(TaskContext);
  const userAuth = useContext(AuthContext);
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  
  let email = userAuth.email;
  email = email.replace('@',"").replace(".","");

  const notification =()=> toast('Task Added Successfully')
  
  const taskinput = (e) => setTask(e.target.value);

  const taskSubmitHandler = async (e) => {
    e.preventDefault();
    const taskData = {
      task: task,
      date: date,
      time: time,
    };
    taskContext.addTasks(taskData);

    try {
      await fetch(`https://taskmanager-2024-default-rtdb.firebaseio.com/tasks${email}.json`,{
        method: "POST",
        body: JSON.stringify(taskData),
        headers:{
          'Content-Type':'application/json'
        }
      })
      const response = await fetch(`https://taskmanager-2024-default-rtdb.firebaseio.com/tasks${email}.json`);
        const data = await response.json();
        taskContext.addTasks(data)

    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="flex justify-center mt-4">
      <form onSubmit={taskSubmitHandler} className="flex items-center">
        <label className="mr-2">Add Task:</label>
        <input
          type="text"
          value={task}
          onChange={taskinput}
          className="border border-gray-400 rounded-md px-2 py-1 mr-2"
        />
        <button
          type="submit"
          onClick={notification}
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTaskPage;
