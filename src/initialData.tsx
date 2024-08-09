import { Column, Label, Project, Task } from "./types";

export const initialColumnData: Column[] = [
  {
    id: "today",
    title: "today",
    color: "pink",
    projectId: "today",
    labelId: null,
  },
  {
    id: "inbox",
    title: "inbox",
    color: "pink",
    projectId: "inbox",
    labelId: null,
  },
  {
    id: "upcoming",
    title: "upcoming",
    color: "pink",
    projectId: "upcoming",
    labelId: null,
  },
];

export const initialTaskData: Task[] = [];

export const initialProjectData: Project[] = [
  {
    id: "inbox",
    title: "Inbox",
    type: "main-filter",
    color: "",
  },
  {
    id: "today",
    title: "Today",
    type: "main-filter",
    color: "",
  },
  {
    id: "upcoming",
    title: "Upcoming",
    type: "main-filter",
    color: "",
  },
];

export const initialLabelData: Label[] = [];
