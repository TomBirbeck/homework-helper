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
            ) : progressed <= 9 ? (
              <div className='flex h-full w-1/12 bg-green-400 border-none rounded-l-md'>
                <span className='w-full h-full flex items-center justify-center text-white text-2xl'>
                  8%
                </span>
              </div>
            ): progressed < 17 ? (
          <div className='flex h-full w-2/12 bg-green-400 border-none rounded-l-md'>
            <span className='w-full h-full flex items-center justify-center text-white text-2xl'>
              17%
            </span>
          </div>
        ): progressed < 26 ? (
          <div className='flex h-full w-3/12 bg-green-400 border-none rounded-l-md'>
            <span className='w-full h-full flex items-center justify-center text-white text-2xl'>
              25%
            </span>
          </div>
         ) : progressed < 34 ? (
          <div className='flex h-full w-4/12 bg-green-400 border-none rounded-l-md'>
            <span className='w-full h-full flex items-center justify-center text-white text-2xl'>
              33%
            </span>
          </div>
         ) : progressed <= 42 ? (
          <div className='h-full w-5/12 bg-green-400 border-none rounded-l-md'>
            <span className='w-full h-full flex items-center justify-center text-white text-2xl'>
              42%
            </span>
          </div>
        ) : progressed <= 50 ? (
          <div className='h-full w-6/12 bg-green-400 border-none rounded-l-md'>
            <span className='w-full h-full flex items-center justify-center text-white text-2xl'>
              50%
            </span>
          </div>
        ) : progressed <= 59 ? (
          <div className='flex h-full w-7/12 bg-green-400 border-none rounded-l-md'>
            <span className='w-full h-full flex items-center justify-center text-white text-2xl'>
              58%
            </span>
          </div> 
        ) : progressed <= 67 ? (
          <div className='flex h-full w-8/12 bg-green-400 border-none rounded-l-md'>
            <span className='w-full h-full flex items-center justify-center text-white text-2xl'>
              66%
            </span>
          </div>
        ) : progressed <= 75 ? (
          <div className='flex h-full w-9/12 bg-green-400 border-none rounded-l-md'>
            <span className='w-full h-full flex items-center justify-center text-white text-2xl'>
              75%
            </span>
          </div>
        ) : progressed <= 84 ? (
          <div className='flex h-full w-10/12 bg-green-400 border-none rounded-l-md'>
            <span className='w-full h-full flex items-center justify-center text-white text-2xl'>
              83%
            </span>
          </div> 
        ) : progressed <= 93 ? (
          <div className='flex h-full w-11/12 bg-green-400 border-none rounded-l-md'>
            <span className='w-full h-full flex items-center justify-center text-white text-2xl'>
              92%
            </span>
          </div> 
        ) : progressed === 100 ? (
          <div className='h-full w-12/12 bg-green-400 border-none rounded-md'>
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
