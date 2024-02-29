import { Column, Project, Task } from "./types";

export const initialColumnData: Column[] = [
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
  },
  {
    id: 5,
    columnId: 2,
    content: "implement the dnd-kit library",
  },
  {
    id: 6,
    columnId: 3,
    content: "set up your workspace",
  },
  {
    id: 7,
    columnId: 3,
    content: "Finish report for work",
  },
  {
    id: 8,
    columnId: 1,
    content: "Buy groceries for the week",
  },
  {
    id: 9,
    columnId: 1,
    content: "Call the dentist to schedule an appointment",
  },
  {
    id: 10,
    columnId: 2,
    content: "Read a chapter of a book",
  },
];

export const initialProjectData: Project[] = [
  {
    id: 12,
    title: "Platform Lunch",
  },
  {
    id: 23,
    title: "Marketing Plan",
  },
  {
    id: 346,
    title: "Roadmap",
  },
];
