import { FunctionComponent, useState } from "react"
import Topic from "../Topics"

interface Iprops {
    subject: String,
    topic: String,
    due: String,
    description?: String,
    completed: Boolean
}

const TaskList: FunctionComponent<Iprops> = (props) => {
    const [complete, setComplete] = useState<Boolean>(false)
    const [open, setOpen] = useState<Boolean>(false)
    const {subject, topic, description, due, completed} = props
    return (
            <div className="flex gap-1">
                <h1>{subject}<button onClick={()=>{setOpen(!open)}}>^</button></h1>
                {
                    open && (
                        <>
                <Topic topic={topic} description={description} due={due}/>
                        </>
                    )
                }
                <button onClick={()=>{setComplete(!complete)}}>Completed</button>
            </div>
    )
}

export default TaskList