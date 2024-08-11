import { useEffect, useRef, useState } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Column, Id, Label, Project, Task } from "../../types";
import TrashIcon from "../../icons/KanbanBoard/TrashIcon";
import CircleIcon from "../../icons/KanbanBoard/CircleIcon";
import PlusIcon from "../../icons/KanbanBoard/PlusIcon";
import TaskCard from "./TaskCard";

interface Props {
  view: string;
  column: Column;
  tasks: Task[];
  tasksId: Id[];
  allTasks: Task[];
  activeProject: Project | null | undefined;
  activeLabel: Label | null | undefined;
  updateColumn: (columnId: Id, title: string) => void;
  deleteColumn: (columnId: Id) => void;
  createTask: (
    columnId: Id,
    activeLabelId: Id | undefined,
    dueDate: Date | null,
  ) => void;
  updateTask: (taskId: Id, content: string) => void;
  completeTask: (taskId: Id) => void;
  deleteTask: (taskId: Id) => void;
  onTaskClick: (task: Task) => void;
}

export default function ColumnContainer({
  view,
  column,
  tasks,
  tasksId,
  allTasks,
  updateColumn,
  deleteColumn,
  updateTask,
  completeTask,
  createTask,
  deleteTask,
  onTaskClick,
  activeLabel,
  activeProject,
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

  const [columnEditMode, setColumnEditMode] = useState(false);
  const [isColumnHovered, setIsColumnHovered] = useState(false);
  const inputDate = new Date();
  const todayDate = activeProject?.id === "today" ? inputDate : null;
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const inputRef = useRef<HTMLInputElement>(null);

  function handleMouseEntersColumn() {
    setIsColumnHovered(true);
  }

  function handleMouseLeavesColumn() {
    setIsColumnHovered(false);
  }

  function handleBlur() {
    setColumnEditMode(false);
  }

  useEffect(() => {
    if (columnEditMode && inputRef.current) {
      inputRef.current.select();
    }
  }, [columnEditMode]);

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`h-auto max-h-[90vh] min-h-[30rem] w-[23rem] rounded-xl bg-slate-200 ${view === "list" ? "min-h-[10rem] w-[50rem]" : ""}`}
      />
    );
  }

  return (
    <div
      onMouseEnter={handleMouseEntersColumn}
      onMouseLeave={handleMouseLeavesColumn}
      ref={setNodeRef}
      style={style}
      className={`flex h-auto max-h-[90vh] min-h-[30rem] w-[23rem] flex-col items-start rounded-xl bg-light-mainBackground p-3 ${view === "list" ? "min-h-[10rem] w-[50rem]" : ""}`}
    >
      {/* Column Title */}
      <div
        className={`mt-6 flex h-10 w-[20rem] items-center justify-between text-[#596678] dark:text-slate-200 ${view === "list" ? "w-[50rem]" : ""}`}
      >
        <div
          className="cursor-grab text-[13px] font-semibold uppercase tracking-[0.2em]"
          {...attributes}
          {...listeners}
        >
          {
            <div className="flex items-center gap-3">
              {view !== "list" && (
                <CircleIcon
                  color={activeLabel ? activeLabel.color : column.color}
                />
              )}
              <div
                onClick={() => setColumnEditMode(true)}
                onBlur={handleBlur}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && columnEditMode === true)
                    handleBlur();
                }}
              >
                {columnEditMode ? (
                  <input
                    className="h-10 w-full rounded-md border border-gray-300 bg-slate-50 p-1 text-[13px] font-semibold uppercase tracking-[0.2em] text-light-primaryText focus:border-slate-300 focus:outline-none dark:text-dark-primaryText"
                    ref={inputRef}
                    value={column.title}
                    onChange={(e) => updateColumn(column.id, e.target?.value)}
                  />
                ) : (
                  <div>{column.title}</div>
                )}
              </div>
            </div>
          }
        </div>
        {!activeLabel && (
          <button
            onClick={() => deleteColumn(column.id)}
            className={`transition-all duration-200 ${isColumnHovered ? "opacity-1" : "opacity-0"}`}
          >
            <TrashIcon />
          </button>
        )}
      </div>
      {/* Column Content */}
      <div className="mt-8 flex max-h-[70%] flex-col items-center gap-3 overflow-y-hidden pb-3 pr-6 hover:overflow-y-auto">
        <SortableContext items={tasksId}>
          {tasks.map(
            (task) =>
              !task.completed && (
                <TaskCard
                  view={view}
                  key={task.id}
                  task={task}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  completeTask={completeTask}
                  subtasks={allTasks.filter((t) => t.parentTaskId === task.id)}
                  onTaskClick={onTaskClick}
                />
              ),
          )}
        </SortableContext>
      </div>
      {/* Column Footer */}
      <button
        className={`mt-6 flex gap-2 px-5 text-light-primaryText transition-all dark:text-dark-primaryText`}
        onClick={() => createTask(column.id, activeLabel?.id, todayDate)}
      >
        <PlusIcon />
        <span className="text-md">Add task</span>
      </button>
    </div>
  );
}
