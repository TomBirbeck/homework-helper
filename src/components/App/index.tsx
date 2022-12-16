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
  // const [account, setAccount] = useState('')

  // async function findStudent() {
  //   const checkStudent = await fetch(
  //     `https://homeworkhelper.onrender.com/parent?email=${user?.email}`
  //     // `https://homeworkhelper.onrender.com/student?email=${email}`
  //   );
  //   const studentData = await checkStudent.json();
  //   if (studentData.payload.length > 0) {
  //   console.log("findstudent ran")
  //    setAccount('student'); }
  //   }

  //   useEffect(()=>{
  //     findStudent()
  //   },[user])

  //   console.log("account", account)

  return (
    <div className='m-0 p-2 bg-purple-800 min-h-screen w-screen'>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route element={<ProtectedRoute/>}>
        <Route path='/student' element={<StudentHomepage />} />
        {/* {account === 'student' && <Navigate to='/student'/>} */}
        <Route path='/parent' element={<ParentHomepage />} />
        </Route>
        {/* <Route path='/student' element={<StudentHomepage />} /> */}
        {/* <Route path='/parent' element={<ParentHomepage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
