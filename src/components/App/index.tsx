import { Routes, Route} from 'react-router-dom';
import './App.css';
import LoginPage from '../Login';
import StudentHomepage from '../StudentHomepage';
import ParentHomepage from '../ParentHomepage';
import ProtectedRoute from '../protectedRoutes/ProtectedRoutes';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import ThemeContext from '../../context/ThemeContext';

function App() {
  const {user} = useAuth0()
  const display = useState(localStorage.getItem('Theme') || 'stream')

  console.log(user)

  return (
    <div>
      <ThemeContext.Provider value={display}>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route element={<ProtectedRoute/>}>
        <Route path='/student' element={<StudentHomepage />} />
        <Route path='/parent' element={<ParentHomepage />} />
        </Route>
      </Routes>
    </ThemeContext.Provider>
    </div>
  );
}

export default App;
