import { useState, useEffect } from 'react';
import Tasks from '../Tasks';
import list from '../../data/data';
import NewTaskForm from '../NewTaskForm';
import ProgressBar from '../ProgressBar';

const StudentHomepage = () => {
  const [tasks, setTasks] = useState<Array<any>>(list);
  // const [newTask, setNewTask] = useState({subject:'', topic: '', description: '', due: '', completed: false})
  const [studentId, setStudentId] = useState(1)

  useEffect( () => {
    async function getTasks(){
      
            const res = await fetch(`https://homeworkhelper.onrender.com/student/${studentId}`)
            const data = await res.json()
            setTasks(data.payload)
        }
        getTasks()
    }, [tasks]) 

  return (
    <div>
      <h1>Hello ... student name here ... </h1>
      <NewTaskForm studentID={studentId}/>
      <Tasks tasks={tasks} />
      <ProgressBar/>
    </div>
  );
};

export default StudentHomepage;
