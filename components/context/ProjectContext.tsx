"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useUser } from "./UserContext";

// import { useLoading } from "./LoadingContext";

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
  createdAt: string;
  updatedAt: string;
  ownerId: {
    id: string;
    displayName: string;
    email: string;
    photo: string | null;
    plan: string;
    $id: string;
  };
  collaborators: string[];
  flowchartFeature: boolean;
  file_structure: string;
  data: string;
  tasks: string[];
  description: string;
}

interface ProjectsContextType {
  projects: Project[];
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  loading: boolean;
  error: string | null;
  refreshProjects: () => void;
  planLimit: number;
  isPlanLimitFull: boolean;
}

interface ProjectsProviderProps {
  children: ReactNode;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined
);

export const ProjectsProvider: React.FC<ProjectsProviderProps> = ({
  children,
}) => {
  const { user } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [planLimit, setPlanLimit] = useState<number>(0);
  const [isPlanLimitFull, setIsPlanLimitFull] = useState<boolean>(false);
  const [currentProject, setCurrentProjectState] = useState<Project | null>(
    null
  );
  //   const { toggleLoading } = useLoading();

  const fetchProjects = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/projects?userId=${user.$id}`
      );
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      console.log("Project Data:", data);
      setProjects(data.projects);
      setLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to fetch projects");
      }
      setLoading(false);
      //   toggleLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user, fetchProjects]);

  useEffect(() => {
    setCurrentProjectState(projects[currentIndex] || null);
  }, [currentIndex, projects]);

  // Set plan limit based on user plan
  useEffect(() => {
    if (user) {
      if (user) {
        const planLimits: { free: number; pro: number; enterprise: number } = {
          free: 2,
          pro: 6,
          enterprise: 14,
        };

        const limit = planLimits[user.plan as keyof typeof planLimits] || 0;
        setPlanLimit(limit);
      }
    }
  }, [user]);

  // Update isPlanLimitFull based on the current number of projects
  useEffect(() => {
    setIsPlanLimitFull(projects.length >= planLimit);
  }, [projects, planLimit]);

  const setCurrentProject = (project: Project | null) => {
    setCurrentProjectState(project);
    if (project) {
      const updatedProjects = projects.map((p) =>
        p.$id === project.$id ? project : p
      );
      setProjects(updatedProjects);
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        loading,
        error,
        currentProject,
        setCurrentProject,
        currentIndex,
        setCurrentIndex,
        refreshProjects: fetchProjects,
        planLimit,
        isPlanLimitFull,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};
