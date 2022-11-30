import { useState } from 'react';
import Tasks from '../Tasks';
import list from '../../data/data';
import NewTaskForm from '../NewTaskForm';

const StudentHomepage = () => {
  const [tasks, setTasks] = useState<Array<any>>(list);

  return (
    <div>
      <h1>Hello ... student name here ... </h1>
      <NewTaskForm setTasks={setTasks} />
      <Tasks tasks={tasks} />
    </div>
  );
};

export default StudentHomepage;
