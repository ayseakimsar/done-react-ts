export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
  color: string;
  projectId: Id | null;
};

export type Task = {
  id: Id;
  columnId: Id;
  content: string;
};

export type Project = {
  id: Id;
  title: string;
};
