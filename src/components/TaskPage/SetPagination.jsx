import React, { useState } from "react";
import Cards from "../Cards/Cards";

const SetPagination = ({
  totalTasks,
  onHandleEditTask,
  onHandleDeleteTask,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;
  const totalTasksArray = (totalTasks);
  const totalPages = Math.ceil(totalTasksArray.length / tasksPerPage);
  const lastIndex = currentPage * tasksPerPage;
  const firstIndex = lastIndex - tasksPerPage;
  const currentPageTasks = totalTasksArray.slice(firstIndex, lastIndex);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      {Object.entries(currentPageTasks).map(([taskId, task]) => (
        <Cards
          key={taskId}
          task={task.task}
          taskId={taskId}
          date={task.date}
          time={task.time}
          onHandleEditTask={onHandleEditTask}
          onHandleDeleteTask={onHandleDeleteTask}
        />
      ))}
      <div className="flex justify-evenly ">
        <button onClick={prevPage} disabled={currentPage === 1} className="p-1 bg-slate-300 rounded-lg hover:bg-slate-600 hover:text-white">
          Prev
        </button>
        <button onClick={nextPage} disabled={currentPage === totalPages} className="p-1 bg-slate-300 rounded-lg hover:bg-slate-600 hover:text-white">
          Next
        </button>
      </div>
    </div>
  );
};

export default SetPagination;
