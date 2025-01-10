import ProjectIdeaGenerator from "@/components/project-idea-generator";
import React from "react";

const page = () => {
  return (
    <div>
      <h2 className="scroll-m-20 pb-2 p-6 text-3xl font-semibold first:mt-0">
        Create New Project
      </h2>
      <ProjectIdeaGenerator />
    </div>
  );
};

export default page;
