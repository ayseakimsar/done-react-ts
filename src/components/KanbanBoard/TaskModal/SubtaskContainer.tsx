import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function SubtaskContainer({ children }: Props) {
  return (
    <li className="h-10 font-medium text-sm text-light-primaryText  dark:text-dark-primaryText  bg-light-subtask mt-2 rounded-lg shadow-sm">
      {children}
    </li>
  );
}
