import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoginButton from '../LoginButton';
import LogoutButton from '../LogoutButton';
import {useAuth0} from '@auth0/auth0-react'


const LoginPage = () => {
  const {user, isAuthenticated} = useAuth0()
  console.log(user?.email)

  const [person, setPerson] = useState('')

 
    async function findStudent() {
      const checkStudent = await fetch(
        `https://homeworkhelper.onrender.com/student?email=${user?.email}`
        // `https://homeworkhelper.onrender.com/student?email=${email}`
      );
      const studentData = await checkStudent.json();
      if (studentData.payload.length > 0) {
       setPerson('student'); }
      }
      
      async function findParent() {
        const parentCheck = await fetch(
          // `https://homeworkhelper.onrender.com/parent?email=${user.email}`
        `https://homeworkhelper.onrender.com/parent?email=${user?.email}`
        );
        const parentData = await parentCheck.json();
        if (parentData.payload.length > 0) {
        setPerson('parent');
      }
    }
  
      useEffect(()=>{
        findStudent()
        findParent()
      },[user])



//   return (
//     <div>
//       <h1 className='font-bold text-white italic text-5xl my-36 text-center'>
//         Welcome to homework helper
//       </h1>
//       <button>Login</button>
//       <div className='min-h-screen flex justify-center align-middle gap-1'>
//         <Link to='student'>
//           <button className='bg-green-600'>Login as Student</button>
//         </Link>
//         <Link to='parent'>
//           <button className='bg-red-600'>Login as Parent</button>
//         </Link>
//       </div>
//     </div>
//   );

return (
  <>
  {isAuthenticated && person === 'student'? <Navigate to='/student'/> : isAuthenticated && person === 'parent'? <Navigate to='/parent'/> : <LoginButton/>}
  </>
)
};

export default LoginPage;




