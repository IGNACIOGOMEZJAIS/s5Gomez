import React, { useEffect } from 'react';
import { useTasks } from './contexts/TaskContext';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import TaskCard from './TaskCard';
import Swal from 'sweetalert2';

const TaskList = () => {
  const {
    tasks,
    loading,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    handleEdit,
    editingTask,
    setEditingTask,
  } = useTasks();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editingTask) {
      setValue('title', editingTask.title);
      setValue('description', editingTask.description);
      setValue('dueDate', editingTask.dueDate?.split('T')[0]);
    }
  }, [editingTask, setValue]);

  


  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Lista de Tareas</h2>

      {editingTask && (
        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              await updateTask(editingTask.id, data);
              toast.success('Tarea actualizada con éxito');
              setEditingTask(null);
              reset();
            } catch (error) {
              toast.error('Error al actualizar la tarea');
              console.error(error);
            }
          })}
          className="bg-white shadow-md rounded p-4 mb-6"
        >
          <h3 className="text-lg font-semibold mb-2">Editar Tarea</h3>

          <div className="mb-2">
            <label className="block text-sm font-medium">Título</label>
            <input
              {...register('title', { required: 'El título es obligatorio' })}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium">Descripción</label>
            <textarea
              {...register('description', { required: 'La descripción es obligatoria' })}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium">Fecha límite</label>
            <input
              type="date"
              {...register('dueDate', { required: 'La fecha límite es obligatoria' })}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
            {errors.dueDate && (
              <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
            )}
          </div>

          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => {
                setEditingTask(null);
                reset();
              }}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No hay tareas registradas</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
