// "use server";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { getLoggedInUser } from "@/actions/auth";

const NavComponent = async () => {
  const user = await getLoggedInUser();
  return (
    <div>
      {user ? (
        <Button size="sm" variant="white" asChild className="hidden sm:flex">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      ) : (
        <>
          <Button
            size="sm"
            variant="tertiary"
            asChild
            className="hover:translate-y-0 hover:scale-100"
          >
            <Link href="/login">
              Login <ArrowRightIcon className="w-4 h-4 ml-2 hidden lg:block" />
            </Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default NavComponent;
