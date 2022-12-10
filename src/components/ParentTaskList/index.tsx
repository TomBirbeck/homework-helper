import { FunctionComponent } from 'react';

interface Iprops {
  subject: String;
  topic: String;
  due: String;
  completed: Boolean;
}

const ParentTaskList: FunctionComponent<Iprops> = (props) => {
  // const [complete, setComplete] = useState<Boolean>(false);
  const { subject, topic, due, completed } = props;

  return (
    <div className='flex justify-between gap- w-full p-2 mb-1.5 bg-yellow-300 border-none rounded-lg'>
      <div className='grid grid-cols-4 justify-between w-full'>
        <p className='border-solid border-r-2 border-purple-800 pl-2'>
          {subject}
        </p>
        <p className='border-solid border-r-2 border-purple-800 pl-2'>
          {topic}
        </p>
        <p className='border-solid border-r-2 border-purple-800 pl-2'>{due}</p>
        {completed ? (
          <p className='ml-2 text-center bg-green-600'>Completed</p>
        ) : (
          <p className='ml-2 text-center bg-red-600'>Outstanding</p>
        )}
      </div>
    </div>
  );
};

export default ParentTaskList;