import Checkbox from "../../../icons/KanbanBoard/Checkbox";
import DescriptionIcon from "../../../icons/SecondarySidebar/DescriptionIcon";
import { Column, Id, Project, Task } from "../../../types";
import SidebarHeader from "./SidebarHeader";
import SidebarInfo from "./SidebarInfo";
import SubtaskContainer from "./SubtaskContainer";
import PlusIcon from "../../../icons/KanbanBoard/PlusIcon";
import { useEffect, useRef, useState } from "react";
import PriorityBox from "./PriorityBox";
interface Props {
  columns: Column[];
  task: Task;
  subtasks: Task[];
  projects: Project[];
  createSubTask: (taskId: Id) => void;
  deleteTask: (taskId: Id) => void;
  updateTask: (taskId: Id, content: string) => void;
  handleTaskClick: (task: Task) => void;
  completeTask: (taskId: Id) => void;
  updateTaskPriority: (taskId: Id, priority: string) => void;
}

export default function TaskModal({
  task,
  columns,
  subtasks,
  projects,
  createSubTask,
  deleteTask,
  updateTask,
  handleTaskClick,
  completeTask,
  updateTaskPriority,
}: Props) {
  const column: Column | null = task
    ? columns.find((c) => c.id === (task.columnId || null)) || null
    : null;

  let project: Project | null = null;
  if (column) {
    project = projects.find((p) => p.id === (column.projectId || null)) || null;
  }

  const [taskEditMode, setTaskEditMode] = useState(false);
  const taskInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (taskEditMode && taskInputRef.current) {
      taskInputRef.current.select();
    }
  }, [taskEditMode]);

  return (
    <div className="grid grid-cols-taskModal grid-rows-taskModal w-[800px] h-[700px] bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl rounded-2xl z-20">
      <header className="px-8 col-span-full h-20 flex items-center text-[0.8em] font-light text-light-primaryTextLight uppercase tracking-[0.23em] border-b-2 border-collapse">
        {project ? project.title : "-"}{" "}
      </header>
      <aside className="p-7 flex flex-col gap-8 border-r-2">
        <div className="flex flex-col gap-1">
          <SidebarHeader>Parent</SidebarHeader>
          <SidebarInfo>{project ? project.title : "-"}</SidebarInfo>
        </div>
        <div className="flex flex-col gap-1">
          <SidebarHeader>Due Date</SidebarHeader>
          <SidebarInfo>Today</SidebarInfo>
        </div>
        <div className="flex flex-col gap-1">
          <SidebarHeader>Priority</SidebarHeader>
          <PriorityBox task={task} updateTaskPriority={updateTaskPriority} />
        </div>
        <SidebarHeader>Labels</SidebarHeader>
      </aside>

      <div className="px-10">
        <div
          onClick={() => setTaskEditMode(true)}
          onBlur={() => setTaskEditMode(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setTaskEditMode(false);
          }}
          className="flex items-center mt-7"
        >
          <div onClick={() => completeTask(task.id)}>
            <Checkbox />
          </div>
          {taskEditMode ? (
            <input
              className="
              p-1
              rounded-md       /* Border radius */
              border-gray-300  /* Border color */
              w-full           /* Full width */
              text-base        /* Font size */
              focus:outline-none /* Remove default focus outline */
              focus:border-slate-300 /* Change border color on focus */
          "
              ref={taskInputRef}
              value={task.content}
              onChange={(e) => {
                updateTask(task.id, e.target.value);
              }}
              onBlur={() => setTaskEditMode(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setTaskEditMode(false);
              }}
            />
          ) : (
            task.content
          )}
        </div>
        <div className="mt-2 flex gap-1">
          <DescriptionIcon />
          <span className="font-light text-xs text-light-primaryText  dark:text-dark-primaryText h-[auto] tracking-wide">
            Description
          </span>
        </div>
        <div className="mt-5 uppercase font-light text-light-primaryText  dark:text-dark-primaryText text-[10px] tracking-[0.25em]">
          sub-tasks
        </div>
        <div className="mt-2 h-[1px] w-[90%] border-b"></div>
        <ul className="mt-4 overflow-y-auto min-h-[100px] max-h-[180px] ">
          {subtasks.map((subtask) => (
            <div>
              {!subtask.completed && (
                <SubtaskContainer
                  key={subtask.id}
                  subtask={subtask}
                  subtasks={subtasks}
                  deleteTask={deleteTask}
                  completeTask={completeTask}
                  handleTaskClick={handleTaskClick}
                />
              )}
            </div>
          ))}
        </ul>
        <button
          className="mt-10 flex gap-2 text-light-primaryTextLight  dark:text-dark-primaryText "
          onClick={() => createSubTask(task.id)}
        >
          <PlusIcon />
          Add subtask
        </button>
        <div className="mt-8 uppercase font-light text-light-primaryText  dark:text-dark-primaryText text-[10px] tracking-[0.25em]">
          completed
        </div>
        <div className="mt-2 h-[1px] w-[90%] border-b"></div>
        <ul className=" overflow-y-auto h-[145px] ">
          {subtasks.map((subtask) => (
            <div>
              {subtask.completed && (
                <SubtaskContainer
                  subtasks={subtasks}
                  key={subtask.id}
                  subtask={subtask}
                  deleteTask={deleteTask}
                  completeTask={completeTask}
                  handleTaskClick={handleTaskClick}
                />
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
