import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import LogoutButton from '../LogoutButton';
import ParentTasks from '../ParentTasks';

const ParentHomepage = () => {
  const [student, setStudent] = useState<Number>(0);
  const [parent, setParent] = useState<{
    firstname: String;
    surname: String;
    childId: Number;
  }>({ firstname: '', surname: '', childId: 0 });
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
      // const email = 'parentfour@email.com'
      const res = await fetch(`https://homeworkhelper.onrender.com/parent?email=${user?.email}`);
      const data = await res.json();
      console.log(data)
      setStudent(data.payload[0].child_id);
      setParent({
        firstname: data.payload[0].firstname,
        surname: data.payload[0].surname,
        childId: data.payload[0].child_id,
      });
    }
    getStudent();
  }, []);


  // useEffect(() => {
  //   async function getStudent() {
  //     const res = await fetch('https://homeworkhelper.onrender.com/parent/4');
  //     const data = await res.json();
  //     setStudent(data.payload[0].child_id);
  //     setParent({
  //       firstname: data.payload[0].firstname,
  //       surname: data.payload[0].surname,
  //       childId: data.payload[0].child_id,
  //     });
  //   }
  //   getStudent();
  // }, []);
  console.log(student);
  console.log(parent);

  useEffect(() => {
    async function getTasks() {
      if (parent.childId > 0) {
        const res = await fetch(
          `https://homeworkhelper.onrender.com/student/tasks/${parent.childId}`
        );
        const data = await res.json();
        setApi(data.payload);
      }
    }
    getTasks();
  }, [student]);

  // console.log(api);
  return (
    <>
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
