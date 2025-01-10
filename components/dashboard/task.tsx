"use client";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Clock, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useProjects } from "../context/ProjectContext";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Task {
  id: string;
  task_name: string;
  complexity: number;
  task_done: boolean;
}

export default function Tasks() {
  const { currentProject, setCurrentProject } = useProjects();
  const [parsedTasks, setParsedTasks] = useState<Task[]>(
    currentProject?.tasks
      ? currentProject.tasks.map((task) => JSON.parse(task) as Task)
      : []
  );

  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  useEffect(() => {
    setParsedTasks(
      currentProject?.tasks
        ? currentProject.tasks.map((task) => JSON.parse(task) as Task)
        : []
    );
  }, [currentProject?.tasks]);

  const toggleTaskStatus = async (taskId: string) => {
    const updatedTasks = parsedTasks.map((task) =>
      task.id === taskId ? { ...task, task_done: !task.task_done } : task
    );

    setParsedTasks(updatedTasks);
    setOpenPopoverId(null);

    const stringifiedTasks = updatedTasks.map((task) => JSON.stringify(task));

    if (currentProject) {
      const updatedProject = {
        ...currentProject,
        tasks: stringifiedTasks,
      };

      setCurrentProject(updatedProject);

      try {
        const response = await fetch("/api/v1/update-tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectId: currentProject.$id,
            tasks: stringifiedTasks,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update tasks");
        }

        const data = await response.json();
        console.log("Tasks updated successfully:", data);
      } catch (error) {
        console.error("Error updating tasks:", error);
        // Revert the changes if the update fails
        setParsedTasks(parsedTasks);
      }
    }
  };

  const completedTasks = parsedTasks.filter((task) => task.task_done).length;
  return (
    <div className={cn("w-full mx-auto", "shadow-lg h-full")}>
      <div className="p-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
            Project Tasks
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
            {completedTasks}/{parsedTasks.length} done
          </span>
        </div>
      </div>

      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {parsedTasks.map((task) => (
          <div key={task.id} className="p-3 flex items-center gap-3 group">
            <div className="flex-none">
              {task.task_done ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : (
                <Circle className="w-5 h-5 text-zinc-300 dark:text-zinc-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p
                  className={`text-sm ${
                    task.task_done
                      ? "text-zinc-400 dark:text-zinc-500 line-through"
                      : "text-zinc-900 dark:text-zinc-100"
                  }`}
                >
                  {task.task_name}
                </p>
              </div>
              {!task.task_done && (
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-xs text-zinc-500">
                      Complexity : {task.complexity}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <Popover
              open={openPopoverId === task.id}
              onOpenChange={(open) => setOpenPopoverId(open ? task.id : null)}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreHorizontal className="w-5 h-5 text-zinc-400" />
                  <span className="sr-only">Toggle task status</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <div className="text-sm font-medium mb-2">
                  {task.task_done ? "Mark as incomplete?" : "Mark as complete?"}
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setOpenPopoverId(null)}
                  >
                    Cancel
                  </Button>
                  <Button size="sm" onClick={() => toggleTaskStatus(task.id)}>
                    Yes
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </div>
    </div>
  );
}
