import React from 'react'
import { Route, Routes} from 'react-router-dom'
import TaskManager from '../components/TaskManager'
import TaskList from '../components/TaskList'
import NotFound from '../components/NotFound'


const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/home' element={<TaskManager />} />
        <Route path='/list' element={<TaskList />} />
        {/* rutas dinámicas  */}
       

        {/* ruta no encontrada  - path="*" */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default AppRouter