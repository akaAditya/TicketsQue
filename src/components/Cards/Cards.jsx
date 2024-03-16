import React from "react";

const Cards = ({
  task,
  taskId,
  date,
  time,
  onHandleEditTask,
  onHandleDeleteTask,
}) => {
  return (
    <li key={taskId} className="mb-2 bg-white rounded-lg shadow-lg p-1" 
    >
      <h2 className="text-lg font-semibold mb-1">{task}</h2>
      <div className="flex justify-between items-center mt-1">
        <span className="text-xs text-gray-500">
          {date}-{time}
        </span>
        <button
          className="text-sm text-green-500 hover:text-green-700"
          onClick={() => onHandleEditTask(taskId, task)}
        >
          Edit
        </button>
        <button
          onClick={() => onHandleDeleteTask(taskId)}
          className="text-sm text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Cards;
