export type Task = {
  task_id: number;
  subject: string;
  topic: string;
  due: string;
  description: string;
  priority: string;
  completed: boolean;
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
