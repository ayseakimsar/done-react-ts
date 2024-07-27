import LabelIcon from "../../icons/SecondarySidebar/LabelIcon";
import ProjectIcon from "../../icons/SecondarySidebar/ProjectIcon";

interface Props {
  createNewFilter: () => void;
  filterType: string;
}

export default function CreateNewProjectButton({
  createNewFilter,
  filterType,
}: Props) {
  return (
    <button
      className="flex items-center gap-3 py-2 pl-7 text-[0.83em] font-semibold tracking-wide text-light-brand"
      onClick={createNewFilter}
    >
      {filterType === "project" ? (
        <ProjectIcon color="#93C5FD" />
      ) : (
        <LabelIcon color="#93C5FD" />
      )}
      <span>+ New {filterType}</span>
    </button>
  );
}
