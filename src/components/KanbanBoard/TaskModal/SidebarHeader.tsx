import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function SidebarHeader({ children }: Props) {
  return (
    <div className="text-[10px] font-light text-light-primaryTextLight uppercase tracking-[0.23em]">
      {children}
    </div>
  );
}
