"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, X } from "lucide-react";

export default function Announce() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenAnnouncement = localStorage.getItem("hasSeenAnnouncement");
    if (!hasSeenAnnouncement) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("hasSeenAnnouncement", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] max-w-[400px] rounded-lg border border-border bg-background p-4 shadow-lg shadow-black/5">
      <div className="flex gap-3">
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
          aria-hidden="true"
        >
          <RefreshCw className="opacity-60" size={16} strokeWidth={2} />
        </div>
        <div className="flex grow flex-col gap-3">
          <div className="space-y-1">
            <p className="text-sm font-medium">Notice</p>
            <p className="text-sm text-muted-foreground">
              Payment Feature is offline, due to Stripe approval. Email to
              modify your plan.
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="link" disabled>
              ethan@blingo.tech
            </Button>
          </div>
        </div>
        <Button
          variant="ghost"
          className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
          aria-label="Close notification"
          onClick={handleClose}
        >
          <X
            size={16}
            strokeWidth={2}
            className="opacity-60 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  );
}
