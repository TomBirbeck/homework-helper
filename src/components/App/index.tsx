import { useState } from 'react'
import LoginPage from '../Login'
import './App.css'
import StudentHomepage from '../StudentHomepage'
import ParentHomepage from '../ParentHomepage'
import NewTaskForm from '../NewTaskForm'
import Tasks from '../Tasks'
import TaskList from '../TasksList'
import list from '../../data/data'

function App() {

  return (
    <div className="m-10">
      <LoginPage/>
      <StudentHomepage/>
      <ParentHomepage/>
      <NewTaskForm/>
      <Tasks/>
      <TaskList props={list}/>
    </div>
  )
}

export default App
