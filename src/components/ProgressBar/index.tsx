import { useEffect, useState } from 'react';
import { ProgressIProps } from '../../Types';


const ProgressBar = ({ progress, total }: ProgressIProps) => {
  
  const [progressed, setProgressed] = useState<number>(0);

  const percentage = (tasks: number, completed: number) =>  {
    const percent = Math.round((completed / tasks) * 100);
    setProgressed(percent);
  };

  useEffect(() => {
    percentage(total, progress);
  }, [total, progress]);

  return (
    <>
      <h3 className='font-bold md:text-2xl text-center text-white font-mono my-4'>
        Progress
      </h3>
      <div aria-label='progress bar' className='w-full h-6 bg-red-400 mt-4 border-solid border-2 border-white rounded-lg'>
        {progressed > 0 ?
      <div style={{width:`${progressed}%`}}className='flex h-full bg-green-400 border-none rounded-l-md transition-all duration-1000'>
                <span className='w-full h-full flex items-center justify-center text-white text-xl'>
                  {progressed}% 
                </span>
              </div> :
              <span className='w-full h-full flex items-center justify-center text-white text-xl'>
              0%
            </span>
               }
              </div>
    </>
  );
};

export default ProgressBar;
