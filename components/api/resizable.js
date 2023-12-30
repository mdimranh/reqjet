"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { useEffect, useRef, useState } from "react";
import CollectionList from "./left/collections";
import useToggle from "./request/json/useToogle";

import JSONEditor from "./request/json/content";

console.log(JSONEditor);

export function ResizableMainContent() {
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
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={15} minSize={10} maxSize={50}>
        <CollectionList />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={85}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50} minSize={20}>
            <JSONEditor
              title=""
              path="schema.json"
              defaultValue=""
              isSchemaSampleDataOn={isSchemaSampleDataOn}
              onChange={handleSchemaValueChange}
            />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
