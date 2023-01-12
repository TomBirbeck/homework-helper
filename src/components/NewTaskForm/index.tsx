import { ChangeEvent, useState } from 'react';

type formProps = {
  createTask: Function;
};

const NewTaskForm = ({ createTask}: formProps) => {
  const [newTask, setNewTask] = useState({
    subject: '',
    topic: '',
    description: '',
    due: '',
    priority: '',
    completed: false,
  });

  const handleSubject = (e: ChangeEvent<HTMLInputElement>) => {
  // const handleSubject = (e: any) => {
    e.preventDefault();
    const subject = e.target.value;
    setNewTask({
      ...newTask,
      subject: subject,
    });
  };
  const handleTopic = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const topic = e.target.value;
    setNewTask({
      ...newTask,
      topic: topic,
    });
  };
  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const desc = e.target.value;
    setNewTask({
      ...newTask,
      description: desc,
    });
  };
  const handledue = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const due = e.target.value;
    setNewTask({
      ...newTask,
      due: due,
    });
  };
  const handlePrio = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const prio = e.target.value;
    setNewTask({
        ...newTask,
      priority: prio,
    });
  };

  return (
    <div 
    className='flex flex-col justify-center items-center mb-8 md:absolute md:translate-x-1/2 z-20' >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createTask(newTask);
          setNewTask({
            subject: '',
            topic: '',
            description: '',
            due: '',
            priority:'',
            completed: false,
          });
        }}
        // className='w-1/2 h-60 grid grid-flow-row-dense grid-cols-3 border-solid rounded-lg border-2 border-black bg-yellow-300 space-around p-2 my-2'
        className='w-full h-fit md:h-80 grid grid-cols-1 md:grid-cols-3 bg-none backdrop-blur-sm md:backdrop-blur-md border-solid border-2 border-opacity-10 border-white rounded-lg text-white space-around p-2 md:pl-6 my-2'
      >
        <label htmlFor='subject' className='col-span-3 md:col-span-1 place-self-start'>
          Subject:
          <input
            required
            type='text'
            value={newTask.subject}
            className='border-solid border-2 border-white col-span-1 md:w-32 md:mr-4 ml-2 h-7 bg-transparent pl-1 pb-1 text-white'
            placeholder='subject'
            onChange={handleSubject}
          ></input>
        </label>
        <label htmlFor='topic' className='col-span-3 md:col-span-1 place-self-start'>
          Topic: 
          <input
            type='text'
            value={newTask.topic}
            className='border-solid border-2 border-white col-span-1 md:w-32 ml-6 md:ml-2 mt-1 md:mt-0 h-7 bg-transparent pl-1 pb-1 text-white'
            placeholder='topic'
            onChange={handleTopic}
          ></input>
        </label>
        <label htmlFor='date' className='col-span-3 md:col-span-1 place-self-start'>
          Due:
          <input
            type='date'
            value={newTask.due}
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
            value={newTask.description}
            placeholder='description'
            onChange={handleDescription}
          ></textarea>
        </label>
        <button
          className='bg-green-400 text-white w-24 border-solid border-2 border-white h-8 rounded col-span-3 place-self-center md:place-self-end hover:bg-green-600'
          type='submit'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewTaskForm;
