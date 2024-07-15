import UserIcon from "../../icons/MainSidebar/UserIcon";
import ToDoPageIcon from "../../icons/MainSidebar/ToDoPageIcon";
import HabitPageIcon from "../../icons/MainSidebar/HabitPageIcon";
import ArchievePageIcon from "../../icons/MainSidebar/ArchievePageIcon";
import DarkModeButton from "../../icons/MainSidebar/DarkModeButton";
import HelpIcon from "../../icons/MainSidebar/HelpIcon";

export default function MainSidebar() {
  return (
    <div className="col-start-1 col-end-2 row-start-1 row-end-3 flex h-[100vh] w-[60px] flex-col items-center bg-light-mainSidebar pt-5">
      <UserIcon />
      <div className="mt-[4.2rem] flex flex-col gap-4">
        <ToDoPageIcon />
        <HabitPageIcon />
        <ArchievePageIcon />
      </div>
      <div className="mt-[20rem] flex flex-col items-center gap-3">
        <DarkModeButton />
        <HelpIcon />
      </div>
    </div>
  );
}
