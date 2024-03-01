import { useState } from "react";
import { Id, Project } from "../../types";
import { initialProjectData } from "../../initialData";
import { generateId } from "../../utils/generateId";
import InboxIcon from "../../icons/SecondarySidebar/InboxIcon";
import TodayIcon from "../../icons/SecondarySidebar/TodayIcon";
import UpcomingIcon from "../../icons/SecondarySidebar/UpcomingIcon";
import SidebarMainFilter from "./SidebarMainFilter";
import SidebarProjectFilter from "./SidebarProjectFilter";
import CreateNewProjectButton from "./CreateNewProjectButton";

interface Props {
  handleProjectSelection: (projectId: Id) => void;
}

export default function SecondarySidebar({ handleProjectSelection }: Props) {
  const [projects, setProjects] = useState<Project[]>(initialProjectData);

  function createNewProject() {
    const newProject = {
      id: generateId(),
      title: `Project ${projects.length + 1}`,
    };
    setProjects([...projects, newProject]);
  }

  return (
    <div className="w-[220px] h-[100vh] bg-light-secondarySidebar p-8 flex flex-col gap-5">
      {/*To dos*/}
      <div>
        <div className="text-[0.7em] font-light text-light-primaryTextLight uppercase tracking-[0.23em]">
          To Do
        </div>
        <div className="flex flex-col gap-3">
          <SidebarMainFilter
            icon={<InboxIcon />}
            handleProjectSelection={handleProjectSelection}
            filterName="inbox"
            filterId={"inbox"}
          />
          <SidebarMainFilter
            icon={<TodayIcon />}
            handleProjectSelection={handleProjectSelection}
            filterName="today"
            filterId={"today"}
          />

          <SidebarMainFilter
            icon={<UpcomingIcon />}
            handleProjectSelection={handleProjectSelection}
            filterName="upcoming"
            filterId={"upcoming"}
          />
        </div>
      </div>

      {/*Projects*/}
      <div className="flex flex-col gap-5 ">
        <div className="text-[0.7em] font-light text-light-primaryTextLight uppercase tracking-[0.23em]">
          Projects
        </div>
        <div className="flex flex-col gap-5">
          {projects.map((project) => (
            <SidebarProjectFilter
              key={project.id}
              projectId={project.id}
              projectTitle={project.title}
              handleProjectSelection={handleProjectSelection}
            />
          ))}
          <CreateNewProjectButton createNewProject={createNewProject} />
        </div>
      </div>
      {/*Projects*/}
    </div>
  );
}
