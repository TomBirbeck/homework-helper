import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from '../Login';
import StudentHomepage from '../StudentHomepage';
import ParentHomepage from '../ParentHomepage';
import ProtectedRoute from '../protectedRoutes/ProtectedRoutes';
import { useAuth0 } from '@auth0/auth0-react';
import { useContext, useEffect, useState } from 'react';
import ThemeContext from '../../context/ThemeContext';

function App() {
  const {user} = useAuth0()
  // const [display, setDisplay] = useState('')
  const display = useState('boat')

  return (
    //  <div className={display === 'tree'? 'm-0 p-2 bg-cover bg-tree min-h-screen w-screen'
    // : display === 'universe'? 'm-0 p-2 bg-cover bg-universe min-h-screen w-screen' 
    // : display === 'boat'? 'm-0 p-2 bg-cover bg-boat min-h-screen w-screen' 
    // : display === 'ruin'? 'm-0 p-2 bg-cover bg-ruin min-h-screen w-screen' 
    // : display === 'aurora' ? 'm-0 p-2 bg-cover bg-aurora min-h-screen w-100vw' 
    // : 'm-0 p-2 bg-purple-600 min-h-screen w-screen'}>
    <ThemeContext.Provider value={display}>
    <div>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route element={<ProtectedRoute/>}>
        <Route path='/student' element={<StudentHomepage />} />
        {/* <Route path='/student' element={<StudentHomepage display={display} setDisplay={setDisplay}/>} /> */}
        <Route path='/parent' element={<ParentHomepage />} />
        {/* <Route path='/parent' element={<ParentHomepage display={display} setDisplay={setDisplay}/>} /> */}
        </Route>
      </Routes>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
