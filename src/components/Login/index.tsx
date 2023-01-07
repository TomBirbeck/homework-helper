import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import LogoutButton from '../LogoutButton';
import {useAuth0} from '@auth0/auth0-react'
import SignupForm from '../SignupForm';


const LoginPage = () => {
  const {user, isAuthenticated, isLoading, loginWithRedirect} = useAuth0()
  const [person, setPerson] = useState('')

    async function findStudent() {
      const checkStudent = await fetch(
        `https://homeworkhelper.onrender.com/student?email=${user?.email}`
      );
      const studentData = await checkStudent.json();
      if (studentData.payload.length > 0) {
       setPerson('student'); }
      }
      
      async function findParent() {
        const parentCheck = await fetch(
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

return (
  <div  className='flex content-center justify-center m-0 p-2 bg-teal-800 min-h-screen w-100vw'>
  {isAuthenticated && !isLoading && person === 'student'?
   <Navigate to='/student'/> : 
   isAuthenticated && !isLoading && person === 'parent'? 
   <Navigate to='/parent'/> : 
   person !=='student' && person !=='parent' && isAuthenticated && !isLoading? 
   <div className='flex flex-col items-center'>
   <div className='flex flex-col items-center bg-teal-800 text-white text-center border-solid-2 rounded-lg p-2'>
     <LogoutButton/>
    <h1 className='mt-2'>Hey! We just need a few more pieces of information to sign you up to the app</h1>
    <SignupForm setPerson={setPerson}/>
   </div>
</div>
   : person !=='student' && person !=='parent' && !isAuthenticated && !isLoading?
  <>{loginWithRedirect()}</>: null}
  </div>
)
};

export default LoginPage;


