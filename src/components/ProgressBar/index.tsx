import { useState } from "react"

const ProgressBar = () => {
    const [progress, setProgress] = useState<Number>(0)
    // const [bgColor, setBgColor] = useState<String>("red-500")
    const [completed, setCompleted] = useState<Array<Number>>([1,2,4])
    return(
        <div className='w-full h-10 bg-red-500'>
            {completed.length === 2 ? 
            <div className="h-10 w-1/6 bg-green-500"></div> : completed.length === 3 ? <div className="h-10 w-2/6 bg-green-500"></div> : null
            }
        </div>
    ) 
}

export default ProgressBar