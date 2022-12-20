import { useState, useEffect } from 'react';
import Tasks from '../Tasks';
import list from '../../data/data';
import NewTaskForm from '../NewTaskForm';
import ProgressBar from '../ProgressBar';
import { GetTasksContext } from '../../context/GetTasksContext';
import LogoutButton from '../LogoutButton';
import StudentTopBar from '../StudentTopBar';
import { useAuth0 } from '@auth0/auth0-react';

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
  const {user} = useAuth0()
  
  async function getStudent() {
    const res = await fetch(
      `https://homeworkhelper.onrender.com/student?email=${user?.email}`
    );
    const data = await res.json();
    console.log("student", data.payload[0])
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
      console.log("Tasks", data)
      setTasks(data.payload);
      setTotal(data.payload.length);
      let count = 0
      for (let i = 0; i < data.payload.length; i++) {
        if (data.payload[i].completed) {
          count++
        }
        setProgress(count);
    }
    console.log('get tasks ran', student?.student_code);
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
    console.log('new task posted', result);
    getTasks();
  }

  useEffect(() => {
    getStudent();
    getTasks()
  },[student?.student_code]);

  return (
    <div>
      {/* <LogoutButton/> */}
      <StudentTopBar student_code={student?.student_code}/>
        {student && (
          <h1 className='font-bold text-white text-3xl mb-5 text-center'>
            Hello {student.firstname}, Welcome to Homework Helper!
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
