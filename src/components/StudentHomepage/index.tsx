import { useState, useEffect, useContext } from 'react';
import Tasks from '../Tasks';
import list from '../../data/data';
import NewTaskForm from '../NewTaskForm';
import ProgressBar from '../ProgressBar';
import { GetTasksContext } from '../../context/GetTasksContext';
import { useAuth0 } from '@auth0/auth0-react';
import ThemeContext from '../../context/ThemeContext';
import SideMenu from '../SideMenu';

const StudentHomepage = () => {
  const [tasks, setTasks] = useState<Array<any>>(list);
  const [student, setStudent] = useState<{
    student_id: Number;
    firstname: String;
    surname: String;
    student_code: String;
  }>();
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [openMenu, setOpenMenu] = useState(false)
  const {user} = useAuth0()
  const display = useContext(ThemeContext)
  const [theme, setTheme] = useState<String | null>()

  
  useEffect(()=>{
    localStorage.setItem('StudentTheme', display[0]);
    setTheme(localStorage.getItem('StudentTheme'))
  },[display])
  
  // console.log(user)
  
  async function getStudent() {
    const res = await fetch(
      `https://homeworkhelper.onrender.com/student?email=${user?.email}`
    );
    const data = await res.json();
    // console.log("student", data.payload[0])
      setStudent({...student, student_id: data.payload[0].student_id, firstname: data.payload[0].firstname, surname: data.payload[0].surname, student_code: data.payload[0].student_code});
  }

  // console.log("student", student)

  async function getTasks() {
      const res = await fetch(
        // `http://localhost:3001/test?code=${student?.student_code}`
        // `http://localhost:3001/student/tasks/${student?.student_code}`
        // `http://localhost:3001/studenttasks?code=${student?.student_code}`
        `https://homeworkhelper.onrender.com/studenttasks?code=${student?.student_code}`
      );
      const data = await res.json();
      // console.log("Tasks", data)
      setTasks(data.payload);
      setTotal(data.payload.length);
      let count = 0
      for (let i = 0; i < data.payload.length; i++) {
        if (data.payload[i].completed) {
          count++
        }
        setProgress(count);
    }
    // console.log('get tasks ran', student?.student_code);
  }

  async function createTask(task: Tasks) {
    const code = student?.student_code
    let res = await fetch(
      `https://homeworkhelper.onrender.com/tasks/${code}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      }
    );
    let result = await res.json();
    // console.log('new task posted', result);
    getTasks();
  }

  useEffect(() => {
    getStudent();
    getTasks()
  },[student?.student_code]);

  return (
    <div className={theme === 'tree'? 'm-0 p-2 bg-cover bg-tree min-h-screen w-100vw'
    : theme === 'universe'? 'm-0 p-2 bg-cover bg-universe min-h-screen w-100vw' 
    : theme === 'boat'? 'm-0 p-2 bg-cover bg-boat min-h-screen w-100vw' 
    : theme === 'ruin'? 'm-0 p-2 bg-cover bg-ruin min-h-screen w-100vw' 
    : theme === 'aurora' ? 'm-0 p-2 bg-cover bg-aurora min-h-screen w-100vw' 
    : 'm-0 p-2 bg-purple-600 min-h-screen w-100vw'} >
      <span className='fixed right-0 top-0 text-white text-2xl pr-4' onClick={()=>{setOpenMenu(!openMenu)}}>Menu</span>
      {openMenu && <SideMenu name={student?.firstname} Id={student?.student_code}/>}
        {student && (
          <h1 className={theme === 'boat' ? 'font-bold text-black text-3xl mb-5 text-center' :'font-bold text-white text-3xl mb-5 text-center'}>
            Welcome to Study Staxx
          </h1>
        )}
        <GetTasksContext.Provider value={getTasks}>
         <Tasks tasks={tasks}/>
        </GetTasksContext.Provider>
        <ProgressBar progress={progress} total={total}/>
        <NewTaskForm createTask={createTask} />
    </div>
  );
};

export default StudentHomepage;
