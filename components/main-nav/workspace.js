
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import Image from "next/image"

export function SelectWorkspace() {
  return (
    <Select defaultValue="my-workspace">
      <SelectTrigger className="w-[150px] h-9 focus:outline-none focus:ring-transparent">
        <SelectValue placeholder="My Workspace" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="my-workspace" selected>My Workspace</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel className="py-4 font-normal flex justify-between px-2 text-slate-500">
            <span>Team</span>
            <Image className="hover:bg-slate-200 rounded-md p-1 cursor-pointer" width={24} height={24} src={"icon/plus.svg"} alt=""/>
          </SelectLabel>
          <SelectItem value="gmt">CDDA</SelectItem>
          <SelectItem value="eat">Pyreactor</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
