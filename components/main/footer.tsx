"use client";

import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import PrivacyPolicyDialog from "./footer/PrivacyPolicyDialog";
import TermsOfServiceDialog from "./footer/TermsOfServiceDialog";
import { redirect } from "next/navigation";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="text-sm text-muted-foreground">
              Create the perfect project for your team solutions.
            </p>
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer">
                  <Image
                    className="rounded-full"
                    src="/pfp.png"
                    width={40}
                    height={40}
                    alt="Owner"
                  />
                  <div>
                    <p className="text-sm font-medium">Ethan Rodrigues</p>
                    <p className="text-xs text-muted-foreground">Owner</p>
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Image
                      className="rounded-full"
                      src="/pfp.png"
                      width={60}
                      height={60}
                      alt="Ethan Rodrigues"
                    />
                    <div>
                      <p className="text-sm font-medium">Ethan Rodrigues</p>
                      <p className="text-xs text-muted-foreground">
                        EthanRodrigues001
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Owner of{" "}
                    <strong className="font-medium text-foreground">
                      Blingo
                    </strong>
                    . Passionate about creating seamless user experiences.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() =>
                      redirect("https://github.com/EthanRodrigues001")
                    }
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View GitHub Profile
                  </Button>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/pricing"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
            </nav>
          </div>
          <div className="space-y-4 flex flex-col items-start">
            <h3 className="text-lg font-semibold">Legal</h3>
            <nav className="flex flex-col space-y-2 items-start w-full text-left justify-start">
              <PrivacyPolicyDialog />
              <TermsOfServiceDialog />
            </nav>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Blingo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
