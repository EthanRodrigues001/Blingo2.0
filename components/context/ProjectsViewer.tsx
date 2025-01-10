"use client";

import { useProjects } from "@/components/context/ProjectContext";

const ProjectsViewer = () => {
  const {
    projects,
    currentProject,
    currentIndex,
    setCurrentIndex,
    // loading,
    error,
  } = useProjects();

  if (error) return <div>Error loading projects: {error}</div>;
  if (!currentProject) return <div>No projects found</div>;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentIndex(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <h1>Project Viewer</h1>
      <div>
        <label htmlFor="project-selector">Select a project:</label>
        <select
          id="project-selector"
          value={currentIndex}
          onChange={handleChange}
        >
          {projects.map((project, index) => (
            <option key={project.$id} value={index}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h2>{currentProject.name}</h2>
        <h3>{currentProject.description}</h3>
        <p>
          <strong>Field of Interest:</strong> {currentProject.fieldOfInterest}
        </p>
        <p>
          <strong>Target Sector:</strong> {currentProject.targetSector}
        </p>
        <p>
          <strong>Project Type:</strong> {currentProject.projectType}
        </p>
        <p>
          <strong>Complexity:</strong> {currentProject.complexity}
        </p>
        <p>
          <strong>Team Size:</strong> {currentProject.teamSize}
        </p>
        <p>
          <strong>Duration:</strong> {currentProject.duration}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(currentProject.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Updated At:</strong>{" "}
          {new Date(currentProject.updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ProjectsViewer;
