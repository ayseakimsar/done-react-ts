import { Project } from "../../types";
import InboxIcon from "../../icons/SecondarySidebar/InboxIcon";
import TodayIcon from "../../icons/SecondarySidebar/TodayIcon";
import UpcomingIcon from "../../icons/SecondarySidebar/UpcomingIcon";
import SidebarMainFilter from "./SidebarMainFilter";
import SidebarProjectFilter from "./SidebarProjectFilter";
import CreateNewProjectButton from "./CreateNewProjectButton";

interface Props {
  handleProjectSelection: (project: Project) => void;
  createNewProject: () => void;
  projects: Project[];
}

export default function SecondarySidebar({
  handleProjectSelection,
  createNewProject,
  projects,
}: Props) {
  return (
    <div className="border-r-[1px] border-gray-200 col-start-2 col-end-3  row-start-1 row-end-3  w-[200px] h-[100vh] bg-light-secondarySidebar p-8 flex flex-col gap-[5rem] pt-[3rem]">
      {/*Main filters*/}
      <div className="flex flex-col gap-4 ">
        <div className="text-[0.7em] font-light text-light-primaryTextLight uppercase tracking-[0.23em]">
          To Do
        </div>
        <div className="flex flex-col gap-3">
          <SidebarMainFilter
            icon={<InboxIcon />}
            handleProjectSelection={handleProjectSelection}
            project={projects.filter((project) => project.id === "inbox")[0]}
          />
          <SidebarMainFilter
            icon={<TodayIcon />}
            handleProjectSelection={handleProjectSelection}
            project={projects.filter((project) => project.id === "today")[0]}
          />

          <SidebarMainFilter
            icon={<UpcomingIcon />}
            handleProjectSelection={handleProjectSelection}
            project={projects.filter((project) => project.id === "upcoming")[0]}
          />
        </div>
      </div>
      {/*Main filters*/}

      {/*Projects*/}
      <div className="flex flex-col gap-5 ">
        <div className="text-[0.7em] font-light text-light-primaryTextLight uppercase tracking-[0.23em]">
          Projects
        </div>
        <div className="flex flex-col gap-5">
          {projects.map((project) => {
            return (
              project.type === "project" && (
                <SidebarProjectFilter
                  key={project.id}
                  project={project}
                  handleProjectSelection={handleProjectSelection}
                />
              )
            );
          })}
          <CreateNewProjectButton createNewProject={createNewProject} />
        </div>
      </div>
      {/*Projects*/}

      {/*Filters*/}
      <div></div>
      {/*Filters*/}
    </div>
  );
}
