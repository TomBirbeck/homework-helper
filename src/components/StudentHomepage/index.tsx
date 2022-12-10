import { useState, useEffect } from 'react';
import Tasks from '../Tasks';
import list from '../../data/data';
import NewTaskForm from '../NewTaskForm';
import ProgressBar from '../ProgressBar';
import CompletedContext from '../../context/completedContext';

const StudentHomepage = () => {
  const [tasks, setTasks] = useState<Array<any>>(list);
  const [student, setStudent] = useState<{
    student_id: Number;
    firstname: String;
    surname: String;
  }>();
  const [studentId, setStudentId] = useState(4);
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);

  async function getStudent() {
    const res = await fetch(
      `https://homeworkhelper.onrender.com/student/${studentId}`
    );
    const data = await res.json();
    setStudent(data.payload[0]);
  }

  console.log('student', student && student.student_id);

  async function getTasks() {
    const res = await fetch(
      `https://homeworkhelper.onrender.com/student/tasks/${studentId}`
    );
    const data = await res.json();
    setTasks(data.payload);
    setTotal(data.payload.length);
    for (let i = 0; i < data.payload.length; i++) {
      if (data.payload[i].completed) {
        setProgress((prev) => prev + 1);
        console.log('progress on main', progress);
      }
    }
    console.log('get tasks ran');
  }

  async function createTask(task: Tasks) {
    console.log('task', task);
    let res = await fetch(
      `https://homeworkhelper.onrender.com/tasks/${studentId}`,
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
    getTasks();
    getStudent();
  }, []);

  const completed = useState(true);

  return (
    <div>
      <CompletedContext.Provider value={completed}>
        {student && (
          <h1 className='font-bold text-white text-3xl mb-5 text-center'>
            Hello {student.firstname}, Welcome to Homework Helper!
          </h1>
        )}
        <Tasks tasks={tasks} />
        <ProgressBar progress={progress} total={total} />
        <NewTaskForm createTask={createTask} />
      </CompletedContext.Provider>
    </div>
  );
};

export default StudentHomepage;
