import { useEffect, useRef, useState } from "react";
import LabelIcon from "../../icons/SecondarySidebar/LabelIcon";
import ProjectIcon from "../../icons/SecondarySidebar/ProjectIcon";
import { Id, Label, Project } from "../../types";
import TrashIcon from "../../icons/KanbanBoard/TrashIcon";

interface Props {
  filter: Project | Label;
  handleFilterSelection: (filter: Project | Label) => void;
  updateLabelTitle: (labelId: Id, newTitle: string) => void;
  updateProjectTitle: (projectId: Id, newTitle: string) => void;
  deleteProject: (projectId: Id) => void;
  deleteLabel: (labelId: Id) => void;
}

export default function SidebarProjectFilter({
  filter,
  handleFilterSelection,
  updateLabelTitle,
  updateProjectTitle,
  deleteProject,
  deleteLabel,
}: Props) {
  const [editMode, setEditMode] = useState(false);
  const [isFilterHovered, setIsFilterHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.select();
    }
  }, [editMode]);

  function handleTitleUpdate(title: string) {
    if (filter.type === "label") updateLabelTitle(filter.id, title);
    if (filter.type === "project") updateProjectTitle(filter.id, title);
  }

  function handleDelete() {
    if (filter.type === "project") deleteProject(filter.id);
    if (filter.type === "label") deleteLabel(filter.id);
  }

  return (
    <button
      className="pr-2"
      onClick={() => handleFilterSelection(filter)}
      onMouseEnter={() => setIsFilterHovered(true)}
      onMouseLeave={() => setIsFilterHovered(false)}
    >
      <div className="flex h-10 items-center justify-between gap-3 px-3 py-3 text-[0.83em] font-semibold tracking-wide text-light-primaryTextLight transition-all duration-300 hover:rounded-r-full hover:bg-light-mainSidebar">
        <div className="flex items-center gap-2">
          <div>
            {filter.type === "project" ? <ProjectIcon /> : <LabelIcon />}
          </div>
          <div
            className="w-[130px] text-start"
            onDoubleClick={() => setEditMode(true)}
            onBlur={() => setEditMode(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setEditMode(false);
            }}
          >
            {editMode ? (
              <input
                type="text"
                value={filter.title}
                placeholder=""
                ref={inputRef}
                className="text-md input input-sm input-bordered w-full max-w-xs bg-light-mainSidebar font-semibold tracking-wide text-light-primaryTextLight"
                onChange={(e) => handleTitleUpdate(e.target.value)}
              />
            ) : filter.title === "" ? (
              <div>&nbsp;</div> // nonbreakable space, it is for the div not to be empty, in case new title is empty.
            ) : (
              filter.title
            )}
          </div>
        </div>

        <div
          className={`flex gap-1 ${isFilterHovered ? "opacity-100" : "opacity-0"} transition-all duration-100 ease-linear`}
          onClick={() => handleDelete()}
        >
          <TrashIcon />
        </div>
      </div>
    </button>
  );
}
