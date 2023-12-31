import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

function ApiMethods() {
  return (
    <Select defaultValue="get" className="text-sm font-semibold">
      <SelectTrigger className="text-sm font-semibold w-[120px] focus:outline-none focus:ring-transparent border-none shadow-none ">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="get">GET</SelectItem>
          <SelectItem value="post">POST</SelectItem>
          <SelectItem value="put">PUT</SelectItem>
          <SelectItem value="patch">PATCH</SelectItem>
          <SelectItem value="delete">DELETE</SelectItem>
          <SelectItem value="head">HEAD</SelectItem>
          <SelectItem value="options">OPTIONS</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default function ApiRoute() {
  return (
    <div className="flex w-full items-center mt-2 gap-2 px-4">
      <div className="flex w-full items-center p-1 border border-slate-200 rounded-md h-10 bg-slate-50">
        <ApiMethods />
        <input
          type="url"
          className="border-none text-sm font-semibold w-full bg-slate-50"
        />
      </div>
      <Button>Send</Button>
    </div>
  );
}
