import { FunctionComponent } from "react"
import { Task } from "../../Types"
import TaskList from "../TasksList"

interface Tasks {
        task_id: Number,
        subject: String,
        topic: String,
        due: String,
        description?: String,
        completed: Boolean
}

const Tasks: FunctionComponent<{tasks : Task[]}> = ({tasks}) =>{
    console.log("taskid in tasks", tasks[0].task_id)
    return (
        <>
        <div className="grid grid-cols-5 w-full mb-2 border-solid border-b-2 border-black">
        <h2 className="font-bold text-lg">Subject</h2>
        <h2 className="font-bold text-lg">Topic</h2>
        <h2 className="font-bold text-lg">Due</h2>
        <h2 className="font-bold text-lg">Description</h2>
        <h2 className="font-bold text-lg col-center-5">Completed?</h2>
        </div>

        {tasks && 
            tasks.map((task: Task, index: any) => {return (
            <TaskList
                key={index}
                taskId={task.task_id}
                subject={task.subject}
                topic={task.topic}
                due={task.due}
                description={task.description}
                completed={task.completed}/>)
            })
        }
        </>
    )
    
}

export default Tasks