import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

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
    try {
      await axios.delete(`${API}/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error al eliminar la tarea", error);
      throw error;
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
        createTask,
        updateTask,
        deleteTask,
        handleEdit,
        toggleTaskStatus,
        editingTask,
        setEditingTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
