import { ReactNode } from "react";
import { Id } from "../../types";

interface Props {
  icon: ReactNode;
  handleProjectSelection: (filterId: Id) => void;
  filterId: Id;
  filterName: string;
}

export default function SidebarMainFilter({
  icon,
  filterId,
  filterName,
  handleProjectSelection,
}: Props) {
  return (
    <button
      className="flex items-center gap-2 text-[0.87em] font-semibold tracking-wide text-light-primaryTextLight capitalize"
      onClick={() => handleProjectSelection(filterId)}
    >
      {icon}
      {filterName}
    </button>
  );
}
