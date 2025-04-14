import React from "react";

const TaskCard = ({ task, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div
      className={`p-4 border rounded-md ${
        task.completed ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3
            className={`font-semibold ${
              task.completed ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="text-gray-600 mt-1">{task.description}</p>
          )}
          {task.dueDate && (
            <p className="text-sm mt-2">
              <span className="font-medium">Fecha límite:</span>{" "}
              {new Date(task.dueDate).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onToggleStatus(task.id, task.completed)}
            className={`p-2 rounded-md ${
              task.completed
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }`}
            title={task.completed ? "Marcar como pendiente" : "Marcar como completada"}
          >
            {task.completed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6 6 0 0111.339 0 1 1 0 01-1.885.666 4 4 0 00-7.568 0 1 1 0 01-1.886-.666zM7 10a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>

          <button
            onClick={() => onEdit(task)}
            className="p-2 bg-blue-100 text-blue-700 rounded-md"
            title="Editar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="p-2 bg-red-100 text-red-700 rounded-md"
            title="Eliminar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
