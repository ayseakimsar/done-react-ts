import Checkbox from "../../../icons/KanbanBoard/Checkbox";
import DescriptionIcon from "../../../icons/SecondarySidebar/DescriptionIcon";
import { Column, Id, Label, Project, Task } from "../../../types";
import SidebarHeader from "./SidebarHeader";
import SidebarInfo from "./SidebarInfo";
import SubtaskContainer from "./SubtaskContainer";
import PlusIcon from "../../../icons/KanbanBoard/PlusIcon";
import { useEffect, useRef, useState } from "react";
import { findCheckBoxColor } from "../../../utils/findCheckboxColor";
import PriorityBox from "./PriorityBox";
import LabelBox from "./LabelBox";
interface Props {
  labels: Label[];
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
  updateTaskLabels: (taskId: Id, labelId: Id) => void;
  deleteLabelInTask: (taskId: Id, labelId: Id) => void;
}

export default function TaskModal({
  task,
  columns,
  subtasks,
  projects,
  labels,
  createSubTask,
  deleteTask,
  updateTask,
  handleTaskClick,
  completeTask,
  updateTaskPriority,
  updateTaskLabels,
  deleteLabelInTask,
}: Props) {
  console.log(labels);
  const checkboxColor = findCheckBoxColor(task);
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

  console.log(task.labelIds);

  return (
    <div className="absolute left-1/2 top-1/2 z-20 grid h-[700px] w-[800px] -translate-x-1/2 -translate-y-1/2 transform grid-cols-taskModal grid-rows-taskModal rounded-2xl bg-white shadow-2xl">
      <header className="col-span-full flex h-20 border-collapse items-center border-b-2 px-8 text-[0.8em] font-light uppercase tracking-[0.23em] text-light-primaryTextLight">
        {project ? project.title : "-"}{" "}
      </header>
      <aside className="flex flex-col gap-8 border-r-2 p-5">
        <div className="flex flex-col gap-1">
          <SidebarHeader>Parent</SidebarHeader>
          <SidebarInfo>{project ? project.title : "-"}</SidebarInfo>
        </div>
        <div className="flex flex-col gap-1">
          <SidebarHeader>Due Date</SidebarHeader>
          <SidebarInfo>Today</SidebarInfo>
        </div>
        <div className="flex flex-col gap-1">
          <PriorityBox task={task} updateTaskPriority={updateTaskPriority} />
        </div>

        <LabelBox
          task={task}
          labels={labels}
          updateTaskLabels={updateTaskLabels}
          deleteLabelInTask={deleteLabelInTask}
        />
      </aside>

      <div className="px-10">
        <div
          onClick={() => setTaskEditMode(true)}
          onBlur={() => setTaskEditMode(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setTaskEditMode(false);
          }}
          className="mt-7 flex items-center"
        >
          <div onClick={() => completeTask(task.id)}>
            <Checkbox color={checkboxColor} />
          </div>
          {taskEditMode ? (
            <input
              className="/* Border radius */ /* Border color */ /* Full width */ /* Font size */ /* Remove default */ /* Change color on */ focus w-full rounded-md border border-gray-300 p-1 text-base outline focus:border-slate-300 focus:outline-none"
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
          <span className="h-[auto] text-xs font-light tracking-wide text-light-primaryText dark:text-dark-primaryText">
            Description
          </span>
        </div>
        <div className="mt-5 text-[10px] font-light uppercase tracking-[0.25em] text-light-primaryText dark:text-dark-primaryText">
          sub-tasks
        </div>
        <div className="mt-2 h-[1px] w-[90%] border-b"></div>
        <ul className="mt-4 max-h-[180px] min-h-[100px] overflow-y-auto">
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
          className="mt-10 flex gap-2 text-light-primaryTextLight dark:text-dark-primaryText"
          onClick={() => createSubTask(task.id)}
        >
          <PlusIcon />
          Add subtask
        </button>
        <div className="mt-8 text-[10px] font-light uppercase tracking-[0.25em] text-light-primaryText dark:text-dark-primaryText">
          completed
        </div>
        <div className="mt-2 h-[1px] w-[90%] border-b"></div>
        <ul className="h-[145px] overflow-y-auto">
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
