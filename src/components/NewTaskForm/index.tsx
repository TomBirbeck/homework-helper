import { useState } from 'react';

type formProps = {
  createTask: Function;
};

const NewTaskForm = ({ createTask}: formProps) => {
  const [newTask, setNewTask] = useState({
    subject: '',
    topic: '',
    description: '',
    due: '',
    completed: false,
  });

  const handleSubject = (e: any) => {
    e.preventDefault();
    const subject = e.target.value;
    setNewTask({
      ...newTask,
      subject: subject,
    });
  };
  const handleTopic = (e: any) => {
    e.preventDefault();
    const topic = e.target.value;
    setNewTask({
      ...newTask,
      topic: topic,
    });
  };
  const handleDescription = (e: any) => {
    e.preventDefault();
    const desc = e.target.value;
    setNewTask({
      ...newTask,
      description: desc,
    });
  };
  const handledue = (e: any) => {
    e.preventDefault();
    const due = e.target.value;
    setNewTask({
      ...newTask,
      due: due,
    });
  };

  return (
    <div 
    className='flex flex-col justify-center items-center mb-8' >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createTask(newTask);
          setNewTask({
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
            value={newTask.subject}
            className='border-solid border-2 border-white w-24 h-7 bg-transparent pl-1 pb-1 text-white'
            placeholder='subject'
            onChange={handleSubject}
          ></input>
        </label>
        <label htmlFor='topic' className='flex gap-1'>
          Topic:
          <input
            type='text'
            value={newTask.topic}
            className='border-solid border-2 border-white w-24 h-7 bg-transparent pl-1 pb-1 text-white'
            placeholder='topic'
            onChange={handleTopic}
          ></input>
        </label>
        <label htmlFor='date' className='flex gap-1'>
          Due:
          <input
            type='date'
            value={newTask.due}
            className='border-solid border-2 border-white w-32 h-7 bg-transparent pl-1 pb-1 text-white'
            onChange={handledue}
          ></input>
        </label>
        <label htmlFor='description' className='flex gap-1 col-span-2'>
          Description:
          <textarea
            className='border-solid border-2 border-white w-3/4 bg-transparent pl-1 pb-1 text-white'
            value={newTask.description}
            placeholder='description'
            onChange={handleDescription}
          ></textarea>
        </label>
        <button
          className='bg-green-400 text-white w-24 border-solid border-2 border-white h-8 rounded place-self-end'
          type='submit'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewTaskForm;
