export type Task = {
  task_id: number;
  subject: string;
  topic: string;
  due: string;
  description: string;
  completed: boolean;
};


export type ParentTask = {
  task_id: Number;
  subject: String;
  topic: String;
  description: String;
  due: String;
  completed: Boolean;
  creator_id: Number;
};
