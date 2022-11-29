import { FunctionComponent } from "react"
import { Task } from "../../Types"
import TaskList from "../TasksList"

interface Tasks {
        subject: String,
        topic: String,
        due: String,
        description?: String,
        completed: Boolean
}

const Tasks: FunctionComponent<{tasks : Task[]}> = ({tasks}) =>{
    return (
        <>
        {tasks && 
            tasks.map((task: Tasks, index: any) => {return (
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