import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoginButton from '../LoginButton';
import LogoutButton from '../LogoutButton';
import {useAuth0} from '@auth0/auth0-react'
import SignupForm from '../SignupForm';


const LoginPage = () => {
  const {user, isAuthenticated, isLoading} = useAuth0()
  const [person, setPerson] = useState('')

  console.log("loading", isLoading)

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

      const {loginWithPopup, loginWithRedirect} = useAuth0()

return (
  <div  className='flex content-center justify-center m-0 p-2 bg-purple-200 min-h-screen w-100vw'>
  {isAuthenticated && !isLoading && person === 'student'?
   <Navigate to='/student'/> : 
   isAuthenticated && !isLoading && person === 'parent'? 
   <Navigate to='/parent'/> : 
   person !=='student' && person !=='parent' && isAuthenticated && !isLoading? 
   <div className='flex flex-col items-center'>
   <div className='flex flex-col items-center bg-yellow-300 border-solid-2 rounded-lg p-2'>
     <LogoutButton/>
    <h1>Hey! We just need a few more pieces of information to sign you up to the app</h1>
    <SignupForm setPerson={setPerson}/>
   </div>
</div>
   : person !=='student' && person !=='parent' && !isAuthenticated && !isLoading?
  //  <LoginButton/>}
  <>{loginWithRedirect()}</>: null}
  </div>
)
};

export default LoginPage;


