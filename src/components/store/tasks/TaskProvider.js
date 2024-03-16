import React, { useState } from "react";
import { TaskContext } from "./task-context";

const TaskProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleSearchTask = (text) => {
    setSearch(text);
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const taskContext = {
    searchTask: search,
    tasks: tasks,
    addTasks: handleAddTask,
    searchTasks: handleSearchTask,
    removeTask: handleRemoveTask,
  };

  return (
    <TaskContext.Provider value={taskContext}>
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
