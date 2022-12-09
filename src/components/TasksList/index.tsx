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
    <div className='flex justify-between gap-2 w-full mb-1'>
      <div className='grid grid-cols-5 w-1/2 justify-between w-full'>
        <p>{subject}</p>
        <p>{topic}</p>
        <p>{due}</p>
        {description? <p className='truncate'>{description}</p>: <p></p>}
        { completed? <button
        className='w-1/2 border-solid border-2 border-black rounded bg-green-500'
        onClick={handleComplete}
      >
        Completed
      </button> : <button
      className=' w-1/2 border-solid border-2 border-black rounded bg-red-500'
        onClick={handleComplete}
      >
        Outstanding
      </button> }
        </div>
       {/* {!completed ? <button onClick={handleComplete}>outstading</button> : complete ? <button onClick={handleComplete}>completed</button> : null} */}
      
    </div>
  );
};

export default TaskList;
