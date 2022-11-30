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
  console.log(open);
  return (
    <div className='flex justify-between gap-2 bg-slate-400'>
      <div className='flex w-1/2 justify-between'>
        <div className='flex flex-col gap-1'>
          <h2>Subject:</h2> <p>{subject}</p>
        </div>
        <h2 className='flex gap-2'>Topic: {topic}</h2>
        <h2 className='flex gap-2'>Due: {due}</h2>
        <button
          onClick={() => {
            setOpen(!open);
          }}
        >
          ^
        </button>
      </div>
      {open && <p>{description}</p>}
      {complete && <p>completed it mate!</p>}
      <button
        onClick={() => {
          setComplete(!complete);
        }}
      >
        Completed
      </button>
    </div>
  );
};

export default TaskList;
