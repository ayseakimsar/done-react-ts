import Checkbox from "../../../icons/KanbanBoard/Checkbox";
import DescriptionIcon from "../../../icons/SecondarySidebar/DescriptionIcon";
import { Column, Project, Task } from "../../../types";
import SidebarHeader from "./SidebarHeader";
import SidebarInfo from "./SidebarInfo";
import SubtaskContainer from "./SubtaskContainer";

interface Props {
  columns: Column[];
  task: Task;
  subtasks: Task[];
  projects: Project[];
}

export default function TaskModal({
  task,
  columns,
  subtasks,
  projects,
}: Props) {
  const column: Column | null = task
    ? columns.find((c) => c.id === (task.columnId || null)) || null
    : null;

  let project: Project | null = null;
  if (column) {
    project = projects.find((p) => p.id === (column.projectId || null)) || null;
  }

  return (
    <div className="grid grid-cols-taskModal grid-rows-taskModal w-[800px] h-[500px] bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl rounded-2xl z-20">
      <header className="px-8 col-span-full h-20 flex items-center text-[0.8em] font-light text-light-primaryTextLight uppercase tracking-[0.23em] border-b-2 border-collapse">
        {project ? project.title : "-"}{" "}
      </header>
      <aside className="p-7 flex flex-col gap-8 border-r-2">
        <div className="flex flex-col gap-1">
          <SidebarHeader>Project</SidebarHeader>
          <SidebarInfo>{project ? project.title : "-"}</SidebarInfo>
        </div>
        <div className="flex flex-col gap-1">
          <SidebarHeader>Due Date</SidebarHeader>
          <SidebarInfo>Today</SidebarInfo>
        </div>
        <div className="flex flex-col gap-1">
          <SidebarHeader>Priority</SidebarHeader>
          <SidebarInfo>High</SidebarInfo>
        </div>
        <SidebarHeader>Labels</SidebarHeader>
      </aside>

      <div className="px-10">
        <div className="flex mt-7">
          <Checkbox strokeWidth={1.8} viewBox="0 0 32 32" />
          <div className=" font-medium text-sm text-light-primaryText  dark:text-dark-primaryText h-[auto]">
            {task.content}
          </div>
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
        <ul className="mt-4 overflow-y-auto h-[230px]">
          {subtasks.map((st) => (
            <SubtaskContainer>{st.content}</SubtaskContainer>
          ))}
        </ul>
      </div>
    </div>
  );
}
