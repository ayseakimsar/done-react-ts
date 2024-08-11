import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export default function SecondarySidebarHeader({ children }: Readonly<Props>) {
  return (
    <div className="mb-1 pl-5 text-[0.7em] font-light uppercase tracking-[0.23em] text-light-primaryTextLight">
      {children}
    </div>
  );
}
