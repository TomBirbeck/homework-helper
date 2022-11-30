import { useState } from "react"

const ProgressBar = () => {
    const [progress, setProgress] = useState<Number>(0)
    // const [bgColor, setBgColor] = useState<String>("red-500")
    const [completed, setCompleted] = useState<Array<Number>>([1,2])
    return(
        <div className='w-60 h-10 bg-red-500'>
            {completed.length === 2 && 
            <span className="h-10 w-1/10 bg-green-500">hey</span>
            }
        </div>
    ) 
}

export default ProgressBar