import { useState, useEffect } from "react";
import { Id, Label, Task } from "../../../types";
import DropdownIcon from "../../../icons/KanbanBoard/Dropdown";
import RemoveLabelIcon from "../../../icons/KanbanBoard/RemoveLabelIcon";

interface Props {
  task: Task;
  labels: Label[];
  updateTaskLabels: (taskId: Id, labelId: Id) => void;
  deleteLabelInTask: (taskId: Id, labelId: Id) => void;
}

export default function LabelBox({
  task,
  labels,
  updateTaskLabels,
  deleteLabelInTask,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<number>();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (selectedLabel) {
      updateTaskLabels(task.id, selectedLabel);
      toggleDropdown();
    }
  }, [selectedLabel]);

  return (
    <div>
      <div
        tabIndex={0}
        role="button"
        className="btn h-[10px] min-h-6 w-[170px] justify-between border-none bg-light-secondarySidebar p-0 px-3 text-right text-[10px] font-light uppercase tracking-[0.23em] text-light-primaryTextLight shadow-none hover:bg-gray-100"
        onClick={() => toggleDropdown()}
      >
        Labels
        <DropdownIcon />
      </div>

      {isOpen && (
        <ul className="menu dropdown-content absolute z-[1] w-52 rounded-box bg-light-secondarySidebar p-2 shadow">
          {labels.map((label) => (
            <li key={label.id}>
              <a
                onClick={() => setSelectedLabel(Number(label.id))}
                className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                {label.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-2">
        {labels
          .filter((label) => task.labelIds?.includes(label.id))
          .map((label) => (
            <div
              key={label.id}
              className={`flex items-center justify-between rounded-lg bg-[${label.color}] m-[0.4rem] h-[auto] p-1 px-3 text-[14px] font-medium tracking-[0.07em] text-light-primaryText dark:text-dark-primaryText`}
            >
              {label.title}
              <button onClick={() => deleteLabelInTask(task.id, label.id)}>
                <RemoveLabelIcon />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
