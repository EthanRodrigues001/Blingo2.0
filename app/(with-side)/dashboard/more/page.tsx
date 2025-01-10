"use client";

import { BarChart3, Users, Clock, Activity } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects } from "@/components/context/ProjectContext";

export default function DashboardPage() {
  const { currentProject } = useProjects();

  if (!currentProject) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen p-4">
      {/* Top row stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-neutral-900/[0.15] border border-white/[0.2] rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-gray-400 text-sm">Team Members</h3>
              <p className="text-2xl font-semibold text-white">
                {currentProject.teamSize}
              </p>
            </div>
            <div className="bg-red-500/10 p-3 rounded-lg">
              <Users className="h-6 w-6 text-red-500" />
            </div>
          </div>
          <div className="text-sm text-gray-400">Active contributors</div>
        </div>

        <div className="bg-neutral-900/[0.15] border border-white/[0.2] rounded-xl rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-gray-400 text-sm">Project Duration</h3>
              <p className="text-2xl font-semibold text-white">
                {currentProject.duration}
              </p>
            </div>
            <div className="bg-red-500/10 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-red-500" />
            </div>
          </div>
          <div className="text-sm text-gray-400">Time allocated</div>
        </div>

        <div className="bg-neutral-900/[0.15] border border-white/[0.2] rounded-xl rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-gray-400 text-sm">Complexity Level</h3>
              <p className="text-2xl font-semibold text-white">
                {currentProject.complexity}
              </p>
            </div>
            <div className="bg-red-500/10 p-3 rounded-lg">
              <Activity className="h-6 w-6 text-red-500" />
            </div>
          </div>
          <div className="text-sm text-gray-400">Project scale</div>
        </div>
      </div>

      {/* Bottom panel */}
      <div className="bg-neutral-900/[0.15] border border-white/[0.2] rounded-xl p-6 shadow-lg flex-1 min-h-[calc(100vh-13rem)] overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Project Details
            </h2>
            <p className="text-gray-400 leading-7">
              Technical stack and specifications
            </p>
          </div>
          <div className="bg-red-500/10 p-3 rounded-lg">
            <BarChart3 className="h-6 w-6 text-red-500" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 h-full">
          <div className="h-full">
            <h3 className="text-lg font-semibold text-white mb-6">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {currentProject.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-red-500/10 text-red-500 rounded-xl text-sm hover:bg-red-500/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="h-full">
            <h3 className="text-lg font-semibold text-white mb-6">
              Project Information
            </h3>
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="p-4 bg-neutral-900/[0.15] border border-white/[0.2] rounded-xl">
                  <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold  block mb-1">
                    Field of Interest:
                  </span>
                  <span className="text-white text-lg">
                    {currentProject.fieldOfInterest}
                  </span>
                </div>
                <div className="p-4 bg-neutral-900/[0.15] border border-white/[0.2] rounded-xl">
                  <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold  block mb-1">
                    Target Sector:
                  </span>
                  <span className="text-white text-lg">
                    {currentProject.targetSector}
                  </span>
                </div>
                <div className="p-4 bg-neutral-900/[0.15] border border-white/[0.2] rounded-xl">
                  <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold  block mb-1">
                    Project Type:
                  </span>
                  <span className="text-white text-lg">
                    {currentProject.projectType}
                  </span>
                </div>
                <div className="p-4 bg-neutral-900/[0.15] border border-white/[0.2] rounded-xl">
                  <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold block mb-1">
                    Last Updated:
                  </span>
                  <span className="text-white text-lg">
                    {new Date(currentProject.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-neutral-900/[0.15] border border-white/[0.2] rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <Skeleton className="h-4 w-24 " />
                <Skeleton className="h-8 w-16 mt-2 " />
              </div>
              <Skeleton className="h-12 w-12 rounded-lg " />
            </div>
            <Skeleton className="h-4 w-32 " />
          </div>
        ))}
      </div>

      <div className="bg-neutral-900/[0.15] border border-white/[0.2] rounded-xl p-6 shadow-lg flex-1 min-h-[calc(100vh-13rem)]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Skeleton className="h-6 w-48 " />
            <Skeleton className="h-4 w-64 mt-2 " />
          </div>
          <Skeleton className="h-12 w-12 rounded-lg " />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Skeleton className="h-6 w-40 mb-6 " />
            <div className="flex flex-wrap gap-3">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-24 rounded-full " />
              ))}
            </div>
          </div>

          <div>
            <Skeleton className="h-6 w-48 mb-6 " />
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="p-4 bg-neutral-900/[0.15] border border-white/[0.2] rounded-xl"
                >
                  <Skeleton className="h-4 w-32 mb-2 " />
                  <Skeleton className="h-6 w-48 " />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
