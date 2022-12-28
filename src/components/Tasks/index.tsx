import { FunctionComponent, useState } from 'react';
import { Task } from '../../Types';
import EditTaskForm from '../EditTaskForm';
import TaskList from '../TasksList';

interface Tasks {
  task_id: number;
  subject: string;
  topic: string;
  due: string;
  description?: string | undefined;
  completed: boolean;
}
interface UpdatedTasks {
  id: number;
  subject: string;
  topic: string;
  due: string;
  description?: string | undefined;
  completed: boolean;
}

const Tasks: FunctionComponent<{ tasks: Task[], getTasks: Function  }> = ({ tasks, getTasks }) => {
  const [editOpen, setEditOpen] = useState(false)
  const [updatedTask, setUpdatedTask] = useState({
    id: 0,
    subject: '',
    topic: '',
    description: '',
    due: '',
    completed: false,
  });

  const updateTask = async (task: UpdatedTasks) => {
    const updatedTask = {subject: task.subject, topic: task.topic, description: task.description, due: task.due, completed: task.completed}
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


  return (
    <>
    {editOpen &&
    <EditTaskForm 
    updateTask={updateTask}
    id={updatedTask.id}
    subject={updatedTask.subject} 
    topic={updatedTask.topic} 
    description={updatedTask.description || ''}
    due={updatedTask.due}
    completed={updatedTask.completed}
    />
}
      <div className='grid grid-cols-5 w-full mb-2 border-solid border-b-2 border-white pl-2'>
        <h2 className='font-bold text-2xl text-center text-white font-mono'>
          Subject
        </h2>
        <h2 className='font-bold text-2xl text-center text-white font-mono'>
          Topic
        </h2>
        <h2 className='font-bold text-2xl text-center text-white font-mono'>
          Due
        </h2>
        <h2 className='font-bold text-2xl text-center text-white font-mono'>
          Description
        </h2>
        <h2 className='font-bold text-2xl col-center-5 text-center text-white font-mono'>
          Completed ?
        </h2>
      </div>

      {tasks &&
        tasks.map((task: Task, index: any) => {
          return (
            <TaskList
              key={index}
              taskId={task.task_id}
              subject={task.subject}
              topic={task.topic}
              due={task.due}
              description={task.description}
              completed={task.completed}
              editOpen={editOpen}
              setEditOpen={setEditOpen}
              updatedTask={updatedTask}
              setUpdatedTask={setUpdatedTask}
            />
          );
        })}
    </>
  );
};

export default Tasks;
