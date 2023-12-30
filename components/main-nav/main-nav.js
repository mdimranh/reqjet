"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProfileDropdownMenu } from "./profile-menu";
import { SearchDialog } from "./search";
import { SelectWorkspace } from "./workspace";

export default function MainNav() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-3 w-full px-4 py-1 border-b border-b-slate-200 bg-slate-50">
      <span
        className="col-span-1 pointer-events-none flex place-items-center gap-2 p-1 lg:pointer-events-auto lg:p-0"
        rel="noopener noreferrer"
      >
        <Image
          onClick={() => router.push("/")}
          src="/logo.png"
          alt="Logo"
          className="dark:invert cursor-pointer"
          width={35}
          height={35}
          priority
        />
      </span>
      <SearchDialog className="col-span-1" />
      <div className="col-span-1 flex items-center gap-2 justify-end">
        <SelectWorkspace />
        <ProfileDropdownMenu />
      </div>
    </div>
  );
}
