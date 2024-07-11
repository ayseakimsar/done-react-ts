import { Task } from "../types";

export function findCheckBoxColor(task: Task) {
  if (task.priority === "high") return "#fca5a5";
  else if (task.priority === "medium") return "#fbbf24";
  else if (task.priority === "low") return "#93c5fd";
  else return "#b5bbc3";
}
