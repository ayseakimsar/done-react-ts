import DropdownIcon from "../../../icons/KanbanBoard/Dropdown";
import PriorityIcon from "../../../icons/KanbanBoard/PriorityIcon";
import { Id, Task } from "../../../types";
import { useState } from "react";
import { findCheckBoxColor } from "../../../utils/findCheckboxColor";

interface Props {
  task: Task;
  updateTaskPriority: (taskId: Id, priority: string) => void;
}

export default function PriorityBox({ task, updateTaskPriority }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlePriorityChange = (priority: string) => {
    updateTaskPriority(task.id, priority);
    setIsOpen(false);
  };

  const priorityColor = findCheckBoxColor(task);

  return (
    <div>
      <div
        tabIndex={0}
        role="button"
        className="btn h-[10px] min-h-6 w-[170px] justify-between border-none bg-light-secondarySidebar p-0 px-3 text-right text-[10px] font-light uppercase tracking-[0.23em] text-light-primaryTextLight shadow-none hover:bg-gray-100"
        onClick={() => toggleDropdown()}
      >
        Priority
        <DropdownIcon />
      </div>
      {isOpen && (
        <ul className="menu dropdown-content absolute z-[1] w-52 rounded-box bg-light-secondarySidebar p-2 shadow">
          <li>
            <a
              onClick={() => handlePriorityChange("high")}
              className="flex px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <PriorityIcon color="#fca5a5" /> <span>High</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => handlePriorityChange("medium")}
              className="flex px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <PriorityIcon color="#fbbf24" /> <span>Medium</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => handlePriorityChange("low")}
              className="flex px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <PriorityIcon color="#93c5fd" /> <span>Low</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => handlePriorityChange("none")}
              className="flex px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <PriorityIcon color="#b5bbc3" /> <span>None</span>
            </a>
          </li>
        </ul>
      )}
      <div className="flex h-[auto] items-center gap-2 px-3 text-[14px] font-medium capitalize tracking-[0.07em] text-light-primaryText dark:text-dark-primaryText">
        <PriorityIcon color={priorityColor} />
        {task.priority}
      </div>
    </div>
  );
}
