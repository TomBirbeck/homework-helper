import { useState } from 'react'
import LoginPage from '../Login'
import './App.css'
import StudentHomepage from '../StudentHomepage'
import ParentHomepage from '../ParentHomepage'
import NewTaskForm from '../NewTaskForm'

function App() {

  return (
    <div className="App">
      <LoginPage/>
      <StudentHomepage/>
      <ParentHomepage/>
      <NewTaskForm/>
        
    </div>
  )
}

export default App
