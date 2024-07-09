import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function SidebarHeader({ children }: Props) {
  return (
    <div className="text-[10px] font-light uppercase tracking-[0.23em] text-light-primaryTextLight">
      {children}
    </div>
  );
}
