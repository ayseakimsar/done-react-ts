import { useState } from "react";
import { Label, Project } from "../../types";
import ListIcon from "../../icons/Topbar/ListIcon";
import BoardIcon from "../../icons/Topbar/BoardIcon";
import ViewIcon from "../../icons/Topbar/ViewIcon";
import FilterIcon from "../../icons/Topbar/FilterIcon";

interface Props {
  activeProject: Project | null;
  activeLabel: Label | null | undefined;
  setView: (view: string) => void;
  view;
}

export default function Topbar({
  activeProject,
  activeLabel,
  setView,
  view,
}: Props) {
  const [isViewPickerOpen, setIsViewPickerActive] = useState(false);
  function handleViewButtonClick() {
    setIsViewPickerActive(!isViewPickerOpen);
  }

  return (
    <div className="col-start-3 col-end-4 flex h-[4rem] w-[70vw] items-center justify-between border-gray-200 bg-light-mainBackground pl-14 pt-7">
      <p className="flex items-center gap-3 text-3xl font-medium tracking-wide text-light-primaryText">
        {activeProject?.title || activeLabel?.title}
      </p>
      <div className="relative flex gap-6">
        <div
          role="button"
          className="flex items-center gap-2 text-sm font-semibold text-light-primaryText"
          tabIndex={0}
          onClick={handleViewButtonClick}
        >
          <ViewIcon />
          View
        </div>
        <div
          role="button"
          className="flex items-center gap-2 text-sm font-semibold text-light-primaryText"
          tabIndex={0}
        >
          <FilterIcon />
          Filter
        </div>
        {isViewPickerOpen && (
          <div className="menu-dropdown-content absolute top-3 z-10 mt-5 flex h-24 w-36 flex-col justify-center gap-1 rounded-xl bg-slate-200 p-2 text-start">
            <div
              role="button"
              className={`flex h-12 w-full items-center gap-2 rounded-[5px] px-2 pt-1 text-sm font-semibold text-light-primaryTextLight ${view === "list" ? "bg-white" : ""}`}
              role="button"
              onClick={() => setView("list")}
            >
              <ListIcon />
              List
            </div>
            <div
              className={`flex h-12 w-full items-center gap-2 rounded-[5px] px-2 pt-1 text-sm font-semibold text-light-primaryTextLight ${view === "board" ? "bg-white" : ""}`}
              role="button"
              onClick={() => setView("board")}
            >
              <BoardIcon />
              Board
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
