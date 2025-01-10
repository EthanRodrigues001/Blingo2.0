"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/components/context/UserContext";
import LogoutButton from "@/components/LogoutButton";

export default function DashboardPage() {
  const { user, loading, error } = useUser();

  interface Owner {
    id: string;
    displayName: string;
    email: string;
    plan: string;
  }

  interface Project {
    $id: string;
    name: string;
    fieldOfInterest: string;
    stack: string[];
    targetSector: string;
    projectType: string;
    complexity: string;
    teamSize: number;
    duration: string;
    ownerId: Owner;
    createdAt: string;
    updatedAt: string;
    tasks: string[];
  }

  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      if (user?.user?.$id) {
        try {
          setProjectsLoading(true);
          const response = await fetch(
            `http://localhost:3000/api/v1/projects?userId=${user.user.$id}`
          );
          if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
          const data = await response.json();
          setProjects(data.projects || []);
        } catch (err) {
          console.error("Failed to fetch user projects:", err);
        } finally {
          setProjectsLoading(false);
        }
      }
    };

    fetchProjects();
  }, [user]);

  if (loading) return <div>Loading user data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user?.user) return <div>User not found. Please log in.</div>;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <LogoutButton />
      <p className="text-2xl">User ID: {user.user.$id}</p>
      <p className="text-2xl">Welcome to your dashboard!</p>
      <h2 className="text-3xl font-semibold mt-8">Projects</h2>
      {projectsLoading ? (
        <p>Loading projects...</p>
      ) : projects.length > 0 ? (
        <ul className="space-y-4">
          {projects.map((project, index) => (
            <li
              key={project.$id}
              className="p-4 border border-gray-300 rounded-md shadow-sm"
            >
              <h4 className="text-lg font-semibold">{index + 1}</h4>
              <h3 className="text-xl font-bold">{project.name}</h3>
              <p>Field of Interest: {project.fieldOfInterest}</p>
              <p>Stack: {project.stack.join(", ")}</p>
              <p>Target Sector: {project.targetSector}</p>
              <p>Project Type: {project.projectType}</p>
              <p>Complexity: {project.complexity}</p>
              <p>Team Size: {project.teamSize}</p>
              <p>Duration: {project.duration}</p>
              <p>Tasks: {project.tasks.join(", ")}</p>
              <p>
                Owner: {project.ownerId.displayName} ({project.ownerId.email})
              </p>
              <p>Created At: {new Date(project.createdAt).toLocaleString()}</p>
              <p>
                Last Updated: {new Date(project.updatedAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
}
