import { useEffect, useState } from 'react';

interface ProgressIProps {
  progress: number;
  total: number;
}

const ProgressBar = ({ progress, total }: ProgressIProps) => {
  const [progressed, setProgressed] = useState<Number>(0);
  // const [bgColor, setBgColor] = useState<String>("red-500")
  // const [completed, setCompleted] = useState<Array<Number>>([1,2])

  console.log('total', total);

  const percentage = (tasks: number, completed: number) => {
    const percent = (completed / tasks) * 100;
    setProgressed(percent);
    console.log('progress ran');
  };

  useEffect(() => {
    percentage(total, progress);
  }, [progress]);

  return (
    <>
      <h3 className='font-bold text-2xl text-center text-yellow-300 font-mono my-2'>
        Progress
      </h3>
      <div className='w-full h-10 bg-red-500 mt-4 border-solid border-2 border-black rounded-lg'>
        {progressed <= 20 ? (
          <div className='flex h-full w-1/5 bg-green-500 border-none rounded-l-md'>
            <span className='w-full h-full flex items-center justify-center'>
              20%
            </span>
          </div>
        ) : progressed <= 40 ? (
          <div className='h-full w-2/5 bg-green-500 border-none rounded-l-md'>
            <span className='w-full h-full flex items-center justify-center'>
              40%
            </span>
          </div>
        ) : progressed <= 60 ? (
          <div className='h-full w-3/5 bg-green-500 border-none rounded-l-md'>
            <span className='w-full h-full flex items-center justify-center'>
              60%
            </span>
          </div>
        ) : progressed < 100 ? (
          <div className='h-full w-4/5 bg-green-500 border-none rounded-l-md'>
            <span className='w-full h-full flex items-center justify-center'>
              80%
            </span>
          </div>
        ) : progressed === 100 ? (
          <div className='h-full w-35/5 bg-green-500 border-none rounded-md'>
            <span className='w-full h-full flex items-center justify-center'>
              100%
            </span>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ProgressBar;
