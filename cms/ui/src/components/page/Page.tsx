import { ReactNode } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
export default function Page({
  children,
  pageTitle,
}: {
  children: ReactNode;
  pageTitle: string;
}) {
  return (
    <div>
      <PageMeta title={pageTitle} description="" />
      <PageBreadcrumb pageTitle={pageTitle} />

      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white  dark:border-gray-800 dark:bg-white/[0.03] xl:px-0 xl:py-1">
        {children}
      </div>
    </div>
  );
}
