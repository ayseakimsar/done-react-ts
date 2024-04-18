import ProjectIcon from "../../icons/SecondarySidebar/ProjectIcon";
import { Project } from "../../types";

interface Props {
  project: Project;
  handleProjectSelection: (project: Project) => void;
}

export default function SidebarProjectFilter({
  project,
  handleProjectSelection,
}: Props) {
  return (
    <button onClick={() => handleProjectSelection(project)}>
      <div className="flex items-center gap-2 text-[0.83em] font-semibold tracking-wide text-light-primaryTextLight">
        <ProjectIcon color="#6c7787" />
        <div>{project.title}</div>
      </div>
    </button>
  );
}
