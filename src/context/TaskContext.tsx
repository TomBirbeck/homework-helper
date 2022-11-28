import { createContext, ReactNode} from "react";
import {Task} from '../Types'

const TaskContext = createContext({} as Task[])

type TaskProviderProps = {
    children: ReactNode;
  };

export default function TaskContextProvider ({children}: TaskProviderProps) {

    return (
        <TaskContext.Provider value={[]}/>
    )
}