"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

function ApiMethods({ method }) {
  return (
    <Select value={method} defaultValue="get" className="text-sm font-semibold">
      <SelectTrigger className="text-sm font-semibold w-[120px] focus:outline-none focus:ring-transparent border-none shadow-none ">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="GET">GET</SelectItem>
          <SelectItem value="POST">POST</SelectItem>
          <SelectItem value="PUT">PUT</SelectItem>
          <SelectItem value="PATCH">PATCH</SelectItem>
          <SelectItem value="DELETE">DELETE</SelectItem>
          <SelectItem value="HEAD">HEAD</SelectItem>
          <SelectItem value="OPTIONS">OPTIONS</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default function ApiRoute({ data }) {
  return (
    <div className="flex w-full items-center mt-2 gap-2 px-4">
      <div className="flex w-full items-center p-1 border border-slate-200 rounded-md h-10 bg-slate-50">
        <ApiMethods method={data.method} />
        <input
          type="url"
          className="border-none text-sm font-semibold w-full bg-slate-50"
          // defaultValue={"http://"}
          value={data?.url}
        />
      </div>
      <Button>Send</Button>
    </div>
  );
}
