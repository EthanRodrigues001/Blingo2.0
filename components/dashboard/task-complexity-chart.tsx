"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { useProjects } from "../context/ProjectContext";

interface Task {
  id: string;
  task_name: string;
  complexity: number;
  task_done: boolean;
}

// // Mock data in the format provided
// const mockTaskData = [
//   '{"complexity":20,"id":"1","task_done":false,"task_name":"Setup Project"}',
//   '{"complexity":30,"id":"2","task_done":false,"task_name":"Design UI"}',
//   '{"complexity":25,"id":"3","task_done":false,"task_name":"Course Data"}',
//   '{"complexity":25,"id":"4","task_done":false,"task_name":"Implement Filtering"}',
//   '{"complexity":40,"id":"5","task_done":false,"task_name":"Integrate API"}',
//   '{"complexity":35,"id":"6","task_done":false,"task_name":"Testing"}',
// ];

// // Parse the JSON strings into objects
// const chartData = mockTaskData.map((task) => JSON.parse(task));

const chartConfig = {
  complexity: {
    label: "Complexity",
    color: "hsl(var(--chart-red))",
  },
} satisfies ChartConfig;

export function ChartTasks() {
  const { currentProject } = useProjects();
  const [chartData, setchartData] = useState<Task[]>(
    currentProject?.tasks
      ? currentProject.tasks.map((task) => JSON.parse(task) as Task)
      : []
  );
  useEffect(() => {
    setchartData(
      currentProject?.tasks
        ? currentProject.tasks.map((task) => JSON.parse(task) as Task)
        : []
    );
  }, [currentProject?.tasks]);

  //   const averageComplexity = (
  //     chartData.reduce((sum, task) => sum + task.complexity, 0) / chartData.length
  //   ).toFixed(2);

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>Task Complexity Chart</CardTitle>
        <CardDescription>
          Showing complexity levels for project tasks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="task_name"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 10) + "..."}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={[0, 100]}
                ticks={[0, 15, 30, 45, 60, 75, 90, 100]}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <defs>
                <linearGradient
                  id="colorComplexity"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-complexity)"
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="50%"
                    stopColor="var(--color-complexity)"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="98%"
                    stopColor="var(--color-complexity)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="complexity"
                stroke="var(--color-complexity)"
                fillOpacity={1}
                fill="url(#colorComplexity)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
