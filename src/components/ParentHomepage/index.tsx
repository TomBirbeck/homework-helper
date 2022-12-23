import { useAuth0 } from '@auth0/auth0-react';
import {useContext, useEffect, useState } from 'react';
import ThemeContext from '../../context/ThemeContext';
import ParentTasks from '../ParentTasks';
import SideMenu from '../SideMenu';

const ParentHomepage = () => {
  const [student, setStudent] = useState<String>('');
  const [parent, setParent] = useState<{
    firstname: String;
    surname: String;
    childId: String;
  }>({ firstname: '', surname: '', childId: '' });
  const [api, setApi] = useState<
    Array<{
      task_id: Number;
      subject: String;
      topic: String;
      description: String;
      due: String;
      completed: Boolean;
      creator_id: Number;
    }>
  >();
  const [openMenu, setOpenMenu] = useState(false)
  const display = useContext(ThemeContext)
  const {user} = useAuth0()

  const [theme, setTheme] = useState<String | null>()

  
  useEffect(()=>{
    localStorage.setItem('ParentTheme', display[0]);
    setTheme(localStorage.getItem('ParentTheme'))
  },[display])

//uses the parent email to get the child id and pass it to setStudent so that the correct students tasks will be shown
//also sets parents details in state
  useEffect(() => {
    async function getStudent() {
      const res = await fetch(`https://homeworkhelper.onrender.com/parent?email=${user?.email}`);
      const data = await res.json();
      setStudent(data.payload[0].child_id);
      setParent({
        firstname: data.payload[0].firstname,
        surname: data.payload[0].surname,
        childId: data.payload[0].child_id,
      });
    }
    getStudent();
  }, []);


//gets the students tasks for the parent
  useEffect(() => {
    async function getTasks() {
      if (parent.childId.length) {
        const res = await fetch(
          `https://homeworkhelper.onrender.com/studenttasks?code=${parent.childId}`
        );
        const data = await res.json();
        setApi(data.payload);
        // console.log("tasks", data.payload)
      }
    }
    getTasks();
  }, [student]);

  // console.log(api);
  return (
    <div className={theme === 'tree'? 'm-0 p-2 bg-cover bg-tree min-h-screen w-100vw'
    : theme === 'universe'? 'm-0 p-2 bg-cover bg-universe min-h-screen w-100vw' 
    : theme === 'boat'? 'm-0 p-2 bg-cover bg-boat min-h-screen w-100vw' 
    : theme === 'ruin'? 'm-0 p-2 bg-cover bg-ruin min-h-screen w-100vw' 
    : theme === 'aurora' ? 'm-0 p-2 bg-cover bg-aurora min-h-screen w-100vw' 
    : 'm-0 p-2 bg-purple-600 min-h-screen w-100vw'} >
      <span className='fixed right-0 top-0 text-white text-2xl pr-4' onClick={()=>{setOpenMenu(!openMenu)}}>Menu</span>
    {openMenu &&<SideMenu name={parent.firstname}/>}
      <h1 className='font-bold text-white text-3xl mb-5 text-center'>
        Welcome to Study Staxx
      </h1>
      {api && (
        <h2 className='font-bold text-white text-2xl mb-5 text-center'>
          This is how your child is progressing...
        </h2>
      )}
      {api && <ParentTasks tasks={api} />}
    </div>
  );
};

export default ParentHomepage;
