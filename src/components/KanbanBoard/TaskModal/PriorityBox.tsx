import { Id, Task } from "../../../types";

interface Props {
  task: Task;
  updateTaskPriority: (taskId: Id, priority: string) => void;
}

export default function PriorityBox({ task, updateTaskPriority }: Props) {
  return (
    <div>
      <select
        className=" font-medium text-[14px] text-light-primaryText  dark:text-dark-primaryText h-[auto] tracking-[0.07em]"
        value={task.priority}
        onChange={(e) => updateTaskPriority(task.id, e.target.value)}
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
        <option value="none">None</option>
      </select>
    </div>
  );
}
