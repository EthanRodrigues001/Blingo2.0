"use client";

import { useState } from "react";
import { MagicCard } from "../ui/magic-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface FeedbackData {
  rating: number;
  feedback: string;
}

export default function Section5() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const feedbackData: FeedbackData = { rating, feedback };

    try {
      const response = await fetch("/api/submit-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        toast("Feedback submitted successfully");
        setIsDialogOpen(false);
        setRating(5);
        setFeedback("");
      } else {
        throw new Error("Failed to send feedback");
      }
    } catch (error) {
      console.error("Error sending feedback:", error);
      toast.error("Error sending feedback: " + error.message);
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 min-h-screen flex items-center justify-center">
      <MagicCard
        flickering={true}
        className="w-full max-w-4xl bg-[#0c0c0c] rounded-2xl overflow-hidden"
      >
        <section>
          <div className="relative py-24 px-6 md:px-12">
            <div className="relative z-10 text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Want the designed components of the website?
              </h1>
              <div className="flex justify-center mt-8">
                <Button onClick={() => setIsDialogOpen(true)}>
                  Give Feedback
                </Button>
              </div>
            </div>
          </div>
        </section>
      </MagicCard>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>UI Feedback</DialogTitle>
            <DialogDescription>
              We&apos;d love to hear your thoughts on our UI design.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                How much did you like the UI? (0-8)
              </label>
              <RadioGroup
                value={rating}
                onValueChange={(value) => setRating(Number(value))}
                className="flex gap-0 -space-x-px rounded-lg shadow-sm shadow-black/5"
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
                  <label
                    key={number}
                    className="relative flex size-9 flex-1 cursor-pointer flex-col items-center justify-center gap-3 border border-input text-center text-sm outline-offset-2 transition-colors first:rounded-s-lg last:rounded-e-lg has-[[data-state=checked]]:z-10 has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
                  >
                    <RadioGroupItem
                      id={`radio-17-r${number}`}
                      value={number.toString()}
                      className="sr-only after:absolute after:inset-0"
                    />
                    {number}
                  </label>
                ))}
              </RadioGroup>
            </div>
            <div>
              <label
                htmlFor="feedback"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                How do you think it can get better?
              </label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Your suggestions..."
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full">
              Submit Feedback
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
