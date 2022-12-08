import {useState } from 'react';

type formProps = {
  createTask: Function
}

const NewTaskForm = ({createTask}:formProps) => {
  const [newTask, setNewTask] = useState({subject:'', topic: '', description: '', due: '', completed: false})

  const handleSubject = (e: any) => {
    e.preventDefault()
    const subject = e.target.value
    setNewTask({
			...newTask,
			subject: subject,
		});
  }
  const handleTopic = (e: any) => {
    e.preventDefault()
    const topic = e.target.value
    setNewTask({
			...newTask,
			topic: topic,
		});
  }
  const handleDescription = (e: any) => {
    e.preventDefault()
    const desc = e.target.value
    setNewTask({
			...newTask,
			description: desc,
		});
  }
  const handledue = (e: any) => {
    e.preventDefault()
    const due = e.target.value
    setNewTask({
			...newTask,
			due: due,
		});
  }


  return (
    <div>
      Add new homework task
      <form
        onSubmit={
          (e) => {
            e.preventDefault()
            createTask(newTask)
            setNewTask({subject:'', topic: '', description: '', due: '', completed: false})
          }
        }
        className='w-1/2 h-60 grid grid-flow-row-dense grid-cols-3 border-solid border-2 border-black bg-orange-100 space-around p-1 rounded my-2'
      >
        <label htmlFor='subject' className='flex gap-1'>
          Subject:
          <input
            required
            type='text'
            value={newTask.subject}
            className='border-solid border-2 border-grey-700 w-24 h-7 bg-slate-50'
            placeholder='subject'
            onChange={handleSubject}
          ></input>
        </label>
        <label htmlFor='topic' className='flex gap-1'>
          Topic:
          <input
            type='text'
            value={newTask.topic}
            className='border-solid border-2 border-grey-700 w-24 h-7 bg-slate-50'
            placeholder='topic'
            onChange={handleTopic}
          ></input>
        </label>
        <label htmlFor='date' className='flex gap-1'>
          Due:
          <input
            type='date'
            value={newTask.due}
            className='border-solid border-2 border-grey-700 w-32 h-7 bg-slate-50'
            onChange={handledue}
          ></input>
        </label>
        <label htmlFor='description' className='flex gap-1 col-span-2'>
          Description:
          <textarea
            className='border-solid border-2 border-grey-700 w-3/4 bg-slate-50'
            value={newTask.description}
            placeholder='description'
            onChange={handleDescription}
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
