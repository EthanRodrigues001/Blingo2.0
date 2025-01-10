"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Box,
  CalendarClock,
  Captions,
  CircleHelp,
  CopyCheck,
  FileText,
  Gem,
  Layers3,
  LineChart,
  Newspaper,
  UserCog,
  Waypoints,
} from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu = ({ isOpen, setIsOpen }: Props) => {


  const variants = {
    open: { opacity: 1, y: 20 },
    closed: { opacity: 0, y: 0 },
  };

  return (
    <div
      className={cn(
        "absolute top-12 inset-x-0 size-full p-4 z-20 bg-inherit flex flex-1",
        isOpen ? "flex" : "hidden"
      )}
    >
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{
          type: "spring",
          bounce: 0.15,
          duration: 0.5,
        }}
        className="size-full flex flex-col justify-start"
      >
        <ul className="flex flex-col items-start flex-1 w-full space-y-3">
          <li
            onClick={() => setIsOpen(false)}
            className="w-full px-4 py-2 text-lg hover:text-muted-foreground font-normal transition transform rounded-md cursor-pointer text-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
          >
            <Link
              href="#works"
              className="flex items-center w-full text-start"
            >
              <UserCog className="w-4 h-4 mr-2" />
              How it works
            </Link>
          </li>
                    <li
            onClick={() => setIsOpen(false)}
            className="w-full px-4 py-2 text-lg hover:text-muted-foreground font-normal transition transform rounded-md cursor-pointer text-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
          >
            <Link href="#features" className="flex items-center w-full text-start">
              <Waypoints className="w-4 h-4 mr-2" />
              Features
            </Link>
          </li>

          <li
            onClick={() => setIsOpen(false)}
            className="w-full px-4 py-2 text-lg hover:text-muted-foreground font-normal transition transform rounded-md cursor-pointer text-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
          >
            <Link href="/pricing" className="flex items-center w-full text-start">
              <Gem className="w-4 h-4 mr-2" />
              Pricing
            </Link>
          </li>

        </ul>
      </motion.div>
    </div>
  );
};

export default MobileMenu;
