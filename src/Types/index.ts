export type Task = {
  task_id: Number;
  subject: String;
  topic: String;
  due: String;
  description: String;
  completed: Boolean;
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
