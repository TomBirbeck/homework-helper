import { createContext } from "react";

const CompletedContext = createContext<[boolean, (completed: boolean) => void]>([false, () => {}])

export default CompletedContext