import { FunctionComponent } from "react"
import { Task } from "../../Types"
import TaskList from "../TasksList"

const Tasks: FunctionComponent<{tasks: Task[]}> = ({tasks}) =>{
    return (
        <>
        {
            tasks.map((task) => {return (
            <TaskList
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