import { useAuth0 } from '@auth0/auth0-react';
import { useContext, useEffect, useState } from 'react';
import { GiHamburgerMenu, GiCancel } from 'react-icons/gi';
import ThemeContext from '../../context/ThemeContext';
import { Parent, ParentTask } from '../../Types';
import ParentTasks from '../ParentTasks';
import SideMenu from '../SideMenu';

const ParentHomepage = () => {
  const [student, setStudent] = useState<string>('');
  const [parent, setParent] = useState<Parent>({ parentId: 0, firstname: '', surname: '', parentEmail: '', childId: '' });
  const [api, setApi] = useState<ParentTask[]>();
  const [openMenu, setOpenMenu] = useState(false);
  const display = useContext(ThemeContext);
  const { user } = useAuth0();

  const [theme, setTheme] = useState<string | null>()

  useEffect(() => {
    localStorage.setItem('Theme', display[0]);
    setTheme(localStorage.getItem('Theme'));
  }, [display]);

  //uses the parent email to get the child id and pass it to setStudent so that the correct students tasks will be shown
  //also sets parents details in state
  useEffect(() => {
    async function getStudent() {
      const res = await fetch(
        `https://homeworkhelper.onrender.com/parent?email=${user?.email}`
      );
      const data = await res.json();
      setStudent(data.payload[0].child_id);
      setParent({
        parentId: data.payload[0].parent_id,
        firstname: data.payload[0].firstname,
        surname: data.payload[0].surname,
        parentEmail: data.payload[0].email,
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
      }
    }
    getTasks();
  }, [student]);

  return (
    <div
      className={
        theme === 'tree'
          ? 'm-0 p-2 bg-cover bg-tree min-h-screen w-100vw'
          : theme === 'universe'
          ? 'm-0 p-2 bg-cover bg-universe min-h-screen w-100vw'
          : theme === 'stream'
          ? 'm-0 p-2 bg-cover bg-stream min-h-screen w-100vw'
          : theme === 'ruin'
          ? 'm-0 p-2 bg-cover bg-ruin min-h-screen w-100vw'
          : theme === 'aurora'
          ? 'm-0 p-2 bg-cover bg-aurora min-h-screen w-100vw'
          : 'm-0 p-2 bg-teal-800 min-h-screen w-100vw'
      }
    >
      {openMenu ? (
        <span
          aria-label='hamburger menu'
          className='z-10 fixed right-0 top-0 text-white text-xl md:text-4xl mt-2 grid grid-cols-2 place-items-center'
          onClick={() => {
            setOpenMenu(false);
          }}
        >
          <GiCancel />
        </span>
      ) : (
        <span
          aria-label='hamburger menu'
          className='z-10 fixed right-0 top-0 text-white text-xl md:text-4xl mt-2 grid grid-cols-2 place-items-center'
          onClick={() => {
            setOpenMenu(true);
          }}
        >
          <GiHamburgerMenu />
        </span>
      )}
      {openMenu && (
        <SideMenu
          firstname={parent.firstname}
          surname={parent.surname}
          email={parent.parentEmail}
          parentId={parent.parentId}
          studentCode=''
        />
      )}
      <h1
        aria-label='page title'
        className='font-bold text-white text-base md:text-3xl mb-5 text-center'
      >
        Welcome to Study Staxx
      </h1>
      {api && (
        <h2
          aria-label='page subtitle'
          className='font-bold text-white text-base md:text-2xl mb-5 text-center'
        >
          This is how your child is progressing
        </h2>
      )}
      {api && <ParentTasks tasks={api} />}
    </div>
  );
};

export default ParentHomepage;
