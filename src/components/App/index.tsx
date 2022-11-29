import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import LoginPage from '../Login'
import StudentHomepage from '../StudentHomepage'
import ParentHomepage from '../ParentHomepage'
import NewTaskForm from '../NewTaskForm'
import Tasks from '../Tasks'
import list from '../../data/data'


function App() {
  const [tasks, setTasks] = useState<Array<any>>(list)

  return (
    <div className="m-10">
    <Routes>
    <Route path="/" element={ <LoginPage/> } />
    <Route path="/student" element={ <StudentHomepage/> } />
    <Route path="/parent" element={ <ParentHomepage/>} />
      {/* <NewTaskForm setTasks={setTasks}/>
      <Tasks tasks={tasks}/> */}
</Routes>
    </div>
  )
}

export default App
