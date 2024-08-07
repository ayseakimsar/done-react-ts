import { useState } from "react";
import Checkbox from "../../../icons/KanbanBoard/Checkbox";
import CheckboxDone from "../../../icons/KanbanBoard/CheckboxDone";
import CheckboxDoneFilled from "../../../icons/KanbanBoard/CheckboxDoneFilled";
import EditModeIcon from "../../../icons/KanbanBoard/EditModeIcon";
import TrashIcon from "../../../icons/KanbanBoard/TrashIcon";
import { Id, Task } from "../../../types";

interface Props {
  subtask: Task;
  subtasks: Task[];
  deleteTask: (taskId: Id) => void;
  handleTaskClick: (task: Task) => void;
  completeTask: (taskId: Id) => void;
}

export default function SubtaskContainer({
  subtask,
  deleteTask,
  completeTask,
  handleTaskClick,
}: Props) {
  const [mouseEntersCheckbox, setMouseEntersCheckbox] = useState(false);
  const [isSubtaskHovered, setIsSubtaskHovered] = useState(false);

  return (
    <div
      onClick={() => handleTaskClick(subtask)}
      onMouseEnter={() => setIsSubtaskHovered(true)}
      onMouseLeave={() => setIsSubtaskHovered(false)}
      className="flex w-[32rem] items-center justify-between"
    >
      <div className="flex gap-1">
        <div
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(subtask.id);
            completeTask(subtask.id);
          }}
          onMouseEnter={() => setMouseEntersCheckbox(true)}
          onMouseLeave={() => setMouseEntersCheckbox(false)}
        >
          {subtask.completed ? (
            <CheckboxDoneFilled />
          ) : mouseEntersCheckbox ? (
            <CheckboxDone />
          ) : (
            <Checkbox />
          )}
        </div>
        <li
          className={`items- flex h-11 flex-col text-sm font-medium text-light-primaryText dark:text-dark-primaryText ${
            subtask.completed ? "decoration-thickness-1 line-through" : ""
          }`}
        >
          {subtask.content}
        </li>
      </div>
      {isSubtaskHovered && (
        <div className="flex gap-2">
          <div onClick={() => handleTaskClick(subtask)}>
            <EditModeIcon />
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(subtask.id);
            }}
          >
            <TrashIcon />
          </div>
        </div>
      )}
    </div>
  );
}
