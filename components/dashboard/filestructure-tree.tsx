"use client";

import { File, Folder, Tree } from "@/components/ui/file-tree";
import { useEffect, useState } from "react";
import { useProjects } from "../context/ProjectContext";

export function FileStructure() {
  const { currentProject } = useProjects();
  const [treeData, settreeData] = useState(
    currentProject?.file_structure
      ? JSON.parse(currentProject.file_structure)
      : []
  );
  useEffect(() => {
    settreeData(
      currentProject?.file_structure
        ? JSON.parse(currentProject.file_structure)
        : []
    );
  }, [currentProject?.file_structure]);

  // const treeData = JSON.parse(
  //   '[{"children":[{"id":"2","isSelectable":true,"name":"frontend"},{"id":"8","isSelectable":true,"name":"backend"}],"id":"1","isSelectable":true,"name":"src"},{"children":[{"id":"3","isSelectable":true,"name":"App.tsx"},{"id":"4","isSelectable":true,"name":"DashboardPage.jsx"},{"id":"5","isSelectable":true,"name":"components"},{"id":"11","isSelectable":true,"name":"styles.css"}],"id":"2","isSelectable":true,"name":"frontend"},{"children":[{"id":"6","isSelectable":true,"name":"Header.tsx"},{"id":"7","isSelectable":true,"name":"Footer.tsx"}],"id":"5","isSelectable":true,"name":"components"},{"children":[{"id":"9","isSelectable":true,"name":"apiRoutes.js"},{"id":"10","isSelectable":true,"name":"dbConfig.js"}],"id":"8","isSelectable":true,"name":"backend"}]'
  // );

  const renderTreeItems = (items) => {
    return items.map((item) => {
      if (item.children) {
        return (
          <Folder key={item.id} element={item.name} value={item.id}>
            {renderTreeItems(item.children)}
          </Folder>
        );
      } else {
        return (
          <File key={item.id} value={item.id}>
            <p>{item.name}</p>
          </File>
        );
      }
    });
  };
  return (
    <div className="relative flex  flex-col items-center justify-center overflow-hidden md:shadow-xl">
      <Tree
        className="overflow-hidden rounded-md p-2"
        initialSelectedId="1"
        initialExpandedItems={treeData.map((item) => item.id)}
        elements={treeData}
      >
        {renderTreeItems(treeData)}
      </Tree>
    </div>
  );
}
