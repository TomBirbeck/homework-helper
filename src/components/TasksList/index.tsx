import { FunctionComponent, useState } from 'react';

interface Iprops {
  taskId: Number
  subject: String;
  topic: String;
  description?: String;
  due: String;
  completed: Boolean;
}

const TaskList: FunctionComponent<Iprops> = (props) => {
  const [complete, setComplete] = useState<Boolean>(false);
  const { taskId, subject, topic, description, due, completed } = props;

  console.log("props", props)


  
  const completeTask = async (id:Number) => {
    // console.log("taskid", taskId)
    let res = await fetch(`https://homeworkhelper.onrender.com/tasks/completed/${id}`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        let result = await res.json();
        console.log("task completed", result)
          // getTasks()
  }

  const handleComplete = () => {
    completeTask(taskId)
  }

  return (
    <div className='flex justify-between gap-3 w-full p-2 mb-1 bg-yellow-300 border-none rounded-lg'>
      <div className='grid grid-cols-5 w-1/2 justify-between w-full'>
        <p className='border-solid border-r-2 border-purple-800 pl-2'>{subject}</p>
        <p className='border-solid border-r-2 border-purple-800 pl-2'>{topic}</p>
        <p className='border-solid border-r-2 border-purple-800 pl-2'>{due}</p>
        {description? <p className='truncate border-solid border-r-2 border-purple-800 pl-2'>{description}</p>: <p></p>}
        { completed? <button
        className='ml-2 w-1/2 border-solid border-2 border-black rounded bg-green-500'
        onClick={handleComplete}
      >
        Completed
      </button> : <button
      className='ml-2 w-1/2 border-solid border-2 border-black rounded bg-red-500'
        onClick={handleComplete}
      >
        Outstanding
      </button> }
        </div>
    </div>
  );
};

export default TaskList;
