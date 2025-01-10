import React from "react";
import Icons from "../icons";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#09090B]">
      <div className="mb-4">
        <Icons.icon className="w-20 h-20" />
      </div>
      <div className="flex items-center space-x-2">
        <Loader2 className="w-4 h-4 animate-spin" />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
