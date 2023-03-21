export type Task = {
  task_id: number;
  subject: string;
  topic: string;
  due: string;
  description: string;
  priority: string;
  completed: boolean;
  deleted: boolean;
};

export interface UpdatedTasks {
  id: number;
  subject: string;
  topic: string;
  due: string;
  description?: string | undefined;
  priority: string;
  completed: boolean;
}

export type Student = {
  student_id: Number;
  firstname: string;
  surname: string;
  studentEmail: string;
  student_code: string;
}

export type Parent = {
  parentId: Number;
      firstname: string;
      surname: string;
      parentEmail: string;
      childId: string;
}

export type ParentTask = {
  task_id: Number;
  subject: string;
  topic: string;
  description: string;
  due: string;
  completed: Boolean;
  creator_id: Number;
};

export interface ParentTaskIprops {
  id: Number;
  subject: string;
  topic: string;
  due: string;
  completed: Boolean;
}

export type API = {
  task_id: number;
  subject: string;
  topic: string;
  due: string;
  description: string;
  priority: string;
  completed: boolean;
  deleted: boolean;
}

export type newFormProps = {
  createTask: Function;
};

export type formProps = {
  updateTask: Function;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id:number;
  subject: string,
    topic: string,
    description: string,
    due: string,
    priority: string,
    completed: boolean,
};

export type UserProps = {
  email: String | undefined;
  firstname: String;
  surname: String;
  child_id: String;
  role: String
}

export type SignUpIProps = {
setPerson: React.Dispatch<React.SetStateAction<string>>
}

export interface SidemenuIProps {
  firstname: string;
  surname: string;
  studentId?: Number;
  parentId?: Number;
  studentCode: string;
  email?: string;
}

export interface ProgressIProps {
  progress: number;
  total: number;
}

export interface TaskListIprops {
  taskId: number;
  subject: string;
  topic: string;
  description: string;
  due: string;
  priority: string;
  completed: boolean;
  editOpen: boolean;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>
  updatedTask: {
    id: number;
    subject: string;
    topic: string;
    description: string;
    priority: string;
    due: string;
    completed: boolean;
  }
  setUpdatedTask: React.Dispatch<React.SetStateAction<{
    id: number;
    subject: string;
    topic: string;
    description: string;
    due: string;
    priority: string;
    completed: boolean;
}>>
windowSize: number
}