import { ChangeEvent, useState } from 'react';

type formProps = {
  updateTask: Function;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id:number;
  subject: string,
    topic: string,
    description: string,
    due: string,
    priority: string,
    completed: boolean,
};

const EditTaskForm = ({updateTask, setEditOpen, id, subject, topic, description, due, priority, completed}: formProps) => {
  const [updatedTask, setUpdatedTask] = useState({
    id: id,
    subject: subject,
    topic: topic,
    description: description,
    due: due,
    priority: priority,
    completed: completed,
  });

  const handleSubject = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const subject = e.target.value;
    setUpdatedTask({
      ...updatedTask,
      subject: subject,
    });
  };
  const handleTopic = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const topic = e.target.value;
    setUpdatedTask({
        ...updatedTask,
      topic: topic,
    });
  };
  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const desc = e.target.value;
    setUpdatedTask({
        ...updatedTask,
      description: desc,
    });
  };
  const handledue = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const due = e.target.value;
    setUpdatedTask({
        ...updatedTask,
      due: due,
    });
  };
  const handlePrio = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const prio = e.target.value;
    setUpdatedTask({
        ...updatedTask,
      priority: prio,
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
            priority: '',
            completed: false,
          });
        }}
        // className='w-1/2 h-60 grid grid-flow-row-dense grid-cols-3 border-solid rounded-lg border-2 border-black bg-yellow-300 space-around p-2 my-2'
        className='z-20 w-full md:w-fit mb:w-1/2 h-fit md:h-60 grid grid-cols-1 md:grid-cols-3 bg-none backdrop-blur-sm border-solid border-2 border-opacity-10 border-white rounded-lg text-white space-around p-2 mb:p-6 my-2'
      >
        <label htmlFor='subject' className='col-span-3 md:col-span-1 place-self-start'>
          Subject:
          <input
            required
            type='text'
            value={updatedTask.subject}
            className='border-solid border-2 border-white col-span-1 md:w-32 md:mr-4 ml-2 h-7 bg-transparent pl-1 pb-1 text-white'
            placeholder='subject'
            onChange={handleSubject}
          ></input>
        </label>
        <label htmlFor='topic' className='col-span-3 md:col-span-1 place-self-start'>
          Topic:
          <input
            type='text'
            value={updatedTask.topic}
            className='border-solid border-2 border-white col-span-1 md:w-32 ml-6 md:ml-2 mt-1 md:mt-0 h-7 bg-transparent pl-1 pb-1 text-white'
            placeholder='topic'
            onChange={handleTopic}
          ></input>
        </label>
        <label htmlFor='date' className='col-span-3 md:col-span-1 place-self-start'>
          Due:
          <input
            type='date'
            value={updatedTask.due}
            className='border-solid border-2 border-white col-span-1 w-32 ml-8 md:ml-2 mt-1 md:mt-0 h-7 bg-transparent pl-1 pb-1 text-white'
            onChange={handledue}
          ></input>
        </label>
        <select name='priority' onChange={handlePrio} onBlur={handlePrio} className='border-solid border-2 border-white mt-1 md:mt-0 h-7 text-black md:place-self-center'>
          <option value='low'>
            Task Priority
          </option>
          <option value='high'>High</option>
          <option value='low'>Low</option>
          </select>
        <label htmlFor='description' className='flex flex-wrap gap-1 col-span-3 md:col-span-2'>
          Description:
          <textarea
            className='border-solid border-2 border-white w-full md:w-11/12 bg-transparent mb-1 md:mb-0 pl-1 pb-1 text-white md:place-items-start'
            value={updatedTask.description}
            placeholder='description'
            onChange={handleDescription}
          ></textarea>
        </label>
        <span className='grid col-span-3 grid-cols-2 place-items-center md:place-items-end w-3/5 md:w-2/5 place-self-end'>
        <button
          className='bg-green-400 text:sm mb:text-base text-white w-24 border-solid border-2 border-white h-8 rounded px-1 hover:bg-green-600'
          type='submit'
        >
          Submit
        </button>
            <button  className='bg-red-400 text:sm mb:text-base text-white w-24 border-solid border-2 border-white h-8 rounded px-1 hover:bg-red-600' onClick={()=>{setEditOpen(false)}}> Cancel</button>
        </span>
      </form>
    </div>
  );
};

export default EditTaskForm;