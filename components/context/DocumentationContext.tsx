"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Documentation } from "@/actions/docs";

import { Documentation } from "@/actions/docs";

interface DocumentationContextType {
  allDocumentation: Record<string, Documentation>;
  saveDocumentation: (
    projectId: string,
    data: Documentation["data"],
    markdown: string
  ) => Promise<void>;
}

const DocumentationContext = createContext<
  DocumentationContextType | undefined
>(undefined);

export const DocumentationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [allDocumentation, setAllDocumentation] = useState<
    Record<string, Documentation>
  >({});

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const response = await fetch("/api/v1/database/docs");
        if (!response.ok) throw new Error("Failed to fetch documentation");
        const docs: Documentation[] = await response.json();
        setAllDocumentation(
          docs.reduce((acc, doc) => {
            acc[doc.projectId] = doc;
            return acc;
          }, {} as Record<string, Documentation>)
        );
      } catch (error) {
        console.error("Error fetching documentation:", error);
      }
    };
    fetchDocs();
  }, []);

  const saveDocumentation = async (
    projectId: string,
    data: Documentation["data"],
    markdown: string
  ) => {
    try {
      let response: Response;
      if (allDocumentation[projectId]) {
        response = await fetch("/api/v1/database/docs", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            docId: allDocumentation[projectId].$id,
            data,
            markdown,
          }),
        });
      } else {
        response = await fetch("/api/v1/database/docs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectId, data, markdown }),
        });
      }

      if (!response.ok) throw new Error("Failed to save documentation");
      const doc: Documentation = await response.json();
      setAllDocumentation((prev) => ({ ...prev, [projectId]: doc }));
    } catch (error) {
      console.error("Error saving documentation:", error);
    }
  };

  return (
    <DocumentationContext.Provider
      value={{ allDocumentation, saveDocumentation }}
    >
      {children}
    </DocumentationContext.Provider>
  );
};

export const useDocumentation = () => {
  const context = useContext(DocumentationContext);
  if (!context) {
    throw new Error(
      "useDocumentation must be used within a DocumentationProvider"
    );
  }
  return context;
};
