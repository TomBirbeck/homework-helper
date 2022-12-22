import { useAuth0 } from '@auth0/auth0-react';
import {useEffect, useState } from 'react';
import LogoutButton from '../LogoutButton';
import ParentTasks from '../ParentTasks';

type ParentHomepageIProps = {
  display : String,
  setDisplay: React.Dispatch<React.SetStateAction<string>>
}

const ParentHomepage = ({setDisplay} : ParentHomepageIProps) => {
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

  const {user} = useAuth0()


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
    <>
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
    </>
  );
};

export default ParentHomepage;
