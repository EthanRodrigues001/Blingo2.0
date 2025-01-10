"use client";

import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function InfiniteCards() {
  return (
    <div className="flex flex-col antialiased items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Creating this platform was an incredible experience. I wanted to provide developers with a tool that not only generates ideas but also helps them visualize and structure projects quickly, so they can focus on building rather than brainstorming.",
    name: "Ethan R.",
    title: "- Creator of the Project Idea Generator",
  },
  {
    quote:
      "This tool is a game-changer for anyone looking to kickstart a project. With just a few inputs, the AI tailors ideas to your interests and skills. It’s an excellent resource for students and professionals alike, making the project planning phase effortless.",
    name: "E. Rodrigues",
    title: "- Developer of the AI-Powered Idea Generator",
  },
  {
    quote:
      "My goal was to help others save time by automating the brainstorming process. The AI doesn’t just generate random ideas—it adapts to your inputs, ensuring that the suggestions are relevant and actionable for your next big project.",
    name: "Ethan Rodrigues Jr.",
    title: "- Innovator of AI Project Tools",
  },
  {
    quote:
      "Seeing users take these AI-generated ideas and build real-world applications is what excites me the most. This platform bridges the gap between concept and execution, giving users the structure and tools they need to succeed.",
    name: "E. R. Tech",
    title: "- Founder of AI-Powered Idea Generation",
  },
  {
    quote:
      "The best part of this platform is its versatility. Whether you’re working on a small web app or a large enterprise solution, the AI adapts to generate project ideas that are practical, unique, and innovative—tailored to every user.",
    name: "Ethan R. Dev",
    title: "- Architect of the Idea-to-Execution Platform",
  },
];
