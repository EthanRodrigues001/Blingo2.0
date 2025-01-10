// "use client";

import ProjectsViewer from "@/components/context/ProjectsViewer";

export default function Dashboard() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <ProjectsViewer />
      </div>
    </>
  );
}
