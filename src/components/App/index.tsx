import { useState } from 'react'
import LoginPage from '../Login'
import './App.css'
import StudentHomepage from '../StudentHomepage'
import ParentHomepage from '../ParentHomepage'
import NewTaskForm from '../NewTaskForm'
import Tasks from '../Tasks'
import list from '../../data/data'


function App() {
  const [tasks, setTasks] = useState<Array<any>>(list)

  return (
    <div className="m-10">
      <LoginPage/>
      <StudentHomepage/>
      <ParentHomepage/>
      <NewTaskForm/>
      <Tasks tasks={tasks}/>
    </div>
  )
}

export default App
