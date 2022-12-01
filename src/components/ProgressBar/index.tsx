import { useEffect, useState } from "react"

const tasks = [1,2,3,4,5,6,7,8,9,10]

const ProgressBar = () => {
    const [progress, setProgress] = useState<Number>(0)
    // const [bgColor, setBgColor] = useState<String>("red-500")
    const [completed, setCompleted] = useState<Array<Number>>([1,2])
    
    const percentage = (tasks: Array<any>, completed:Array<any>) => {
        const percent = (completed.length/tasks.length)*100
        setProgress(percent)
    }

    console.log(progress)

    useEffect(()=>{
        percentage(tasks, completed)

    },[])

    return(
        <div className='w-full h-10 bg-red-500'>
            {progress <=20 ? 
            <div className="flex h-10 w-1/5 bg-green-500"><span>20%</span></div> : progress <= 40? <div className="h-10 w-2/5 bg-green-500"><span>40%</span></div>: progress <= 60? <div className="h-10 w-3/5 bg-green-500"><span>60%</span></div> : progress < 100? <div className="h-10 w-4/5 bg-green-500"><span>80%</span></div> : progress === 100? <div className="h-10 w-35/5 bg-green-500"><span>100%</span></div>  : null
            }
        </div>
    ) 
}

export default ProgressBar