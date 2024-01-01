"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

function ApiMethods({ method }) {
  const [value, setValue] = useState(method);
  useEffect(() => {
    setValue(method);
  }, [method]);
  return (
    <Select
      value={value}
      onValueChange={(e) => setValue(e)}
      className="text-sm font-semibold"
    >
      <SelectTrigger className="text-sm font-semibold w-[120px] focus:outline-none focus:ring-transparent border-none shadow-none ">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="GET">GET</SelectItem>
        <SelectItem value="POST">POST</SelectItem>
        <SelectItem value="PUT">PUT</SelectItem>
        <SelectItem value="PATCH">PATCH</SelectItem>
        <SelectItem value="DELETE">DELETE</SelectItem>
        <SelectItem value="HEAD">HEAD</SelectItem>
        <SelectItem value="OPTIONS">OPTIONS</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default function ApiRoute({ data }) {
  const [url, setUrl] = useState(data.url);
  useEffect(() => {
    setUrl(data.url);
  }, [data.url]);
  return (
    <div className="flex w-full items-center mt-4 gap-2 px-4">
      <div className="flex w-full items-center p-1 border border-slate-200 rounded-md h-10 bg-slate-50">
        <ApiMethods method={data.method} />
        <input
          type="url"
          className="border-none text-sm font-semibold w-full bg-slate-50"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <Button>Send</Button>
    </div>
  );
}
