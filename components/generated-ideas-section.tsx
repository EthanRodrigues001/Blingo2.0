import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface GeneratedIdeasSectionProps {
  ideas: string[];
  onSelectIdea: (idea: string) => void;
  setDisableButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GeneratedIdeasSection({
  ideas,
  onSelectIdea,
  setDisableButton,
}: GeneratedIdeasSectionProps) {
  const [customIdea, setCustomIdea] = useState("");
  const [disableGenerated, setDisableGenerated] = useState(false);

  const handleCustomIdeaSubmit = () => {
    if (customIdea.trim()) {
      onSelectIdea(customIdea);
      setCustomIdea("");
    }
  };

  const handleToggleChange = (checked: boolean) => {
    setDisableGenerated(checked);
    setDisableButton(checked);
  };
  return (
    <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col flex-1 h-full">
      <div className="border border-neutral-200/30 rounded-lg p-4 flex flex-col flex-1">
        {!disableGenerated && ideas.length > 0 ? (
          <div className="flex flex-col flex-1 space-y-4">
            {ideas.map((idea, index) => (
              <div
                key={index}
                className="border border-neutral-200/30 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 min-h-[100px]"
              >
                <p className="text-sm sm:text-base flex-1">{idea}</p>
                <Button
                  onClick={() => onSelectIdea(idea)}
                  size="sm"
                  className="self-start sm:self-center whitespace-nowrap"
                >
                  Select Idea
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center flex-1 min-h-[100px]">
            <p className="text-muted-foreground text-center text-base sm:text-lg">
              {disableGenerated
                ? "Generated ideas are disabled. Enter your custom idea below."
                : 'No ideas generated yet. Fill out the form and click "Generate Ideas" to get started!'}
            </p>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <Label
            htmlFor="disable-generated"
            className="flex items-center space-x-2"
          >
            <Switch
              id="disable-generated"
              checked={disableGenerated}
              onCheckedChange={handleToggleChange}
            />
            <span>Disable Generated Ideas</span>
          </Label>
        </div>

        {disableGenerated && (
          <div className="mt-4 flex space-x-2">
            <Input
              value={customIdea}
              onChange={(e) => setCustomIdea(e.target.value)}
              placeholder="Enter your custom idea..."
              className="flex-grow"
            />
            <Button onClick={handleCustomIdeaSubmit}>Submit Idea</Button>
          </div>
        )}
      </div>
    </div>
  );
}
