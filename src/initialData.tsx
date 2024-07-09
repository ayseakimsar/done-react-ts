import { Column, Label, Project, Task } from "./types";

export const initialColumnData: Column[] = [
  {
    id: "inboxColumn",
    title: "Inbox",
    color: "bg-blue-300",
    projectId: null,
    labelId: null,
  },
  {
    id: 128390131,
    title: "",
    color: "bg-blue-300",
    projectId: null,
    labelId: 1212,
  },

  {
    id: 1,
    title: "to do",
    color: "bg-blue-300",
    projectId: 12,
    labelId: null,
  },
  {
    id: 2,
    title: "doing",
    color: "bg-violet-300",
    projectId: 23,
    labelId: null,
  },
  {
    id: 3,
    title: "done",
    color: "bg-green-300",
    projectId: 34,
    labelId: null,
  },
  {
    id: 18271,
    title: "done",
    color: "bg-green-300",
    projectId: 34,
    labelId: 1213,
  },
];

export const initialTaskData: Task[] = [
  {
    id: 4,
    columnId: 1,
    content: "declutter room",
    dueDate: "",
    parentTaskId: 5,
    labelIds: null,
    completed: false,
    priority: "none",
  },
  {
    id: 5,
    columnId: 2,
    content: "implement the dnd-kit library",
    dueDate: "",
    parentTaskId: null,
    labelIds: null,
    completed: false,
    priority: "none",
  },
  {
    id: 6,
    columnId: 3,
    content: "set up your workspace",
    dueDate: "",
    parentTaskId: 5,
    labelIds: null,
    completed: false,
    priority: "none",
  },
  {
    id: 7,
    columnId: 2,
    content: "Finish report for work",
    dueDate: "",
    parentTaskId: 5,
    labelIds: null,
    completed: false,
    priority: "none",
  },
  {
    id: 8,
    columnId: 2,
    content: "Buy groceries for the week",
    dueDate: "",
    parentTaskId: 5,
    labelIds: [1212, 1213],
    completed: false,
    priority: "none",
  },
  {
    id: 9,
    columnId: 1,
    content: "Call the dentist to schedule an appointment",
    dueDate: "",
    parentTaskId: 5,
    labelIds: [1212, 1213],
    completed: false,
    priority: "none",
  },
  {
    id: 10,
    columnId: 2,
    content: "Read a chapter of a book",
    dueDate: "",
    parentTaskId: 5,
    labelIds: [1212, 1213],
    completed: false,
    priority: "none",
  },
];

export const initialProjectData: Project[] = [
  {
    id: "inbox",
    title: "Inbox",
    type: "main-filter",
  },
  {
    id: "today",
    title: "Today",
    type: "main-filter",
  },
  {
    id: "upcoming",
    title: "Upcoming",
    type: "main-filter",
  },

  {
    id: 12,
    title: "Platform Lunch",
    type: "project",
  },
  {
    id: 23,
    title: "Marketing Plan",
    type: "project",
  },
  {
    id: 346,
    title: "Roadmap",
    type: "project",
  },
];

export const initialLabelData: Label[] = [
  { id: 1212, title: "Work", type: "label" },
  { id: 1213, title: "Personal", type: "label" },
  { id: 1216, title: "Fitness", type: "label" },
];
