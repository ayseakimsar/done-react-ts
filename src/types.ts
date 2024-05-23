export type Id = string | number;

export type Project = {
  id: Id;
  title: string;
  type: string;
};

export type Column = {
  id: Id;
  title: string;
  color: string;
  projectId: Id | null;
};

export type Task = {
  id: Id;
  columnId: Id | null;
  content: string;
  dueDate: string | null /*  yyyy-mm-dd */;
  parentTaskId: Id | null;
  labelId: Id | null;
  completed: boolean;
  priority: string;
};

export type Label = {
  id: Id;
  title: string;
};
