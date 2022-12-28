import { useState } from 'react';

type formProps = {
  updateTask: Function;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id:number;
  subject: string,
    topic: string,
    description: string,
    due: string,
    completed: boolean,
};

const EditTaskForm = ({updateTask, setEditOpen, id, subject, topic, description, due, completed}: formProps) => {
  const [updatedTask, setUpdatedTask] = useState({
    id: id,
    subject: subject,
    topic: topic,
    description: description,
    due: due,
    completed: completed,
  });

  const handleSubject = (e: any) => {
    e.preventDefault();
    const subject = e.target.value;
    setUpdatedTask({
      ...updatedTask,
      subject: subject,
    });
  };
  const handleTopic = (e: any) => {
    e.preventDefault();
    const topic = e.target.value;
    setUpdatedTask({
        ...updatedTask,
      topic: topic,
    });
  };
  const handleDescription = (e: any) => {
    e.preventDefault();
    const desc = e.target.value;
    setUpdatedTask({
        ...updatedTask,
      description: desc,
    });
  };
  const handledue = (e: any) => {
    e.preventDefault();
    const due = e.target.value;
    setUpdatedTask({
        ...updatedTask,
      due: due,
    });
  };

  return (
    <div 
    className='flex flex-col justify-center items-center mb-8' >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateTask(updatedTask);
          setUpdatedTask({
            id: 0,
            subject: '',
            topic: '',
            description: '',
            due: '',
            completed: false,
          });
        }}
        // className='w-1/2 h-60 grid grid-flow-row-dense grid-cols-3 border-solid rounded-lg border-2 border-black bg-yellow-300 space-around p-2 my-2'
        className='z-20 w-1/2 h-60 grid grid-flow-row-dense grid-cols-3 bg-none backdrop-blur-sm border-solid border-2 border-opacity-10 border-white rounded-lg text-white space-around p-6 my-2'
      >
        <label htmlFor='subject' className='flex gap-1'>
          Subject:
          <input
            required
            type='text'
            value={updatedTask.subject}
            className='border-solid border-2 border-black w-24 h-7 bg-transparent pl-1 pb-1 text-white'
            placeholder='subject'
            onChange={handleSubject}
          ></input>
        </label>
        <label htmlFor='topic' className='flex gap-1'>
          Topic:
          <input
            type='text'
            value={updatedTask.topic}
            className='border-solid border-2 border-black w-24 h-7 bg-transparent pl-1 pb-1 text-white'
            placeholder='topic'
            onChange={handleTopic}
          ></input>
        </label>
        <label htmlFor='date' className='flex gap-1'>
          Due:
          <input
            type='date'
            value={updatedTask.due}
            className='border-solid border-2 border-black w-32 h-7 bg-transparent pl-1 pb-1 text-white'
            onChange={handledue}
          ></input>
        </label>
        <label htmlFor='description' className='flex gap-1 col-span-2'>
          Description:
          <textarea
            className='border-solid border-2 border-black w-3/4 bg-transparent pl-1 pb-1 text-white'
            value={updatedTask.description}
            placeholder='description'
            onChange={handleDescription}
          ></textarea>
        </label>
        <span className='grid grid-cols-2 place-items-end gap-1'>
        <button
          className='bg-green-400 text-white w-24 border-solid border-2 border-black h-8 rounded'
          type='submit'
        >
          Submit
        </button>
            <button  className='bg-red-400 text-white w-24 border-solid border-2 border-black h-8 rounded' onClick={()=>{setEditOpen(false)}}> Cancel</button>
        </span>
      </form>
    </div>
  );
};

export default EditTaskForm;