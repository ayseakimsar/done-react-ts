import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function SidebarInfo({ children }: Props) {
  return (
    <button className=" font-medium text-[14px] text-light-primaryText  dark:text-dark-primaryText h-[auto] tracking-[0.07em]">
      {children}
    </button>
  );
}
