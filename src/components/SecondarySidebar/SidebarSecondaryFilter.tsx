import ProjectIcon from "../../icons/SecondarySidebar/ProjectIcon";
import { Label, Project } from "../../types";

interface Props {
  filter: Project | Label;
  handleFilterSelection: (filter: Project | Label) => void;
}

export default function SidebarProjectFilter({
  filter,
  handleFilterSelection,
}: Props) {
  return (
    <button onClick={() => handleFilterSelection(filter)}>
      <div className="flex items-center gap-2 text-[0.83em] font-semibold tracking-wide text-light-primaryTextLight">
        <ProjectIcon color="#6c7787" />
        <div>{filter.title}</div>
      </div>
    </button>
  );
}
