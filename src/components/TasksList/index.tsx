import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { MdEdit, MdOutlineCancel} from 'react-icons/md'

import { GetTasksContext } from '../../context/GetTasksContext';
import ThemeContext from '../../context/ThemeContext';

interface Iprops {
  taskId: number;
  subject: string;
  topic: string;
  description: string;
  due: string;
  completed: boolean;
  editOpen: boolean;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>
  updatedTask: {
    id: number;
    subject: string;
    topic: string;
    description: string;
    due: string;
    completed: boolean;
  }
  setUpdatedTask: React.Dispatch<React.SetStateAction<{
    id: number;
    subject: string;
    topic: string;
    description: string;
    due: string;
    completed: boolean;
}>>
}

const TaskList: FunctionComponent<Iprops> = (props) => {
  const { taskId, subject, topic, description, due, completed, editOpen, setEditOpen, updatedTask, setUpdatedTask} = props;
  const getTasks = useContext(GetTasksContext)
  const display = useContext(ThemeContext)
const [theme, setTheme] = useState<String | null>()

  
  useEffect(()=>{
    localStorage.setItem('StudentTheme', display[0]);
    setTheme(localStorage.getItem('StudentTheme'))
  },[display])

  const completeTask = async (id: Number) => {
    let res = await fetch(
      `https://homeworkhelper.onrender.com/tasks/completed/${id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    let result = await res.json();
    // console.log('task completed', result);
    getTasks()
  };

  const deleteTask = async (id: Number) => {
    let res = await fetch(`https://homeworkhelper.onrender.com/tasks/${id}`, 
    {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
    let result = await res.json()
    // console.log('task deleted', result)
    getTasks()
  }

  const deleteMultipleTasks = async (ids: Array<Number>) => {
    
    for (let i = 0; i < ids.length; i++){
      let res = await fetch(`https://homeworkhelper.onrender.com/tasks/${ids[i]}`, 
      {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
      })
      let result = await res.json()
      console.log('task deleted', ids[i], result)
}

  }
  
  const handleComplete = () => {
    completeTask(taskId);
  };

  const handleDelete = () => {
    deleteTask(taskId);
  }

  // const handleMultipleDeletes = () => {
  //deleteMultipleTasks()
  // }

  const handleEdit = () => {
    setEditOpen(!editOpen)
    setUpdatedTask({...updatedTask,id:taskId, subject: subject, topic: topic, description: description, due: due, completed: completed })
  }

  return (
    <div className={theme === 'tree' || theme === 'universe' || theme === 'ruin' || theme === 'stream' || theme === 'aurora' ? 'flex justify-between w-full p-2 mb-1.5 bg-none backdrop-blur-sm border-solid border-2 border-opacity-10 border-white rounded-lg text-white'
    : 'flex justify-between gap- w-full p-2 mb-1.5 bg-yellow-300 border-none rounded-lg'} >
      <div className='grid grid-cols-5 justify-between w-full'>
        <p className='border-solid border-r-2 border-white pl-2'>
          {subject}
        </p>
        <p className='border-solid border-r-2 border-white pl-2'>
          {topic}
        </p>
        <p className='border-solid border-r-2 border-white pl-2'>{due}</p>
        {description ? (
          <p className='border-solid border-r-2 border-white pl-2 truncate'>
            {description}
          </p>
        ) : (
          <p></p>
        )}
        {completed ? (
          <div className='grid place-items-center'>
          <button
            className='ml-2 border-solid border-2 border-white rounded bg-green-400 w-1/2'
            onClick={handleComplete}
          >
            Completed
          </button>
          {/* <button
          className='ml-2 w-1/2 border-solid border-2 border-white rounded bg-red-400 items-end'
           onClick={handleDelete}>Clear</button> */}
          </div>
        ) : (
          <div className='grid grid-cols-3 place-items-center'>
          <button
            className='col-span-2 w-2/3 ml-2 border-solid border-2 border-white rounded bg-red-400'
            onClick={handleComplete}
          >
            Outstanding
          </button>
          <span>
            <MdEdit onClick={handleEdit}/>
          </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
