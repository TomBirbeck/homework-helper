import { FunctionComponent, useContext } from 'react';
import { GetTasksContext } from '../../context/GetTasksContext';

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

  const completeTask = async (id: Number) => {
    let res = await fetch(
      `https://homeworkhelper.onrender.com/tasks/completed/${id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    let result = await res.json();
    console.log('task completed', result);
    getTasks()
  };

  const deleteTask = async (id: Number) => {
    let res = await fetch(`https://homeworkhelper.onrender.com/tasks/${id}`, 
    {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
    let result = await res.json()
    console.log('task deleted', result)
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
    <div className='flex justify-between gap- w-full p-2 mb-1.5 bg-yellow-300 border-none rounded-lg'>
      <div className='grid grid-cols-5 justify-between w-full'>
        <p className='border-solid border-r-2 border-purple-800 pl-2'>
          {subject}
        </p>
        <p className='border-solid border-r-2 border-purple-800 pl-2'>
          {topic}
        </p>
        <p className='border-solid border-r-2 border-purple-800 pl-2'>{due}</p>
        {description ? (
          <p className='truncate border-solid border-r-2 border-purple-800 pl-2'>
            {description}
          </p>
        ) : (
          <p></p>
        )}
        {completed ? (
          <div className='grid grid-cols-2'>
          <button
            className='ml-2 border-solid border-2 border-black rounded bg-green-600'
            onClick={handleComplete}
          >
            Completed
          </button>
          <button onClick={handleDelete}>X</button>
          </div>
        ) : (
          <button
            className='ml-2 w-1/2 border-solid border-2 border-black rounded bg-red-600'
            onClick={handleComplete}
          >
            Outstanding
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskList;
