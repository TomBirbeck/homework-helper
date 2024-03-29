import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { MdEdit} from 'react-icons/md'
import { AiOutlineAlert } from 'react-icons/ai'
import { GetTasksContext } from '../../context/GetTasksContext';
import ThemeContext from '../../context/ThemeContext';
import compareDates from '../Utilities/compareDates';
import reverseDate from '../Utilities/reverseDate';
import { TaskListIprops } from '../../Types';

const TaskList: FunctionComponent<TaskListIprops> = (props) => {
  const { taskId, subject, topic, description, due, priority, completed, editOpen, setEditOpen, updatedTask, setUpdatedTask, windowSize} = props;
  const getTasks = useContext(GetTasksContext)
  const display = useContext(ThemeContext)
const [theme, setTheme] = useState<String | null>()
const [dueSoon, setDueSoon] = useState(false)
const [overdue, setOverdue] = useState(false)

  
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
    const shadowDelete = {id: id, deleted: true}
    let res = await fetch(`https://homeworkhelper.onrender.com/tasksshadowdelete`, 
    {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(shadowDelete)
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
}

  }
  
  const handleComplete = () => {
    completeTask(taskId);
  };

  const handleDelete = () => {
    deleteTask(taskId);
  }
  
  const handleEdit = () => {
    setEditOpen(!editOpen)
    setUpdatedTask({...updatedTask,id:taskId, subject: subject, topic: topic, description: description, due: due, priority: priority, completed: completed })
    window.scrollTo({top:0,behavior:'smooth'})
  }

  return (
    <div aria-label='task item' className={theme === 'tree' || theme === 'universe' || theme === 'ruin' || theme === 'stream' || theme === 'aurora' ? 'flex justify-between w-full p-2 mb-1.5 bg-none backdrop-blur-sm border-solid border-2 border-opacity-10 border-white rounded-lg text-white'
    : 'flex justify-between w-full p-2 mb-1.5 bg-teal-400 border-none rounded-lg'} >
      <div className='md:grid md:grid-cols-6 justify-between w-full'>
        <p aria-label='task subject' className='border-solid md:border-r-2 border-white pl-2'>
          {subject}
        </p>
        <p aria-label='task topic' className='border-solid md:border-r-2 border-white pl-2'>
          {topic}
        </p>
        { dueSoon && windowSize > 762? <span aria-label='task due soon icon' className='grid grid-cols-2 border-solid md:border-r-2 border-white pl-2' onMouseLeave={()=>{setDueSoon(false)}}>Task due soon</span> : 
         dueSoon && windowSize < 762? < div className='grid grid-cols-2 border-solid md:border-r-2 border-white pl-2'><span>Task due soon</span><span className='grid justify-end text-2xl text-amber-500' onClick={()=>{setDueSoon(false)}}><AiOutlineAlert/></span></div> : 
        overdue && windowSize > 762? <span aria-label='task overdue icon' className='grid grid-cols-2 border-solid md:border-r-2 border-white pl-2' onMouseLeave={()=>{setOverdue(false)}}>Task Overdue</span> : 
        overdue && windowSize < 762? <div className='grid grid-cols-2 border-solid md:border-r-2 border-white pl-2'><span>Task Overdue</span><span className='grid justify-end text-2xl text-red-500' onClick={()=>{setOverdue(false)}}><AiOutlineAlert/></span></div>: 
        compareDates(due) < 0 && !completed && windowSize > 762? <p className='grid grid-cols-2 border-solid md:border-r-2 border-white pl-2'>{reverseDate(due)} <span className='grid justify-end text-2xl text-red-500' onMouseEnter={()=>{setOverdue(true)}}><AiOutlineAlert/></span></p> :
        compareDates(due) < 0 && !completed && windowSize < 762? <p className='grid grid-cols-2 border-solid md:border-r-2 border-white pl-2'>{reverseDate(due)} <span className='grid justify-end text-2xl text-red-500' onClick={()=>{setOverdue(true)}}><AiOutlineAlert/></span></p> :
        compareDates(due) < 3 && !completed && windowSize > 762? <p className='grid grid-cols-2 border-solid md:border-r-2 border-white pl-2'>{reverseDate(due)} <span className='grid justify-end text-2xl text-amber-500' onMouseEnter={()=>{setDueSoon(true)}}><AiOutlineAlert/></span></p> :
        compareDates(due) < 3 && !completed && windowSize < 762? <p className='grid grid-cols-2 border-solid md:border-r-2 border-white pl-2'>{reverseDate(due)} <span className='grid justify-end text-2xl text-amber-500' onClick={()=>{setDueSoon(true)}}><AiOutlineAlert/></span></p> :
        <p aria-label='task due date' className='border-solid md:border-r-2 border-white pl-2'>{reverseDate(due)}</p>}
        {description ? (
          <p aria-label='task description' className='border-solid  md:border-r-2 border-white pl-2 h-6 truncate hover:overflow-visible hover:whitespace-normal hover:h-fit'>
            {description}
          </p>
        ) : (
          <p></p>
        )}
        <p aria-label='task priority' className='border-solid md:border-r-2 border-white pl-2'>
          {priority === 'high' ? <span>High Priority</span> : <span>Low Priority</span>}
        </p>
        {completed ? (
          <div className='grid grid-cols-3 place-items-center p-2 md:p-0'>
          <button
            aria-label='task completed button'
            className='col-span-2 w-2/3 md:w-fit ml-2 border-solid border-2 border-white rounded bg-green-400 hover:bg-green-600 px-2 text-sm lg:text-base'
            onClick={handleComplete}
          >
            Completed
          </button>
          <button
          aria-label='task clear button'
          className='col-span-1 md:w-fit border-solid border-2 border-white rounded bg-red-400 hover:bg-red-600 px-2 text-sm lg:text-base'
           onClick={handleDelete}>Clear</button>
          </div>
        ) : (
          <div className='grid grid-cols-3 place-items-center p-2 md:p-0'>
          <button
            aria-label='task outstanding button'
            className='col-span-2 w-2/3 md:w-fit px-2 ml-2 border-solid border-2 border-white rounded bg-red-400 hover:bg-red-600 text-sm lg:text-base'
            onClick={handleComplete}
          >
            Outstanding
          </button>
          <button className='col-span-1 justify-self-center' onClick={handleEdit}>
            <MdEdit aria-label='edit task icon'/>
          </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
