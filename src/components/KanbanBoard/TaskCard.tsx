import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Id, Task } from "../../types";
import TrashIcon from "../../icons/KanbanBoard/TrashIcon";
import Checkbox from "../../icons/KanbanBoard/Checkbox";
import CheckboxDone from "../../icons/KanbanBoard/CheckboxDone";
import EditModeIcon from "../../icons/KanbanBoard/EditModeIcon";
import { findCheckBoxColor } from "../../utils/findCheckboxColor";

interface Props {
  task: Task;
  subtasks: Task[];
  deleteTask: (taskId: Id) => void;
  updateTask: (taskId: Id, content: string) => void;
  completeTask: (taskId: Id) => void;
  onTaskClick: (task: Task) => void;
}

export default function TaskCard({
  task,
  subtasks,
  deleteTask,
  updateTask,
  completeTask,
  onTaskClick,
}: Props) {
  const [mouseEntersCheckbox, setMouseEntersCheckbox] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [isTaskHovered, setIsTaskHovered] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const checkboxColor = findCheckBoxColor(task);

  function handleMouseEntersTask() {
    setIsTaskHovered(true);
  }

  function handleMouseLeavesTask() {
    setIsTaskHovered(false);
  }

  function handleTaskCompleted(id: Id) {
    setTaskCompleted(true);
    setTimeout(() => {
      completeTask(id);
    }, 500);
  }

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  // transition: "all 0.5s ease",
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="grid h-[80px] w-[290px] grid-cols-task grid-rows-2 items-center gap-2 rounded-xl bg-light-task px-3 text-light-primaryText opacity-10 drop-shadow-md dark:bg-dark-task dark:text-dark-primaryText dark:drop-shadow-2xl"
        style={style}
      ></div>
    );
  }
  return (
    <div
      onClick={() => onTaskClick(task)}
      onMouseEnter={handleMouseEntersTask}
      onMouseLeave={handleMouseLeavesTask}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="grid h-[auto] min-h-[80px] w-[290px] grid-cols-task grid-rows-2 items-center gap-2 rounded-xl bg-light-task px-3 text-light-primaryText shadow-md focus:outline-none dark:bg-dark-task dark:text-dark-primaryText dark:drop-shadow-2xl"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleTaskCompleted(task.id);
        }}
        onMouseEnter={() => setMouseEntersCheckbox(true)}
        onMouseLeave={() => setMouseEntersCheckbox(false)}
        className="col-start-1 row-start-1 row-end-3 mb-7"
        style={{
          ...style,
          transition: "all 0.3s ease",
          transform: taskCompleted ? "scale(1.2)" : "scale(1)",
          opacity: taskCompleted ? 0 : 1,
        }}
      >
        {mouseEntersCheckbox ? (
          <CheckboxDone color={checkboxColor} />
        ) : (
          <Checkbox color={checkboxColor} />
        )}
      </div>
      <div className="h-[auto] self-end pt-4 text-sm font-[500] text-light-primaryText dark:text-dark-primaryText">
        {editMode ? (
          <input
            value={task.content}
            onChange={(e) => updateTask(task.id, e.target.value)}
            onBlur={() => setEditMode(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setEditMode(false);
            }}
          />
        ) : (
          task.content
        )}
      </div>
      {
        <div className="col-start-2 row-start-2 self-start text-xs text-light-primaryTextLight dark:text-dark-primaryText">
          {subtasks.filter((subtask) => subtask.completed === true).length} of{" "}
          {subtasks.length} subtasks
        </div>
      }
      <div className="col-start-3 row-start-1 row-end-3 items-center">
        <button
          className={` ${
            isTaskHovered ? "opacity-1" : "opacity-0"
          } transition-opacity`}
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task.id);
          }}
        >
          <TrashIcon />
        </button>
        <button
          className={` ${
            isTaskHovered ? "opacity-1" : "opacity-0"
          } transition-opacity`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <EditModeIcon />
        </button>
      </div>
    </div>
  );
}
