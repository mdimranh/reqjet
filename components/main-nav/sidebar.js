"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrConnectivity } from "react-icons/gr";
import { MdOutlineInsertLink } from "react-icons/md";
import { SiGraphql } from "react-icons/si";

import { cn } from "@/lib/utils";

export function LeftSideBar() {
  const currentRoute = usePathname();
  return (
    <div className="flex flex-col items-center justify-start border-r border-r-slate-200 w-20 p-1 gap-1">
      <Link
        href="/api"
        className={cn(
          currentRoute === "/api" ? "bg-slate-200 px-4 " : "",
          "flex flex-col justify-center items-center cursor-pointer p-3 hover:bg-slate-100 w-full text-xs font-semibold rounded-md"
        )}
      >
        <MdOutlineInsertLink size={20} />
        <span>REST</span>
      </Link>
      <div className="flex flex-col justify-center items-center p-3 cursor-pointer hover:bg-slate-100 w-full text-xs font-semibold rounded-md">
        <SiGraphql size={20} />
        <span>GraphQL</span>
      </div>
      <div className="flex flex-col justify-center items-center p-3 cursor-pointer hover:bg-slate-100 w-full text-xs font-semibold rounded-md">
        <GrConnectivity size={20} />
        <span>Realtime</span>
      </div>
    </div>
  );
}
