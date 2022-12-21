import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from '../Login';
import StudentHomepage from '../StudentHomepage';
import ParentHomepage from '../ParentHomepage';
import ProtectedRoute from '../protectedRoutes/ProtectedRoutes';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

function App() {
  const {user} = useAuth0()
 
  return (
    <div className="m-0 p-2 bg-universe min-h-screen w-screen">
    {/* <div className="m-0 p-2 bg-[url('/src/assets/tree.jpg')] min-h-screen w-screen"> */}
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route element={<ProtectedRoute/>}>
        <Route path='/student' element={<StudentHomepage />} />
        <Route path='/parent' element={<ParentHomepage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
