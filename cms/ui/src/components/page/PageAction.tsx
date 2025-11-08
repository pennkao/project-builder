import { ReactNode } from "react";
export default function PageAction({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-between gap-5 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center dark:border-gray-800">
      {children}
    </div>
  );
}
