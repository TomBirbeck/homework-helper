import { useState, useEffect, useContext } from 'react';
import { GiHamburgerMenu, GiCancel } from 'react-icons/gi';
import Tasks from '../Tasks';
import list from '../../data/data';
import NewTaskForm from '../NewTaskForm';
import ProgressBar from '../ProgressBar';
import { GetTasksContext } from '../../context/GetTasksContext';
import { useAuth0 } from '@auth0/auth0-react';
import ThemeContext from '../../context/ThemeContext';
import SideMenu from '../SideMenu';
import { API } from '../../Types';


const StudentHomepage = () => {
  const [tasks, setTasks] = useState<Array<API>>(list);
  const [student, setStudent] = useState<{
    student_id: Number;
    firstname: string;
    surname: string;
    studentEmail: string;
    student_code: string;
  }>({
    student_id: 0,
    firstname: '',
    surname: '',
    studentEmail: '',
    student_code: '',
  });
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [openMenu, setOpenMenu] = useState(false);
  const [openStaxx, setOpenStaxx] = useState(false);
  const { user } = useAuth0();
  const display = useContext(ThemeContext);
  const [theme, setTheme] = useState<String | null>();

  useEffect(() => {
    localStorage.setItem('Theme', display[0]);
    setTheme(localStorage.getItem('Theme'))
  },[display])
  
  
  async function getStudent() {
    const res = await fetch(
      `https://homeworkhelper.onrender.com/student?email=${user?.email}`
    );
    const data = await res.json();
    setStudent({
      ...student,
      student_id: data.payload[0].student_id,
      firstname: data.payload[0].firstname,
      surname: data.payload[0].surname,
      studentEmail: data.payload[0].email,
      student_code: data.payload[0].student_code,
    });
  }

  async function getTasks() {
      const res = await fetch(
        `https://homeworkhelper.onrender.com/studenttasks?code=${student.student_code}`
      );
      const data = await res.json();
      const tasks = data.payload?.filter((task: API) => {return task.deleted === false})
      setTasks(tasks);
      setTotal(tasks.length);
      let count = 0
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].completed) {
          count++
        }
        setProgress(count);
    }
  }

  async function createTask(task: Tasks) {
    const code = student.student_code;

    let res = await fetch(`https://homeworkhelper.onrender.com/tasks/${code}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    let result = await res.json();
    getTasks();
    setOpenStaxx(false);
  }

  useEffect(() => {
    getStudent();
    getTasks();
  }, [student.student_code]);

  return (
    <div
      aria-label='student homepage'
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
          firstname={student.firstname}
          surname={student.surname}
          studentId={student.student_id}
          email={student.studentEmail}
          studentCode={student.student_code}
        />
      )}
      {student && (
        <div>
          <h1
            aria-label='study staxx title'
            className={
              theme === 'boat'
                ? 'font-bold text-black text-base md:text-4xl mb-2 text-center'
                : 'italic font-bold text-white text-base md:text-4xl mb-2 text-center'
            }
          >
            Welcome to Study Staxx
          </h1>
          <h2
            aria-label='subtitle'
            className={
              theme === 'boat'
                ? 'font-bold text-black text-xs md:text-xl mb-4 text-center'
                : 'italic font-bold text-white text-xs md:text-xl mb-4 text-center'
            }
          >
            Track, Stack & Succeed
          </h2>
        </div>
      )}
      <GetTasksContext.Provider value={getTasks}>
        <div className='grid place-items-center my-3'>
          <h3
            aria-label='add staxx label'
            className='italic font-bold md:text-2xl text-center text-white font-mono w-fit'
            onClick={() => {
              setOpenStaxx(!openStaxx);
            }}
          >
            Add Staxx {!openStaxx ? <span>+</span> : <span>-</span>}
          </h3>
        </div>
        {openStaxx && <NewTaskForm createTask={createTask} />}
        <Tasks tasks={tasks} getTasks={getTasks} />
      </GetTasksContext.Provider>
      <ProgressBar progress={progress} total={total} />
    </div>
  );
};

export default StudentHomepage;
