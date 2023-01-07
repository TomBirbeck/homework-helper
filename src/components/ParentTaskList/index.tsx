import { FunctionComponent } from 'react';
import reverseDate from '../Utilities/reverseDate';

interface Iprops {
  id: Number;
  subject: string;
  topic: string;
  due: string;
  completed: Boolean;
}

const ParentTaskList: FunctionComponent<Iprops> = (props) => {
  const { id, subject, topic, due, completed } = props;

  const deleteTask = async (id: Number) => {
    let res = await fetch(`https://homeworkhelper.onrender.com/tasks/${id}`, 
    {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
    let result = await res.json()
    // console.log("delete task parent", result)
  }

  return (
    <div className='flex justify-between bg-none backdrop-blur-sm border-solid border-2 border-opacity-10 border-white rounded-lg text-white text-sm md:text-base'>
      <div className='grid grid-cols-4 justify-between w-full'>
        <p className='border-solid border-r-2 border-white pl-2'>
          {subject}
        </p>
        <p className='border-solid border-r-2 border-white pl-2'>
          {topic}
        </p>
        <p className='border-solid border-r-2 border-white pl-2'>{reverseDate(due)}</p>
        {completed ? (
          <div className='grid grid-cols-1 md:grid-cols-2'>
            <p className='ml-2 text:xs text-center bg-green-400'>Completed</p>
            <button onClick={()=>{deleteTask(id)}} className='hover:bg-green-500'>Clear</button>
          </div>
        ) : (
          <p className='ml-2 text-center bg-red-400'>Outstanding</p>
        )}
      </div>
    </div>
  );
};

export default ParentTaskList;
