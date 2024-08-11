import { useState } from "react";
import { Label, Project } from "../../types";

interface Props {
  activeProject: Project | null;
  activeLabel: Label | null | undefined;
  setView: (view: string) => void;
}

export default function Topbar({ activeProject, activeLabel, setView }: Props) {
  const [isViewPickerOpen, setIsViewPickerActive] = useState(false);
  function handleViewButtonClick() {
    setIsViewPickerActive(!isViewPickerOpen);
  }

  return (
    <div className="col-start-3 col-end-4 flex h-[4rem] w-[70vw] items-center justify-between border-gray-200 bg-light-mainBackground pl-14 pt-7">
      <p className="flex items-center gap-3 text-3xl font-medium tracking-wide text-light-primaryText">
        {activeProject?.title || activeLabel?.title}
      </p>
      <div className="relative flex gap-4">
        <div
          role="button"
          className="text-sm font-semibold text-light-primaryText"
          tabIndex={0}
          onClick={handleViewButtonClick}
        >
          View
        </div>
        <div
          role="button"
          className="text-sm font-semibold text-light-primaryText"
          tabIndex={0}
        >
          Filter
        </div>
        {isViewPickerOpen && (
          <div className="menu-dropdown-content absolute z-10 mt-5 h-16 w-16 rounded-xl bg-slate-300 p-2 text-start">
            <div
              className="text-sm text-light-primaryText"
              role="button"
              onClick={() => setView("list")}
            >
              List
            </div>
            <div
              className="text-sm text-light-primaryText"
              role="button"
              onClick={() => setView("board")}
            >
              Board
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
