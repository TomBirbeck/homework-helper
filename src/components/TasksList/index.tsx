import test from 'node:test';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { GetTasksContext } from '../../context/GetTasksContext';
import ThemeContext from '../../context/ThemeContext';

interface Iprops {
  taskId: Number;
  subject: String;
  topic: String;
  description?: String;
  due: String;
  completed: Boolean;
}

const TaskList: FunctionComponent<Iprops> = (props) => {
  const { taskId, subject, topic, description, due, completed} = props;
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

  return (
    // <div className='flex justify-between gap- w-full p-2 mb-1.5 bg-yellow-300 border-none rounded-lg'>
    <div className={theme === 'tree' || theme === 'universe' || theme === 'ruin' || theme === 'boat' || theme === 'aurora' ? 'flex justify-between w-full p-2 mb-1.5 bg-none backdrop-blur-sm border-solid border-2 border-opacity-10 border-white rounded-lg text-white'
    // : display[0] === 'universe'? 'flex justify-between w-full p-2 mb-1.5 bg-none backdrop-blur-sm border-solid border-2 border-opacity-10 border-white rounded-lg text-white' 
    // : display[0] === 'boat'? 'flex justify-between w-full p-2 mb-1.5 bg-none backdrop-blur-sm border-solid border-2 border-opacity-10 border-white rounded-lg text-white' 
    // : display[0] === 'ruin'? 'flex justify-between w-full p-2 mb-1.5 bg-none backdrop-blur-sm border-solid border-2 border-opacity-10 border-white rounded-lg text-white' 
    // : display[0] === 'aurora' ? 'flex justify-between w-full p-2 mb-1.5 bg-none backdrop-blur-sm border-solid border-2 border-opacity-10 border-white rounded-lg text-white' 
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
          <p className='truncate border-solid border-r-2 border-white pl-2'>
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
          <div className='grid place-items-center'>
          <button
            className='ml-2 w-1/2 border-solid border-2 border-white rounded bg-red-400'
            onClick={handleComplete}
          >
            Outstanding
          </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
