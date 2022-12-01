import { FunctionComponent, useState } from 'react';

interface Iprops {
  subject: String;
  topic: String;
  due: String;
  description?: String;
  completed: Boolean;
}

const TaskList: FunctionComponent<Iprops> = (props) => {
  const [complete, setComplete] = useState<Boolean>(false);
  const [open, setOpen] = useState<Boolean>(false);
  const { subject, topic, description, due, completed } = props;
  console.log("description", description);
  return (
    <div className='flex justify-between gap-2 w-full mb-1'>
      <div className='grid grid-cols-5 w-1/2 justify-between w-full'>
        <p>{subject}</p>
        <p>{topic}</p>
        <p>{due}</p>
        {description? <p className='truncate'>{description}</p>: <p></p>}
        { complete? <button
        className='w-1/2 border-solid border-2 border-black rounded bg-green-500'
        onClick={() => {
          setComplete(!complete);
        }}
      >
        Completed
      </button> : <button
      className=' w-1/2 border-solid border-2 border-black rounded bg-red-500'
        onClick={() => {
          setComplete(!complete);
        }}
      >
        Outstanding
      </button> }
        </div>
        {/* <button
          onClick={() => {
            setOpen(!open);
          }}
        >
          ^
        </button> */}
      {/* {open && <p>{description}</p>}
      {complete && <p>completed it mate!</p>} */}
      
    </div>
  );
};

export default TaskList;
