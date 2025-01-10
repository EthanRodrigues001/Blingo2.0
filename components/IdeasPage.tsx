"use client";
import { useState } from "react";

const IdeasPage = () => {
  const [fieldOfInterest, setFieldOfInterest] = useState("");
  const [stack, setStack] = useState("");
  const [targetSector, setTargetSector] = useState("");
  const [projectType, setProjectType] = useState("");
  const [complexity, setComplexity] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [duration, setDuration] = useState("");
  const [ideas, setIdeas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIdeas([]);

    const response = await fetch(
      `/api/v1/ai/ideas?fieldOfInterest=${fieldOfInterest}&stack=${stack}&targetSector=${targetSector}&projectType=${projectType}&complexity=${complexity}&teamSize=${teamSize}&duration=${duration}`
    );

    const data = await response.json();
    setIdeas(data.ideas);
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4 h-screen">
      <h1 className="text-2xl font-bold mb-4">Generate Project Ideas</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Field of Interest
          </label>
          <input
            type="text"
            value={fieldOfInterest}
            onChange={(e) => setFieldOfInterest(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Stack
          </label>
          <input
            type="text"
            value={stack}
            onChange={(e) => setStack(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Target Sector
          </label>
          <input
            type="text"
            value={targetSector}
            onChange={(e) => setTargetSector(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project Type
          </label>
          <input
            type="text"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Complexity
          </label>
          <input
            type="text"
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Team Size
          </label>
          <input
            type="number"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Duration
          </label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700"
        >
          Generate Ideas
        </button>
      </form>

      {loading && <p className="mt-4 text-center">Loading...</p>}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ideas.map((idea, index) => (
          <div
            key={index}
            className="p-4 border border-gray-300 rounded-md shadow-sm"
          >
            <p>{idea}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IdeasPage;
