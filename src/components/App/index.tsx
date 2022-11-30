import {Routes, Route} from 'react-router-dom'
import './App.css'
import LoginPage from '../Login'
import StudentHomepage from '../StudentHomepage'
import ParentHomepage from '../ParentHomepage'


function App() {

  return (
    <div className="m-10">
    <Routes>
    <Route path="/" element={ <LoginPage/> } />
    <Route path="/student" element={ <StudentHomepage/> } />
    <Route path="/parent" element={ <ParentHomepage/>} />
</Routes>
    </div>
  )
}

export default App
