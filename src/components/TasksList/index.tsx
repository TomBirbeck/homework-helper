import { FunctionComponent, ReactElement } from "react"
import { Listprops } from "../../Types"

const TaskList: FunctionComponent<{props: Listprops[]}> = ({props}) => {
    return (
        <>
        {props.map((prop)=>{return (
            <div>
                <h1>{prop.subject}</h1>
                <h2>{prop.topic}</h2>
                <h3>{prop.due}</h3>
            </div>
        )})}
        </>
    )
}

export default TaskList