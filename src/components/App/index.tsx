import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from '../Login';
import StudentHomepage from '../StudentHomepage';
import ParentHomepage from '../ParentHomepage';
import ProtectedRoute from '../protectedRoutes/ProtectedRoutes';

function App() {
  return (
    <div className='m-0 p-2 bg-purple-800 min-h-screen w-screen'>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <ProtectedRoute path='/student' element={<StudentHomepage />} />
        {/* <Route path='/student' element={<StudentHomepage />} /> */}
        <ProtectedRoute path='/parent' element={<ParentHomepage />} />
        {/* <Route path='/parent' element={<ParentHomepage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
