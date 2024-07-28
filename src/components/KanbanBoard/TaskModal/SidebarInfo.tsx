import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function SidebarInfo({ children }: Props) {
  return (
    <button className="h-[auto] px-3 text-[14px] font-medium tracking-[0.07em] text-light-primaryText dark:text-dark-primaryText">
      {children}
    </button>
  );
}
