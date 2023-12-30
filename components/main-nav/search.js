'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export function SearchDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-full max-w-96 mx-auto flex justify-between border border-slate-300 rounded-md p-2 hover:bg-slate-100 cursor-text">
            <span className="flex gap-2 items-center">
                <Image width={18} height={18} src="icon/search.svg" alt="search icon" />
                <Label>Search</Label>
            </span>
        </div>
        {/* <Button className="w-96" variant="outline">Search Here</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] absolute top-56">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
