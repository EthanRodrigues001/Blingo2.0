"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";

export default function PrivacyPolicyDialog() {
  const [hasReadToBottom, setHasReadToBottom] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const content = contentRef.current;
    if (!content) return;

    const scrollPercentage = content.scrollTop / (content.scrollHeight - content.clientHeight);
    if (scrollPercentage >= 0.99 && !hasReadToBottom) {
      setHasReadToBottom(true);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-sm text-muted-foreground hover:text-foreground transition-colors p-0 h-auto flex-none">Privacy Policy</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b border-border px-6 py-4 text-base">
            Privacy Policy
          </DialogTitle>
          <div ref={contentRef} onScroll={handleScroll} className="overflow-y-auto">
            <DialogDescription asChild>
              <div className="px-6 py-4">
                <div className="space-y-4 [&_strong]:font-semibold [&_strong]:text-foreground">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p>
                        <strong>Information Collection and Use</strong>
                      </p>
                      <p>
                        We collect personal information when you register on our site, place an order, subscribe to our newsletter, respond to a survey or fill out a form. This information may include your name, e-mail address, mailing address, phone number, or credit card information.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Data Protection</strong>
                      </p>
                      <p>
                        We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Cookies</strong>
                      </p>
                      <p>
                        We use cookies to help us remember and process the items in your shopping cart, understand and save your preferences for future visits, and compile aggregate data about site traffic and site interaction.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Third-party Disclosure</strong>
                      </p>
                      <p>
                        We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information unless we provide users with advance notice.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Third-party Links</strong>
                      </p>
                      <p>
                        Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Changes to Privacy Policy</strong>
                      </p>
                      <p>
                        We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="border-t border-border px-6 py-4 sm:items-center">
          {!hasReadToBottom && (
            <span className="grow text-xs text-muted-foreground max-sm:text-center">
              Read all terms before accepting.
            </span>
          )}
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" disabled={!hasReadToBottom}>
              I understand
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

