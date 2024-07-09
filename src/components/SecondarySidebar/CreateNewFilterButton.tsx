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
      className="flex items-center gap-3 text-[0.83em] font-semibold tracking-wide text-light-brand"
      onClick={createNewFilter}
    >
      <ProjectIcon color="#93C5FD" />
      <span>+ New {filterType}</span>
    </button>
  );
}
