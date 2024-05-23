import { Label, Project } from "../../types";
import InboxIcon from "../../icons/SecondarySidebar/InboxIcon";
import TodayIcon from "../../icons/SecondarySidebar/TodayIcon";
import UpcomingIcon from "../../icons/SecondarySidebar/UpcomingIcon";
import SidebarMainFilter from "./SidebarMainFilter";
import SidebarSecondaryFilter from "./SidebarSecondaryFilter";
import CreateNewFilterButton from "./CreateNewFilterButton";
interface Props {
  handleProjectSelection: (project: Project) => void;
  handleLabelSelection: (label: Label) => void;
  createNewProject: () => void;
  createNewLabel: () => void;
  projects: Project[];
  labels: Label[];
}

export default function SecondarySidebar({
  handleProjectSelection,
  handleLabelSelection,
  createNewProject,
  createNewLabel,
  projects,
  labels,
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
                <SidebarSecondaryFilter
                  key={project.id}
                  filter={project}
                  handleFilterSelection={handleProjectSelection}
                />
              )
            );
          })}
          <CreateNewFilterButton
            createNewFilter={createNewProject}
            filterType={"project"}
          />
        </div>
      </div>
      {/*Projects*/}

      {/*Filters*/}
      <div className="flex flex-col gap-5 ">
        <div className="text-[0.7em] font-light text-light-primaryTextLight uppercase tracking-[0.23em] ">
          Filters & Tags
        </div>
        <div className="flex flex-col gap-5 ">
          {labels.map((label) => {
            return (
              <SidebarSecondaryFilter
                key={label.id}
                filter={label}
                handleFilterSelection={handleLabelSelection}
              />
            );
          })}
          <CreateNewFilterButton
            createNewFilter={createNewLabel}
            filterType={"label"}
          />
        </div>
      </div>
      {/*Filters*/}
    </div>
  );
}
