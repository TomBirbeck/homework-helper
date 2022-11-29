import { FunctionComponent } from "react"
import TaskList from "../TasksList"

interface Tasks {
        subject: String,
        topic: String,
        due: String,
        description?: String,
        completed: Boolean
}

const Tasks: FunctionComponent<Tasks[]> = (tasks: Tasks[]) =>{
    return (
        <>
        {
            tasks.map((task, index) => {return (
            <TaskList
                key={index}
                subject={task.subject}
                topic={task.topic}
                due={task.due}
                completed={task.completed}/>)
            })
        }
        </>
    )
}

export default Tasks