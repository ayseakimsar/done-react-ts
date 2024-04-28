import { Column, Project, Task } from "./types";

export const initialColumnData: Column[] = [
  {
    id: "inboxColumn",
    title: "Inbox",
    color: "bg-blue-300",
    projectId: "inbox",
  },

  {
    id: 1,
    title: "to do",
    color: "bg-blue-300",
    projectId: 12,
  },
  {
    id: 2,
    title: "doing",
    color: "bg-violet-300",
    projectId: 23,
  },
  {
    id: 3,
    title: "done",
    color: "bg-green-300",
    projectId: 34,
  },
];

export const initialTaskData: Task[] = [
  {
    id: 4,
    columnId: 1,
    content: "declutter room",
    dueDate: "",
    parentTaskId: 5,
    labelId: null,
    completed: false,
  },
  {
    id: 5,
    columnId: 2,
    content: "implement the dnd-kit library",
    dueDate: "",
    parentTaskId: null,
    labelId: null,
    completed: false,
  },
  {
    id: 6,
    columnId: 3,
    content: "set up your workspace",
    dueDate: "",
    parentTaskId: 5,
    labelId: null,
    completed: false,
  },
  {
    id: 7,
    columnId: 2,
    content: "Finish report for work",
    dueDate: "",
    parentTaskId: 5,
    labelId: null,
    completed: false,
  },
  {
    id: 8,
    columnId: 2,
    content: "Buy groceries for the week",
    dueDate: "",
    parentTaskId: 5,
    labelId: null,
    completed: false,
  },
  {
    id: 9,
    columnId: 1,
    content: "Call the dentist to schedule an appointment",
    dueDate: "",
    parentTaskId: 5,
    labelId: null,
    completed: false,
  },
  {
    id: 10,
    columnId: 2,
    content: "Read a chapter of a book",
    dueDate: "",
    parentTaskId: 5,
    labelId: null,
    completed: false,
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
