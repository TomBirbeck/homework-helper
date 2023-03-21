import { FunctionComponent, useEffect, useState } from 'react';
import { Task, UpdatedTasks } from '../../Types';
import EditTaskForm from '../EditTaskForm';
import TaskList from '../TasksList';

const Tasks: FunctionComponent<{ tasks: Task[], getTasks: Function  }> = ({ tasks, getTasks }) => {
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth)
  const [editOpen, setEditOpen] = useState(false)
  const [updatedTask, setUpdatedTask] = useState({
    id: 0,
    subject: '',
    topic: '',
    description: '',
    due: '',
    priority: '',
    completed: false,
  });

  const updateTask = async (task: UpdatedTasks) => {
    const updatedTask = {subject: task.subject, topic: task.topic, description: task.description, due: task.due, priority: task.priority, completed: task.completed}
    let res = await fetch(`https://homeworkhelper.onrender.com/tasks/${task.id}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    }
  )
  let result = await res.json()
  setEditOpen(false)
  getTasks()
return result
  }

  useEffect(()=>{
    const handleResizeWindow = () => setWindowSize(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  },[])

  const sortComplete = (task:Task) => {
    if (task.completed === false){
      return 1
    } else {
      return 0
    }
  }
  const sortPrio = (task:Task) => {
    if (task.priority === 'high'){
      return 1
    } else {
      return 0
    }
  }

  return (
    <>
    {editOpen &&
    <EditTaskForm 
    updateTask={updateTask}
    setEditOpen={setEditOpen}
    id={updatedTask.id}
    subject={updatedTask.subject} 
    topic={updatedTask.topic} 
    description={updatedTask.description || ''}
    due={updatedTask.due}
    priority={updatedTask.priority}
    completed={updatedTask.completed}
    />
}
      {windowSize > 762 && <div aria-label='tasks headers' className='grid grid-cols-6 w-full mb-2 border-solid border-b-2 border-white pl-2'>
        <h2 aria-label='tasks subject header' className='font-bold text-2xl text-center text-white font-mono'>
          Subject
        </h2>
        <h2 aria-label='tasks topic header' className='font-bold text-2xl text-center text-white font-mono'>
          Topic
        </h2>
        <h2 aria-label='tasks due header' className='font-bold text-2xl text-center text-white font-mono'>
          Due
        </h2>
        <h2 aria-label='tasks description header' className='font-bold text-2xl text-center text-white font-mono'>
          Description
        </h2>
        <h2 aria-label='tasks priority header' className='font-bold text-2xl text-center text-white font-mono'>
          Priority
        </h2>
        <h2 aria-label='tasks completed header' className='font-bold text-2xl col-center-5 text-center text-white font-mono'>
          Completed ?
        </h2>
      </div>}
      {tasks &&
        tasks.sort((a,b)=>sortPrio(b)-sortPrio(a)).sort((a,b)=>sortComplete(b)-sortComplete(a)).map((task: Task, index: any) => {
          return (
            <TaskList
              key={index}
              taskId={task.task_id}
              subject={task.subject}
              topic={task.topic}
              due={task.due}
              description={task.description}
              priority={task.priority}
              completed={task.completed}
              editOpen={editOpen}
              setEditOpen={setEditOpen}
              updatedTask={updatedTask}
              setUpdatedTask={setUpdatedTask}
              windowSize={windowSize}
            />
          );
        })}
    </>
  );
};

export default Tasks;
