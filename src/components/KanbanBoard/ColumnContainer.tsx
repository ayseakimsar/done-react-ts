import { useState } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Column, Id, Task } from "../../types";
import TrashIcon from "../../icons/KanbanBoard/TrashIcon";
import CircleIcon from "../../icons/KanbanBoard/CircleIcon";
import PlusIcon from "../../icons/KanbanBoard/PlusIcon";
import TaskCard from "./TaskCard";

interface Props {
  column: Column;
  tasks: Task[];
  tasksId: Id[];
  updateColumn: (columnId: Id, title: string) => void;
  deleteColumn: (columnId: Id) => void;
  createTask: (columnId: Id) => void;
  updateTask: (taskId: Id, content: string) => void;
  deleteTask: (taskId: Id) => void;
  handleTaskClick: () => void;
}

export default function ColumnContainer({
  column,
  tasks,
  tasksId,
  updateColumn,
  deleteColumn,
  updateTask,
  createTask,
  deleteTask,
  handleTaskClick,
}: Props) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const [editMode, setEditMode] = useState(false);

  const [isColumnHovered, setIsColumnHovered] = useState(false);

  function handleMouseEntersColumn() {
    setIsColumnHovered(true);
  }
  function handleMouseLeavesColumn() {
    setIsColumnHovered(false);
  }

  function handleBlur() {
    setEditMode(false);
  }
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className=" w-[300px] h-[80vh] rounded-xl bg-slate-200 "
      />
    );
  }

  return (
    <div
      onMouseEnter={handleMouseEntersColumn}
      onMouseLeave={handleMouseLeavesColumn}
      ref={setNodeRef}
      style={style}
      className=" flex flex-col w-[320px] h-[100%]"
    >
      {/* Column Title */}
      <div className="flex justify-between p-6 text-[#596678] dark:text-slate-200">
        <div
          className="cursor-grab tracking-[0.2em] text-[13px] uppercase font-semibold"
          {...attributes}
          {...listeners}
        >
          <div className="flex items-center gap-3">
            <CircleIcon color={column.color} />
            <div
              onClick={handleTaskClick}
              onBlur={handleBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleBlur();
              }}
            >
              {editMode ? (
                <input
                  value={column.title}
                  onChange={(e) => updateColumn(column.id, e.target?.value)}
                />
              ) : (
                column.title
              )}
            </div>
          </div>
        </div>
        <button onClick={() => deleteColumn(column.id)}>
          <TrashIcon />
        </button>
      </div>
      {/* Column Content */}
      <div className="items-center h-[70%] flex flex-col gap-3 overflow-y-hidden hover:overflow-y-auto">
        <SortableContext items={tasksId}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
              handleTaskClick={handleTaskClick}
            />
          ))}
        </SortableContext>
      </div>
      {/* Column Footer */}
      <button
        className={`${
          isColumnHovered ? `opacity-1` : "opacity-0"
        }  px-5 transition-all  mt-[30px]  flex-end flex  gap-2 text-light-primaryText dark:text-dark-primaryText`}
        onClick={() => createTask(column.id)}
      >
        <PlusIcon />
        <span className="text-md">Add task</span>
      </button>
    </div>
  );
}
