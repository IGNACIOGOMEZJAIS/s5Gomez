import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

const API = "https://67fd10923da09811b1748ba5.mockapi.io/api/reminder/reminder";

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(API);
      setTasks(data);
    } catch (error) {
      console.error("Error al cargar las tareas", error);
    } finally {
      setLoading(false);
    }
  };
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await toggleTaskStatus(id, currentStatus);
      toast.success(
        `Tarea marcada como ${currentStatus ? 'pendiente' : 'completada'}`
      );
    } catch (error) {
      toast.error('Error al cambiar el estado');
      console.error(error);
    }
  };
  const createTask = async (taskData) => {
    try {
      const { data } = await axios.post(API, taskData);
      setTasks((prev) => [...prev, data]);
      return data;
    } catch (error) {
      console.error("Error al crear la tarea", error);
      throw error;
    }
  };

  const updateTask = async (id, updatedData) => {
    try {
      const { data } = await axios.put(`${API}/${id}`, updatedData);
      setTasks((prev) => prev.map((task) => (task.id === id ? data : task)));
      return data;
    } catch (error) {
      console.error("Error al actualizar la tarea", error);
      throw error;
    }
  };

  const deleteTask = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
  
    if (result.isConfirmed) {
      try {
        await axios.delete(`${API}/${id}`); // <- Aquí está el cambio clave
        setTasks((prev) => prev.filter((task) => task.id !== id)); // actualizamos el estado
        toast.success('Tarea eliminada con éxito');
      } catch (error) {
        toast.error('Error al eliminar la tarea');
        console.error(error);
      }
    }
  };

  const toggleTaskStatus = async (id, currentStatus) => {
    try {
      const { data } = await axios.put(`${API}/${id}`, {
        completed: !currentStatus,
      });
      setTasks((prev) => prev.map((task) => (task.id === id ? data : task)));
      return data;
    } catch (error) {
      console.error("Error al cambiar el estado", error);
      throw error;
    }
  };

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

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        fetchTasks,
        onSubmit,
        createTask,
        updateTask,
        deleteTask,
        handleEdit,
        toggleTaskStatus,
        editingTask,
        setEditingTask,
        handleToggleStatus
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
