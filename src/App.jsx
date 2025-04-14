import { TaskProvider } from "./components/contexts/TaskContext";
import Navbar from "./components/Navbar";
import TaskManager from "./components/TaskManager";
import AppRouter from "./routes/AppRouter";

function App() {

  return (
    <TaskProvider>
      <Navbar/>
      <AppRouter />
      {/* <TaskManager /> */}
      {/* <TaskCard /> */}

      {/* <TaskForm /> */}

    </TaskProvider>
  )
}

export default App
