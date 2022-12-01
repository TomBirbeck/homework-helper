import { useState } from 'react';
import list from '../../data/data';

interface FormIProps {
  setTasks: React.Dispatch<React.SetStateAction<any[]>>;
}

const NewTaskForm = ({ setTasks }: FormIProps) => {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [due, setDue] = useState('');

  const handleSubmit = () => {
    console.log(subject, topic, description, due.split('-').reverse().join('-'));
    setTasks([
      ...list,
      { subject: subject, topic: topic, description: description, due: due.split('-').reverse().join('-') },
    ]);
  };

  return (
    <div>
      Add new homework task
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className='w-1/2 h-60 grid grid-flow-row-dense grid-cols-3 border-solid border-2 border-black bg-orange-100 space-around p-1 rounded my-2'
      >
        <label htmlFor='subject' className='flex gap-1'>
          Subject:
          <input
            type='text'
            className='border-solid border-2 border-grey-700 w-24 h-7 bg-slate-50'
            value={subject}
            placeholder='subject'
            onChange={(e) => setSubject(e.target.value)}
          ></input>
        </label>
        <label htmlFor='topic' className='flex gap-1'>
          Topic:
          <input
            type='text'
            className='border-solid border-2 border-grey-700 w-24 h-7 bg-slate-50'
            value={topic}
            placeholder='topic'
            onChange={(e) => setTopic(e.target.value)}
          ></input>
        </label>
        <label htmlFor='date' className='flex gap-1'>
          Due:
          <input
            type='date'
            className='border-solid border-2 border-grey-700 w-32 h-7 bg-slate-50'
            value={due}
            onChange={(e) => setDue(e.target.value)}
          ></input>
        </label>
        <label htmlFor='description' className='flex gap-1 col-span-2'>
          Description:
          <textarea
            className='border-solid border-2 border-grey-700 w-3/4 bg-slate-50'
            value={description}
            placeholder='description'
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <button
          className='bg-green-400 w-24 border-solid border-2 border-black h-8 rounded m-2'
          type='submit'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewTaskForm;
