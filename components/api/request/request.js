import { useEffect, useRef, useState } from "react";
import JSONEditor from "./json/content";
import useToggle from "./json/useToogle";

import * as Tabs from "@radix-ui/react-tabs";

import Dragable from "./smart-tab/smarttab";

function TabsDemo() {
  const [isSchemaEditorOn, toggleASchemaEditorOn] = useToggle(false);
  const [isSchemaSampleDataOn, toggleSchemaSampleDataOn] = useToggle(false);
  const [schemaValue, setSchemaValue] = useState(undefined);
  const BarRef = useRef(null);

  useEffect(() => {
    if (!isSchemaEditorOn && isSchemaSampleDataOn) {
      toggleSchemaSampleDataOn();
    }
  }, [isSchemaEditorOn, isSchemaSampleDataOn, toggleSchemaSampleDataOn]);

  const handleSchemaValueChange = (value) => setSchemaValue(value);

  const getSchemaValue = () =>
    isSchemaSampleDataOn && !schemaValue ? SampleData.schema : schemaValue;

  return (
    <Tabs.Root
      className="flex flex-col w-full h-full"
      defaultValue="parameters"
    >
      <Tabs.List
        className="flex border-b border-b-slate-300 mt-2 px-4 gap-6"
        aria-label="Manage your account"
      >
        <Tabs.Trigger
          className="bg-white py-1 flex items-center justify-center border-b-2 data-[state=inactive]:border-transparent cursor-pointer data-[state=active]:border-b-slate-600 text-sm font-semibold"
          value="parameters"
        >
          Parameters
        </Tabs.Trigger>
        <Tabs.Trigger
          className="bg-white py-1 flex items-center justify-center border-b-2 data-[state=inactive]:border-transparent cursor-pointer data-[state=active]:border-b-slate-600 text-sm font-semibold"
          value="body"
        >
          Body
        </Tabs.Trigger>
        <Tabs.Trigger
          className="bg-white py-1 flex items-center justify-center border-b-2 data-[state=inactive]:border-transparent cursor-pointer data-[state=active]:border-b-slate-600 text-sm font-semibold"
          value="headers"
        >
          Headers
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content
        className="grow p-5 bg-white rounded-b-md outline-none"
        value="parameters"
      >
        <p>Parameters</p>
      </Tabs.Content>
      <Tabs.Content
        className="h-full bg-white rounded-b-md outline-none"
        value="body"
      >
        <JSONEditor
          title=""
          path="schema.json"
          defaultValue=""
          isSchemaSampleDataOn={isSchemaSampleDataOn}
          onChange={handleSchemaValueChange}
        />
      </Tabs.Content>
      <Tabs.Content
        className="grow p-5 bg-white rounded-b-md outline-none"
        value="headers"
      >
        <p>Headsers</p>
      </Tabs.Content>
    </Tabs.Root>
  );
}

export default function RequestRouter() {
  return (
    <div className="h-full">
      {/* <SmartTab /> */}
      <Dragable />
      {/* <ApiRoute /> */}
      <TabsDemo />
    </div>
  );
}
