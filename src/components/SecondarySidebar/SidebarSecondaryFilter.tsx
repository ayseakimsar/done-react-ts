import { useEffect, useRef, useState } from "react";
import LabelIcon from "../../icons/SecondarySidebar/LabelIcon";
import ProjectIcon from "../../icons/SecondarySidebar/ProjectIcon";
import { Id, Label, Project } from "../../types";
import TrashIcon from "../../icons/KanbanBoard/TrashIcon";
import { labelColors } from "../../labelColors";

interface Props {
  filter: Project | Label;
  handleFilterSelection: (filter: Project | Label) => void;
  updateLabelTitle: (labelId: Id, newTitle: string) => void;
  updateProjectTitle: (projectId: Id, newTitle: string) => void;
  updateLabelColor: (labelId: Id, color: string) => void;
  deleteProject: (projectId: Id) => void;
  deleteLabel: (labelId: Id) => void;
}

export default function SidebarProjectFilter({
  filter,
  handleFilterSelection,
  updateLabelTitle,
  updateLabelColor,
  updateProjectTitle,
  deleteProject,
  deleteLabel,
}: Props) {
  const [editMode, setEditMode] = useState(false);
  const [isFilterHovered, setIsFilterHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const colorPickerRef = useRef(null);

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.select();
    }
  }, [editMode]);

  function handleLabelIconClick(event: React.ChangeEvent<HTMLInputElement>) {
    event.stopPropagation();
    setIsColorPickerOpen(!isColorPickerOpen);
  }
  function handleLabelColorSelection(col: string) {
    updateLabelColor(filter.id, col);
    setIsColorPickerOpen(false);
  }
  function handleTitleUpdate(title: string) {
    if (filter.type === "label") updateLabelTitle(filter.id, title);
    if (filter.type === "project") updateProjectTitle(filter.id, title);
  }
  function handleDelete() {
    if (filter.type === "project") deleteProject(filter.id);
    if (filter.type === "label") deleteLabel(filter.id);
  }
  function handleClickOutsideColorPicker(e) {
    if (colorPickerRef.current && !colorPickerRef.current.contains(e.target)) {
      setIsColorPickerOpen(false);
    }
  }
  useEffect(() => {
    // Attach the event listener when the component is mounted
    document.addEventListener("mousedown", handleClickOutsideColorPicker);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideColorPicker);
    };
  }, []);

  return (
    <button
      className="pr-2"
      onClick={() => handleFilterSelection(filter)}
      onMouseEnter={() => setIsFilterHovered(true)}
      onMouseLeave={() => setIsFilterHovered(false)}
    >
      <div className="flex h-10 items-center justify-between pl-7 text-[0.83em] font-semibold tracking-wide text-light-primaryText transition-all duration-300 hover:rounded-r-full hover:bg-light-mainSidebar">
        <div
          className="flex h-[1.9rem] w-40 items-center gap-2 rounded-xl px-3"
          style={{ backgroundColor: filter.color }}
        >
          <div
            role="button"
            tabIndex={0}
            className="flex h-7 w-10 items-center justify-center rounded-xl duration-300 hover:bg-[#00000012]"
            onClick={(e) => handleLabelIconClick(e)}
          >
            {filter.type === "project" ? <ProjectIcon /> : <LabelIcon />}
          </div>
          <div
            className="relative left-[-2rem] top-[1rem]"
            ref={colorPickerRef}
          >
            {isColorPickerOpen && (
              <div className="menu dropdown-content absolute z-10 grid grid-cols-3 gap-4 rounded-xl bg-[#fff] p-3 shadow">
                {labelColors.map((col) => (
                  <div
                    onClick={() => handleLabelColorSelection(col)}
                    role="button"
                    className="h-3 w-3 justify-self-center rounded-full transition-all hover:shadow-md"
                    style={{ backgroundColor: col }}
                  ></div>
                ))}{" "}
              </div>
            )}
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
                className="text-md b input input-sm h-6 bg-transparent font-semibold tracking-wide text-light-primaryTextLight focus:border-none focus:outline-none"
                onChange={(e) => handleTitleUpdate(e.target.value)}
              />
            ) : filter.title === "" ? (
              <div>&nbsp;</div> // nonbreakable space, it is for the div not to be empty, in case new title is empty.
            ) : (
              <div>{filter.title}</div>
            )}
          </div>
        </div>
        {/* Delete Button */}
        <div
          className={`flex gap-1 ${isFilterHovered ? "opacity-100" : "opacity-0"} transition-all duration-100 ease-linear`}
          onClick={() => handleDelete()}
          tabIndex={0}
          onFocus={() => setIsFilterHovered(true)}
          onBlur={() => setIsFilterHovered(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleDelete();
            }
          }}
        >
          <TrashIcon />
        </div>
      </div>
    </button>
  );
}
