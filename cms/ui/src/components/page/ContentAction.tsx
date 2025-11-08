import { ReactNode } from "react";
export default function ContentAction({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-end gap-2 px-5 py-4">
      {children}
    </div>
  );
}
