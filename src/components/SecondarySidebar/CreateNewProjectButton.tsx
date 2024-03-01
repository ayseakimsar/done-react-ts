import ProjectIcon from "../../icons/SecondarySidebar/ProjectIcon";

interface Props {
  createNewProject: () => void;
}

export default function CreateNewProjectButton({ createNewProject }: Props) {
  return (
    <button
      className="flex items-center gap-3 text-light-brand text-[0.83em] font-semibold tracking-wide"
      onClick={createNewProject}
    >
      <ProjectIcon color="#93C5FD" />
      <span>+ New Project</span>
    </button>
  );
}
