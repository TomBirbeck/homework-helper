import { useEffect, useState } from 'react';

interface ProgressIProps {
  progress: number;
  total: number;
}

const ProgressBar = ({ progress, total }: ProgressIProps) => {
  
  const [progressed, setProgressed] = useState<Number>(0);

  const percentage = (tasks: number, completed: number) => {
    const percent = (completed / tasks) * 100;
    setProgressed(percent);
  };

  useEffect(() => {
    percentage(total, progress);
  }, [total, progress]);

  return (
    <>
      <h3 className='font-bold text-2xl text-center text-white font-mono my-4'>
        Progress
      </h3>
      <div className='w-full h-10 bg-red-400 mt-4 border-solid border-2 border-white rounded-lg'>
        {progressed === 0 ? (
            <span className='w-full h-full flex items-center justify-center text-white text-2xl'>
              0%
            </span>
            ) : progressed <= 20 ? (
          <div className='flex h-full w-1/5 bg-green-400 border-none rounded-l-md'>
            <span className='w-full h-full flex items-center justify-center text-white text-2xl'>
              20%
            </span>
          </div>
        ) : progressed <= 40 ? (
          <div className='h-full w-2/5 bg-green-400 border-none rounded-l-md'>
            <span className='w-full h-full flex items-center justify-center text-white text-2xl'>
              40%
            </span>
          </div>
        ) : progressed <= 60 ? (
          <div className='h-full w-3/5 bg-green-400 border-none rounded-l-md'>
            <span className='w-full h-full flex items-center justify-center text-white text-2xl'>
              60%
            </span>
          </div>
        ) : progressed < 100 ? (
          <div className='h-full w-4/5 bg-green-400 border-none rounded-l-md'>
            <span className='w-full h-full flex items-center justify-center text-white text-2xl'>
              80%
            </span>
          </div>
        ) : progressed === 100 ? (
          <div className='h-full w-35/5 bg-green-400 border-none rounded-md'>
            <span className='w-full h-full flex items-center justify-center text-white text-2xl'>
              100%
            </span>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ProgressBar;
