import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useTasks } from "./contexts/TaskContext";
import { useNavigate } from "react-router-dom";

const TaskManager = () => {
  const {
    createTask,
  } = useTasks();


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();



  const onSubmit = async (data) => {
   try {
        await createTask(data);
        reset();
        Swal.fire({
          icon: "success",
          title: "Tarea creada con éxito",
          text: "¿Qué querés hacer ahora?",
          showCancelButton: true,
          confirmButtonText: "Ir a mi lista de tareas",
          cancelButtonText: "Seguir creando tareas",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      }catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al guardar la tarea",
      });
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 py-4 px-6">
          <h1 className="text-2xl font-bold text-white">Gestor de Tareas</h1>
        </div>

        {/* Formulario */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4">
            Nueva Tarea
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                {...register("title", { required: "Este campo es obligatorio" })}
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                {...register("description")}
                rows={3}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha límite
              </label>
              <input
                {...register("dueDate", {
                  required: "Este campo es obligatorio",
                })}
                type="date"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.dueDate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.dueDate.message}
                </p>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                 Crear Tarea
              </button>

              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
