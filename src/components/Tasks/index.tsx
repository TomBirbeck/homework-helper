import { FunctionComponent } from "react"
import { Task } from "../../Types"
import TaskList from "../TasksList"

const Tasks: FunctionComponent<{tasks: Task[]}> = ({tasks}) =>{
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