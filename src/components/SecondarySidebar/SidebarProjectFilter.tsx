import ProjectIcon from "../../icons/SecondarySidebar/ProjectIcon";
import { Id } from "../../types";

interface Props {
  projectId: Id;
  projectTitle: string;
  handleProjectSelection: (projectId: Id) => void;
}

export default function SidebarProjectFilter({
  projectId,
  projectTitle,
  handleProjectSelection,
}: Props) {
  return (
    <button onClick={() => handleProjectSelection(projectId)}>
      <div className="flex items-center gap-2 text-[0.83em] font-semibold tracking-wide text-light-primaryTextLight">
        <ProjectIcon color="#6c7787" />
        <div>{projectTitle}</div>
      </div>
    </button>
  );
}
