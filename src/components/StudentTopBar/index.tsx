import { useState } from "react"
import LogoutButton from "../LogoutButton"

interface BarIProps  {
    student_code: String | undefined
}

const StudentTopBar = ({student_code} : BarIProps) => {
    const [showCode, setShowCode] = useState(false)
    return (
        <div className="flex justify-between">
            <LogoutButton/>
            <div className="flex flex-col">
                <span onClick={()=>{setShowCode(!showCode)}} className='border solid-2 border-white rounded-md bg-green-400 px-2 py-0.5 text-white'>Show Student Code</span>
                {showCode && <span className="border solid-2 rounded-md px-2 bg-white">{student_code}</span>}
            </div>
        </div>
    )
}

export default StudentTopBar