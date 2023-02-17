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


export type ParentTask = {
  task_id: Number;
  subject: string;
  topic: string;
  description: string;
  due: string;
  completed: Boolean;
  creator_id: Number;
};

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

export type formProps = {
  createTask: Function;
};
