import DropdownIcon from "../../../icons/KanbanBoard/Dropdown";
import { Id, Task } from "../../../types";
import { useState } from "react";

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

  return (
    <div className="">
      <div
        tabIndex={0}
        role="button"
        className="btn h-[10px] min-h-8 w-[170px] justify-between border-none bg-light-secondarySidebar p-0 px-3 text-right text-[10px] font-light uppercase tracking-[0.23em] text-light-primaryTextLight shadow-none hover:bg-gray-100"
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
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              High
            </a>
          </li>
          <li>
            <a
              onClick={() => handlePriorityChange("medium")}
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Medium
            </a>
          </li>
          <li>
            <a
              onClick={() => handlePriorityChange("low")}
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Low
            </a>
          </li>
          <li>
            <a
              onClick={() => handlePriorityChange("none")}
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              None
            </a>
          </li>
        </ul>
      )}
      <div className="h-[auto] px-3 text-[14px] font-medium capitalize tracking-[0.07em] text-light-primaryText dark:text-dark-primaryText">
        {task.priority}
      </div>
    </div>
  );
}
