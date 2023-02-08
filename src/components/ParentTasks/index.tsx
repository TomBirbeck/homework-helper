import { FunctionComponent } from 'react';
import { ParentTask } from '../../Types';
import ParentTaskList from '../ParentTaskList';

const ParentTasks: FunctionComponent<{ tasks: ParentTask[] }> = ({ tasks }) => {
  return (
    <>
      <div aria-label='tasks headers' className='grid grid-cols-4 w-full mb-2 px-3 border-solid border-b-2 border-white pl-2'>
        <h2 aria-label='tasks subject header' className='font-bold text-sm md:text-2xl text-center text-white font-mono'>
          Subject
        </h2>
        <h2 aria-label='tasks topic header' className='font-bold text-sm md:text-2xl text-center text-white font-mono'>
          Topic
        </h2>
        <h2 aria-label='tasks due date header' className='font-bold text-sm md:text-2xl text-center text-white font-mono'>
          Due
        </h2>
        <h2 aria-label='tasks completed header' className='font-bold text-sm md:text-2xl col-center-5 text-center text-white font-mono ml-4 '>
          Completed?
        </h2>
      </div>

      {tasks &&
        tasks.map((task: ParentTask,) => {
          return (
            <ParentTaskList
              key={Number(task.task_id)}
              id={task.task_id}
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
