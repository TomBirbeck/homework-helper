import { useAuth0 } from '@auth0/auth0-react';
import {useContext, useEffect, useState } from 'react';
import ThemeContext from '../../context/ThemeContext';
import LogoutButton from '../LogoutButton';
import ParentTasks from '../ParentTasks';

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
  const [display, setDisplay] = useContext(ThemeContext)
  const {user} = useAuth0()

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
    <div className={display === 'tree'? 'm-0 p-2 bg-cover bg-tree min-h-screen w-100vw'
    : display === 'universe'? 'm-0 p-2 bg-cover bg-universe min-h-screen w-100vw' 
    : display === 'boat'? 'm-0 p-2 bg-cover bg-boat min-h-screen w-100vw' 
    : display === 'ruin'? 'm-0 p-2 bg-cover bg-ruin min-h-screen w-100vw' 
    : display === 'aurora' ? 'm-0 p-2 bg-cover bg-aurora min-h-screen w-100vw' 
    : 'm-0 p-2 bg-purple-600 min-h-screen w-100vw'} >
    <form>
    <label htmlFor='theme'>
          Theme
          <select
            // value={display}
            onChange={(e) => setDisplay(e.target.value)}
            onBlur={(e) => setDisplay(e.target.value)}
          >
            <option value=''>None</option>
            <option value='boat'>Boat</option>
            <option value='universe'>Universe</option>
            <option value='ruin'>Ruin</option>
            <option value='tree'>Tree</option>
            <option value='aurora'>Aurora</option>
          </select>
        </label>
    </form>
      <LogoutButton/>
      <h1 className='font-bold text-white text-3xl mb-5 text-center'>
        Hello {parent.firstname}
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
