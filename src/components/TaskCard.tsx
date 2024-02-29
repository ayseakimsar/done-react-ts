import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Id, Task } from "../types";
import TrashIcon from "../icons/TrashIcon";
import Checkbox from "../icons/Checkbox";
import CheckboxDone from "../icons/CheckboxDone";
interface Props {
  task: Task;
  deleteTask: (taskId: Id) => void;
  updateTask: (taskId: Id, content: string) => void;
  handleTaskClick: () => void;
}

export default function TaskCard({
  task,
  deleteTask,
  updateTask,
  handleTaskClick,
}: Props) {
  const [mouseEntersCheckbox, setMouseEntersCheckbox] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [isTaskHovered, setIsTaskHovered] = useState(false);
  const [editMode, setEditMode] = useState(false);

  function handleMouseEntersTask() {
    setIsTaskHovered(true);
  }

  function handleMouseLeavesTask() {
    setIsTaskHovered(false);
  }

  function handleTaskCompleted(id: Id) {
    setTaskCompleted(true);
    setTimeout(() => {
      deleteTask(id);
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
    opacity: taskCompleted ? 0 : isDragging ? 0.4 : 1,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="px-3 grid grid-rows-2 grid-cols-task gap-2 items-center  h-[80px] w-[290px] bg-light-task dark:bg-dark-task drop-shadow-md dark:drop-shadow-2xl rounded-xl  text-light-primaryText dark:text-dark-primaryText opacity-10"
        style={style}
      ></div>
    );
  }
  return (
    <div
      onClick={handleTaskClick}
      onMouseEnter={handleMouseEntersTask}
      onMouseLeave={handleMouseLeavesTask}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="px-3 grid grid-rows-2 grid-cols-task gap-2 items-center min-h-[80px] h-[auto] w-[290px] bg-light-task dark:bg-dark-task drop-shadow-md dark:drop-shadow-2xl rounded-xl  text-light-primaryText dark:text-dark-primaryText"
    >
      <div
        onClick={() => handleTaskCompleted(task.id)}
        onMouseEnter={() => setMouseEntersCheckbox(true)}
        onMouseLeave={() => setMouseEntersCheckbox(false)}
        className="col-start-1 row-start-1 row-end-3 mb-7"
        style={{
          transition: "all 0.3s ease",
          transform: taskCompleted ? "scale(1.2)" : "scale(1)",
          opacity: taskCompleted ? 0 : 1,
        }}
      >
        {mouseEntersCheckbox ? <CheckboxDone /> : <Checkbox />}
      </div>
      <div className="pt-4 self-end font-semibold text-sm text-light-primaryText  dark:text-dark-primaryText h-[auto] ">
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
      <div className=" self-start col-start-2 row-start-2  text-xs text-light-primaryTextLight dark:text-dark-primaryText">
        0 of 3 subtasks
      </div>
      <button
        className={` ${
          isTaskHovered ? "opacity-1" : "opacity-0"
        } transition-opacity row-start-1 row-end-3 col-start-3`}
        onClick={() => deleteTask(task.id)}
      >
        <TrashIcon />
      </button>
    </div>
  );
}
