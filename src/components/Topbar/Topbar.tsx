import { Project } from "../../types";
import ProjectIcon from "../../icons/SecondarySidebar/ProjectIcon";

interface Props {
  activeProject: Project;
}

export default function Topbar({ activeProject }: Props) {
  return (
    <div className="col-start-3 col-end-4 h-[60px] w-[85vw] bg-light-secondarySidebar flex px-14 items-center border-b-[1px] border-gray-200 ">
      <p className="text-[#475569] font-medium text-lg tracking-wider flex items-center gap-3">
        <ProjectIcon color="#475569" />
        {activeProject.title}
      </p>
    </div>
  );
}
