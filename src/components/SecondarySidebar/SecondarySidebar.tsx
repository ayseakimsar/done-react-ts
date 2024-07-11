import { Id, Label, Project } from "../../types";
import InboxIcon from "../../icons/SecondarySidebar/InboxIcon";
import TodayIcon from "../../icons/SecondarySidebar/TodayIcon";
import UpcomingIcon from "../../icons/SecondarySidebar/UpcomingIcon";
import SidebarMainFilter from "./SidebarMainFilter";
import SidebarSecondaryFilter from "./SidebarSecondaryFilter";
import CreateNewFilterButton from "./CreateNewFilterButton";
import SecondarySidebarHeader from "./SecondarySidebarHeader";
interface Props {
  handleProjectSelection: (project: Project) => void;
  handleLabelSelection: (label: Label) => void;
  createNewProject: () => void;
  createNewLabel: () => void;
  projects: Project[];
  labels: Label[];
  updateLabelTitle: (labelId: Id, newTitle: string) => void;
  updateProjectTitle: (projectId: Id, newTitle: string) => void;
  deleteProject: (projectId: Id) => void;
  deleteLabel: (labelId: Id) => void;
}

export default function SecondarySidebar({
  handleProjectSelection,
  handleLabelSelection,
  createNewProject,
  createNewLabel,
  updateLabelTitle,
  updateProjectTitle,
  deleteProject,
  deleteLabel,
  projects,
  labels,
}: Props) {
  return (
    <div className="col-start-2 col-end-3 row-start-1 row-end-3 flex h-[100vh] w-[230px] flex-col gap-[4.2rem] border-r-[1px] border-gray-200 bg-light-secondarySidebar pt-[3rem]">
      {/*Main filters*/}
      <div className="flex flex-col gap-4">
        <SecondarySidebarHeader>To Do</SecondarySidebarHeader>
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
      <div className="flex flex-col gap-5">
        <SecondarySidebarHeader>Projects</SecondarySidebarHeader>
        <div className="flex flex-col">
          {projects.map((project) => {
            return (
              project.type === "project" && (
                <SidebarSecondaryFilter
                  key={project.id}
                  filter={project}
                  handleFilterSelection={handleProjectSelection}
                  updateLabelTitle={updateLabelTitle}
                  updateProjectTitle={updateProjectTitle}
                  deleteProject={deleteProject}
                  deleteLabel={deleteLabel}
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
      <div className="flex flex-col gap-5">
        <SecondarySidebarHeader>Filters & Tags</SecondarySidebarHeader>

        <div className="flex flex-col">
          {labels.map((label) => {
            return (
              <SidebarSecondaryFilter
                key={label.id}
                filter={label}
                handleFilterSelection={handleLabelSelection}
                updateLabelTitle={updateLabelTitle}
                updateProjectTitle={updateProjectTitle}
                deleteProject={deleteProject}
                deleteLabel={deleteLabel}
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
