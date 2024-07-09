import { useState, useEffect } from "react";
import { Id, Label, Task } from "../../../types";

interface Props {
  task: Task;
  labels: Label[];
  updateTaskLabels: (taskId: Id, labelId: Id) => void;
}

export default function LabelBox({ task, labels, updateTaskLabels }: Props) {
  // Initialize selectedLabel with the first label's id if available, otherwise an empty string
  const [selectedLabel, setSelectedLabel] = useState<string>();
  console.log(task.labelIds);

  // Use useEffect to call updateTaskLabels only when selectedLabel changes
  useEffect(() => {
    if (selectedLabel) {
      updateTaskLabels(task.id, selectedLabel);
    }
  }, [selectedLabel]);

  return (
    <div>
      <select
        className="h-[auto] text-[14px] font-medium tracking-[0.07em] text-light-primaryText dark:text-dark-primaryText"
        value={selectedLabel}
        onChange={(e) => setSelectedLabel(e.target.value)}
      >
        <option></option>
        {labels.map((label) => (
          <option key={label.id} value={label.id}>
            {label.title}
          </option>
        ))}
      </select>
    </div>
  );
}
