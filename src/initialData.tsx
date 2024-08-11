import { Column, Label, Project, Task } from "./types";

export const initialColumnData: Column[] = [
  {
    id: "today",
    title: "today",
    color: "white",
    projectId: "today",
    labelId: null,
  },
  {
    id: "inbox",
    title: "inbox",
    color: "white",
    projectId: "inbox",
    labelId: null,
  },
  {
    id: "upcoming-1",
    title: "today",
    color: "pink",
    projectId: "upcoming",
    labelId: null,
  },
  {
    id: "upcoming-2",
    title: "tomorrow",
    color: "pink",
    projectId: "upcoming",
    labelId: null,
  },
  {
    id: "upcoming-3",
    title: "upcoming",
    color: "pink",
    projectId: "upcoming",
    labelId: null,
  },
  {
    id: "upcoming-4",
    title: "upcoming",
    color: "pink",
    projectId: "upcoming",
    labelId: null,
  },
  {
    id: "upcoming-5",
    title: "upcoming",
    color: "pink",
    projectId: "upcoming",
    labelId: null,
  },
  {
    id: "upcoming-6",
    title: "upcoming",
    color: "pink",
    projectId: "upcoming",
    labelId: null,
  },
  {
    id: "upcoming-7",
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
