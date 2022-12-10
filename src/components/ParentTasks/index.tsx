import { FunctionComponent } from 'react';
import { ParentTask } from '../../Types';
import ParentTaskList from '../ParentTaskList';

const ParentTasks: FunctionComponent<{ tasks: ParentTask[] }> = ({ tasks }) => {
  return (
    <>
      <div className='grid grid-cols-4 w-full mb-2 border-solid border-b-2 border-white pl-2'>
        <h2 className='font-bold text-2xl text-center text-yellow-300 font-mono'>
          Subject
        </h2>
        <h2 className='font-bold text-2xl text-center text-yellow-300 font-mono'>
          Topic
        </h2>
        <h2 className='font-bold text-2xl text-center text-yellow-300 font-mono'>
          Due
        </h2>
        <h2 className='font-bold text-2xl col-center-5 text-center text-yellow-300 font-mono'>
          Completed ?
        </h2>
      </div>

      {tasks &&
        tasks.map((task: ParentTask, index: any) => {
          return (
            <ParentTaskList
              key={index}
              subject={task.subject}
              topic={task.topic}
              due={task.due}
              completed={task.completed}
            />
          );
        })}
    </>
  );
};

export default ParentTasks;
