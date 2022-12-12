import { FunctionComponent } from 'react';
import { Task } from '../../Types';
import TaskList from '../TasksList';

interface Tasks {
  task_id: Number;
  subject: String;
  topic: String;
  due: String;
  description?: String;
  completed: Boolean;
}

const Tasks: FunctionComponent<{ tasks: Task[]  }> = ({ tasks }) => {
  return (
    <>
      <div className='grid grid-cols-5 w-full mb-2 border-solid border-b-2 border-white pl-2'>
        <h2 className='font-bold text-2xl text-center text-yellow-300 font-mono'>
          Subject
        </h2>
        <h2 className='font-bold text-2xl text-center text-yellow-300 font-mono'>
          Topic
        </h2>
        <h2 className='font-bold text-2xl text-center text-yellow-300 font-mono'>
          Due
        </h2>
        <h2 className='font-bold text-2xl text-center text-yellow-300 font-mono'>
          Description
        </h2>
        <h2 className='font-bold text-2xl col-center-5 text-center text-yellow-300 font-mono'>
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
            />
          );
        })}
    </>
  );
};

export default Tasks;
