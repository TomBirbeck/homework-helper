import { useState } from 'react';

type formProps = {
  createTask: Function;
};

const NewTaskForm = ({ createTask }: formProps) => {
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
    <div className='flex flex-col justify-center items-center mb-4'>
      <h3 className='font-bold text-2xl text-center text-yellow-300 font-mono my-3'>
        Add new homework task
      </h3>
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
        className='w-1/2 h-60 grid grid-flow-row-dense grid-cols-3 border-solid rounded-lg border-2 border-black bg-yellow-300 space-around p-2 my-2'
      >
        <label htmlFor='subject' className='flex gap-1'>
          Subject:
          <input
            required
            type='text'
            value={newTask.subject}
            className='border-solid border-2 border-black w-24 h-7 bg-slate-50 p-1'
            placeholder='subject'
            onChange={handleSubject}
          ></input>
        </label>
        <label htmlFor='topic' className='flex gap-1'>
          Topic:
          <input
            type='text'
            value={newTask.topic}
            className='border-solid border-2 border-black w-24 h-7 bg-slate-50 p-1'
            placeholder='topic'
            onChange={handleTopic}
          ></input>
        </label>
        <label htmlFor='date' className='flex gap-1'>
          Due:
          <input
            type='date'
            value={newTask.due}
            className='border-solid border-2 border-black w-32 h-7 bg-slate-50 p-1'
            onChange={handledue}
          ></input>
        </label>
        <label htmlFor='description' className='flex gap-1 col-span-2'>
          Description:
          <textarea
            className='border-solid border-2 border-black w-3/4 bg-slate-50 p-1'
            value={newTask.description}
            placeholder='description'
            onChange={handleDescription}
          ></textarea>
        </label>
        <button
          className='bg-green-400 w-24 border-solid border-2 border-black h-8 rounded place-self-end'
          type='submit'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewTaskForm;
