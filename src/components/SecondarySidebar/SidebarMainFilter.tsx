import { ReactNode } from "react";
import { Project } from "../../types";

interface Props {
  icon: ReactNode;
  handleProjectSelection: (project: Project) => void;
  project: Project;
}

export default function SidebarMainFilter({
  icon,
  project,
  handleProjectSelection,
}: Props) {
  return (
    <button
      className="flex items-center gap-2 text-[0.9em] font-semibold tracking-wide text-light-primaryText capitalize"
      onClick={() => handleProjectSelection(project)}
    >
      {icon}
      {project.title}
    </button>
  );
}
