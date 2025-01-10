"use client";
import { useProjects } from "@/components/context/ProjectContext";
import DashLoad from "@/components/dashboard/dash-load";
import Data from "@/components/dashboard/Data";
import { FileStructure } from "@/components/dashboard/filestructure-tree";
import Tasks from "@/components/dashboard/task";
import { ChartTasks } from "@/components/dashboard/task-complexity-chart";

export default function DashboardPage() {
  const { currentProject } = useProjects();
  if (!currentProject) return <DashLoad soon={false} />;
  return (
    <div>
      <div className="p-4">
        {/* row 1 */}
        <div className="p-2 h-[70%] w-full flex lg:flex-row flex-col lg:space-x-4 space-y-4 lg:space-y-0">
          <div className="bg-neutral-900/[0.15] border border-white/[0.2] rounded-xl xl:w-[75%] lg:w-[60%] w-full h-full">
            <ChartTasks />
          </div>
          <div className="bg-neutral-900/[0.15] border border-white/[0.2] rounded-xl xl:w-[25%] lg:w-[40%] w-full h-auto">
            <Tasks />
          </div>
        </div>
        {/* row 2 */}
        <div className="p-2 h-[30%] w-full flex lg:flex-row flex-col lg:space-x-4 space-y-4 lg:space-y-0 mt-4">
          <div className="bg-neutral-900/[0.15] border border-white/[0.2] rounded-xl xl:w-[80%] lg:w-[70%] w-full h-full">
            <Data />
          </div>
          <div className="bg-neutral-900/[0.15] border border-white/[0.2] rounded-xl xl:w-[20%] lg:w-[30%] w-full h-full">
            <FileStructure />
          </div>
        </div>
      </div>
    </div>
  );
}
