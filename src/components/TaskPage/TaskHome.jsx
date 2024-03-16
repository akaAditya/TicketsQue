import React from "react";
import AddTaskPage from "./AddTaskPage";
import ShowTasks from "./ShowTasks";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskHome = ({onSearchFilterTasks}) => {
  return (
    <div className="container flex flex-col items-center justify-center">
      <div className="mb-2 ">
        <AddTaskPage />
        <ToastContainer />
      </div>
      <div className="bg-gray-100 p-4 rounded-lg flex-auto">
        <h1 className="text-xl font-bold mb-2 text-center">My Task List</h1>
        <ShowTasks onSearchFilterTasks={onSearchFilterTasks}/>
        <ToastContainer />
      </div>
    </div>
  );
};

export default TaskHome;
