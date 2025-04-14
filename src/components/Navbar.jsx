import React from "react";
import { ClipboardPlus, ListTodo, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-6 h-6 text-green-400" />
          <span className="text-xl font-semibold tracking-wide">Task Manager</span>
        </div>

        <nav className="flex space-x-6 text-sm md:text-base">
          <Link
            to="/home"
            className="flex items-center space-x-1 hover:text-green-400 transition"
          >
            <ClipboardPlus className="w-5 h-5" />
            <span>Crear Tarea</span>
          </Link>

          <Link
            to="/"
            className="flex items-center space-x-1 hover:text-green-400 transition"
          >
            <ListTodo className="w-5 h-5" />
            <span>Mis Tareas</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
