import Icons from "../icons";
import { Loader2 } from "lucide-react";

interface DashLoadProps {
  soon: boolean;
  pro?: boolean;
}

const DashLoad: React.FC<DashLoadProps> = ({ soon, pro }) => {
  pro = pro ?? false;
  if (soon === true) {
    return (
      <div className="min-h-screen p-4 sm:p-8 flex">
        <div className="flex-grow flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed border-gray-500 bg-neutral-900/[0.05]">
          <div className="mb-4">
            <Icons.icon className="w-20 h-20" />
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-500">Soon...</p>
          </div>
        </div>
      </div>
    );
  }

  if (pro === true) {
    return (
      <div className="min-h-screen p-4 sm:p-8 flex">
        <div className="flex-grow flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed border-gray-500 bg-neutral-900/[0.05]">
          <div className="mb-4">
            <Icons.icon className="w-20 h-20" />
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-500">Paid Access</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen p-4 sm:p-8 flex">
      <div className="flex-grow flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed border-gray-500 bg-neutral-900/[0.15]">
        <div className="mb-4">
          <Icons.icon className="w-20 h-20" />
        </div>
        <div className="flex items-center space-x-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default DashLoad;
