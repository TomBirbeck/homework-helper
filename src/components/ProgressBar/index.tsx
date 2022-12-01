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
        <div className='w-full h-10 bg-red-500 mt-4 border-solid border-2 border-black'>
            {progress <=20 ? 
            <div className="flex h-full w-1/5 bg-green-500">
                <span className="w-full h-full flex items-center justify-center">20%</span>
                </div> : progress <= 40? 
                <div className="h-full w-2/5 bg-green-500">
                    <span className="w-full h-full flex items-center justify-center">40%</span>
                    </div>: progress <= 60? 
                    <div className="h-full w-3/5 bg-green-500">
                        <span className="w-full h-full flex items-center justify-center">60%</span>
                        </div> : progress < 100? 
                        <div className="h-full w-4/5 bg-green-500">
                            <span className="w-full h-full flex items-center justify-center">80%</span>
                            </div> : progress === 100? 
                            <div className="h-full w-35/5 bg-green-500">
                                <span className="w-full h-full flex items-center justify-center">100%</span></div>  : null
            }
        </div>
    ) 
}

export default ProgressBar