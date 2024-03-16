import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TaskContext } from "../store/tasks/task-context";
import AuthContext from "../store/UserAuthentication/auth-context";
import SetPagination from "./SetPagination";

const ShowTasks = ({onSearchFilterTasks}) => {
  const [getTasks, setGetTasks] = useState([]);
  const [editTask, setEditTask] = useState({});
  const [taskId, setTaskId] = useState(null);
  const { removeTask } = useContext(TaskContext);
  const userAuth = useContext(AuthContext);

  let email = userAuth.email;
  email = email.replace("@", "").replace(".", "");

  useEffect(() => {
    const getTaskDataFromAPI = async () => {
      try {
        const response = await fetch(
          `https://taskmanager-2024-default-rtdb.firebaseio.com/tasks${email}.json`
        );
        const data = await response.json();
        if (response.ok && data !== null) {
          return setGetTasks(data);
        } else {
          return setGetTasks([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTaskDataFromAPI();
  }, [setGetTasks]);

  // UPDATE functionality

  const taskUpdateHandler = async () => {
    const taskData = {
      task: editTask.task,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };
    const response = await fetch(
      `https://taskmanager-2024-default-rtdb.firebaseio.com/tasks${email}/${taskId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(taskData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    toast("Task Updated Successfully");
    setGetTasks((prevTasks) => ({
      ...prevTasks,
      [taskId]: taskData,
    }));
    setEditTask({ task: "", date: "", time: "" });
    setTaskId(null);
  };

  const handleEditTask = (taskId, task) => {
    setTaskId(taskId);
    setEditTask(task);
  };

  // DELETE Functionality
  const taskDeleteHandler = async (id) => {
    const response = await fetch(
      `https://taskmanager-2024-default-rtdb.firebaseio.com/tasks${email}/${id}.json`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      console.log("successfully deleted");
      removeTask(id);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-full">
        <div className="bg-gray-400 rounded-lg shadow-lg p-2 w-[600px]">
          <ul>
            <SetPagination
              totalTasks={onSearchFilterTasks}
              taskId={taskId}
              onHandleEditTask={handleEditTask}
              onHandleDeleteTask={taskDeleteHandler}
            />
          </ul>
        </div>
      </div>

      {taskId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <span
              className="absolute top-0 right-0 cursor-pointer"
              onClick={() => setTaskId(null)}
            ></span>
            <label className="p-1">Task:</label>
            <input
              type="text"
              name="task"
              placeholder="update task"
              value={editTask.task}
              onChange={(e) =>
                setEditTask((prev) => ({
                  ...prev,
                  task: e.target.value,
                }))
              }
              className="border rounded px-2 py-1 mb-2"
            />
            <label className="p-1">Date:</label>

            <input
              type="text"
              name="date"
              value={editTask.date}
              placeholder="press space bar"
              onChange={(e) =>
                setEditTask((prev) => ({
                  ...prev,
                  date: new Date().toLocaleDateString(),
                }))
              }
              className="border rounded px-2 py-1 mb-2"
            />
            <label className="p-1">Time:</label>

            <input
              type="text"
              name="time"
              placeholder="press space bar"
              value={editTask.time}
              onChange={(e) =>
                setEditTask((prev) => ({
                  ...prev,
                  time: new Date().toLocaleTimeString(),
                }))
              }
              className="border rounded px-2 py-1 mb-2"
            />
            <button
              onClick={taskUpdateHandler}
              className="bg-gray-500 text-white m-1 px-4 py-2 rounded hover:bg-gray-700"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowTasks;
