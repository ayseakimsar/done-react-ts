import { Label, Project } from "../../types";
import ProjectIcon from "../../icons/SecondarySidebar/ProjectIcon";

interface Props {
  activeProject: Project | null;
  activeLabel: Label | null | undefined;
}

export default function Topbar({ activeProject, activeLabel }: Props) {
  return (
    <div className="col-start-3 col-end-4 flex h-[60px] w-[85vw] items-center border-b-[1px] border-gray-200 bg-light-secondarySidebar px-14">
      <p className="text-md flex items-center gap-3 font-medium tracking-wide text-[#475569]">
        <ProjectIcon  />
        {activeProject?.title || activeLabel?.title}
      </p>
    </div>
  );
}
