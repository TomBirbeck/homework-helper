import { createContext, useContext} from "react";


const studentContext = createContext<Number>(0)

export function useStudentContext() {
  return useContext(studentContext);
}

export default useStudentContext

