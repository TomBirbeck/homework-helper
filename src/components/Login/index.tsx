import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoginButton from '../LoginButton';
import LogoutButton from '../LogoutButton';
import {useAuth0} from '@auth0/auth0-react'


const LoginPage = () => {
  const {user, isAuthenticated} = useAuth0()
  console.log(user)

  const [person, setPerson] = useState(user)

 
    async function findStudent() {
      const checkStudent = await fetch(
        `https://homeworkhelper.onrender.com/parent?email=${user?.email}`
        // `https://homeworkhelper.onrender.com/student?email=${email}`
      );
      const studentData = await checkStudent.json();
      if (studentData.payload.length > 0) {
       console.log('user is student'); }
      }

      useEffect(()=>{
        findStudent()
      },[person])

//       async function findParent() {
//         const parentCheck = await fetch(
//           // `https://homeworkhelper.onrender.com/parent?email=${user.email}`
//         `https://homeworkhelper.onrender.com/parent?email=${email}`
//         );
//         const parentData = await parentCheck.json();
//         if (parentData.payload.length > 0) {
//         console.log('user is parent');
//       }
//     }
  

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
  {isAuthenticated ?  <LogoutButton/> : <LoginButton/>}
  </>
)
};

export default LoginPage;




