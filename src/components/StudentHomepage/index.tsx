import { useState, useEffect } from 'react';
import Tasks from '../Tasks';
import list from '../../data/data';
import NewTaskForm from '../NewTaskForm';
import ProgressBar from '../ProgressBar';


const StudentHomepage = () => {
  const [tasks, setTasks] = useState<Array<any>>(list);
  const [student, setStudent] = useState<{student_id: Number, firstname: String, surname: String}>()
  const [studentId, setStudentId] = useState(4)

  async function getStudent(){
    const res = await fetch(`https://homeworkhelper.onrender.com/student/${studentId}`)
          const data = await res.json()
          setStudent(data.payload)
      }

      // console.log("student",student && student.student_id)
  
  async function getTasks(){
    
          const res = await fetch(`https://homeworkhelper.onrender.com/student/tasks/${studentId}`)
          const data = await res.json()
          setTasks(data.payload)
          console.log("get tasks ran")
      }

      async function createTask(task:Tasks) {
        console.log("task", task)
        let res = await fetch(`https://homeworkhelper.onrender.com/tasks/${studentId}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
          }
        );
        let result = await res.json();
        console.log("new task posted", result)
          getTasks()
      } 

  useEffect( () => {
        getTasks()
        getStudent()
    }, []) 

  return (
    <div>
      {student ? <h1>Hello ... {student.firstname}... </h1> :null}
      <NewTaskForm createTask={createTask}/>
      <Tasks tasks={tasks} />
      <ProgressBar/>
    </div>
  );
};

export default StudentHomepage;
