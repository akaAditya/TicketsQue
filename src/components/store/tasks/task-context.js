import React from "react";

export const TaskContext = React.createContext({
  searchTask: '',
  tasks: [],
  addTasks: (task) => {},
  searchTasks: (text)=>{},
  removeTask: (id) => {},
});
